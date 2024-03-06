import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai";
import { DocMeta } from "../../search/route";
// import { PrismaClient } from "@prisma/client/edge";
// import { withAccelerate } from "@prisma/extension-accelerate";
import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/client";
import axios from "axios";

// const prisma = new PrismaClient().$extends(withAccelerate());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

const buildChatPrompt = (messages: Message[]) => {
  let chatMessages: Message[] = [];
  let currentRole = "user";
  for (var i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === currentRole) {
      chatMessages.push(messages[i]);
      if (currentRole === "user") {
        currentRole = "assistant";
      } else {
        currentRole = "user";
      }
    }
  }

  chatMessages = chatMessages.reverse();
  return chatMessages;
};
// IMPORTANT! Set the runtime to edge
// export const runtime = "edge";

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
    content: `Answer below question without any prior knowledge and only based on the given context within CONTEXT BLOCK, 
    ,and tell user where you get the answers if the question is relevant to the question: 
    ---------------------
    QUESTION -> ${message.content}.
    ---------------------
    CONTEXT BLOCK:
    ${context}`,
  } as Message;
}

async function buildRAGPrompt(messages: Message[], file_key: string) {
  const lastMessage = messages[messages.length - 1];

  // const docsResults = await fetch(
  //   "http://localhost:3000/api/search" +
  //     "?" +
  //     `file_key=${file_key}&query=${lastMessage.content}&limit=5`
  // )
  //   .then((response) => response.json())
  //   .then((data) => {
  //     return data as DocMeta[];
  //   });

  const response = await axios.get("http://localhost:3000/api/search", {
    params: {
      file_key,
      query: lastMessage.content,
      limit: 8,
      search_type: "hybrid_search",
    },
  });
  const docsResults = response.data as DocMeta[];
  const context = docsResults.map((doc) => doc.text).join("\n");
  // .substring(0, 5000);
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
  const chatPrompt = buildChatPrompt(ragPromptMessages);
  const geminiStream = await genAI
    .getGenerativeModel({ model: "gemini-pro" })
    .generateContentStream(buildGoogleGenAIPrompt(chatPrompt));

  // Convert the response into a friendly text-stream
  const stream = GoogleGenerativeAIStream(geminiStream, {
    // onStart: async () => {},
    onCompletion: async (completion) => {
      await prisma.message.create({
        data: {
          chatId: chat_id,
          content: lastMessage.content,
          role: lastMessage.role,
        },
      });

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
