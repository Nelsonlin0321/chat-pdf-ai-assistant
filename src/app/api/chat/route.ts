import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai";
import { DocMeta } from "../search/route";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { auth } from "@clerk/nextjs";

const prisma = new PrismaClient().$extends(withAccelerate());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

// convert messages from the Vercel AI SDK Format to the format
// that is expected by the Google GenAI SDK
const buildGoogleGenAIPrompt = (messages: Message[]) => ({
  contents: messages
    .filter(
      (message) => message.role === "user" || message.role === "assistant"
    )
    .map((message) => ({
      role: message.role === "user" ? "user" : "model",
      parts: [{ text: message.content }],
    })),
});

function getPrompt(message: Message, context: string) {
  return {
    ...message,
    role: "user",
    content: `Answer below question without any prior knowledge and only based on the given context within CONTEXT BLOCK: 
    ---------------------
    QUESTION -> ${message.content}.
    ---------------------
    CONTEXT BLOCK -> ${context}`,
  } as Message;
}

async function buildRAGPrompt(messages: Message[], file_key: string) {
  const lastMessage = messages[messages.length - 1];

  const docsResults = await fetch(
    "http://localhost:3000/api/search" +
      "?" +
      `file_key=${file_key}&query=${lastMessage.content}&limit=5`
  )
    .then((response) => response.json())
    .then((data) => {
      return data as DocMeta[];
    });

  const context = docsResults
    .map((doc) => doc.text)
    .join("\n")
    .substring(0, 5000);

  const prompt: Message = getPrompt(lastMessage, context);

  messages[messages.length - 1] = prompt;
  return messages;
}

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages, file_key, chat_id } = await req.json();
  const { userId } = await auth();
  const lastMessage = messages[messages.length - 1];
  const ragPromptMessages = await buildRAGPrompt(messages, file_key);
  const geminiStream = await genAI
    .getGenerativeModel({ model: "gemini-pro" })
    .generateContentStream(buildGoogleGenAIPrompt(ragPromptMessages));

  // Convert the response into a friendly text-stream
  const stream = GoogleGenerativeAIStream(geminiStream, {
    onStart: async () => {
      await prisma.message.create({
        data: {
          chatId: chat_id,
          content: lastMessage.content,
          role: lastMessage.role,
        },
      });
    },
    onCompletion: async (completion) => {
      await prisma.message.create({
        data: {
          chatId: chat_id,
          content: completion,
          role: "assistant",
        },
      });
    },
  });

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
