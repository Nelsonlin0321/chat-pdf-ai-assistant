import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai";
// import { PrismaClient } from "@prisma/client/edge";
// import { withAccelerate } from "@prisma/extension-accelerate";
import { search } from "@/lib/search";
import prisma from "@/prisma/client";

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
    content: `Please provide a detailed answer to the question, drawing information from the provided documents as needed. If the question cannot be fully answered using the documents, kindly state that and provide any relevant additional information that you can. When referencing information from the documents, please quote or paraphrase the relevant sections and cite the source document. 
    ---------------------
    QUESTION -> ${message.content}.
    ---------------------
    Documents -> :
    ${context}`,
  } as Message;
}

async function buildRAGPrompt(messages: Message[], chat_id: string) {
  const lastMessage = messages[messages.length - 1];

  const searchResults = await search({
    chat_id,
    query: lastMessage.content,
    search_type: "hybrid_search",
    limit: "8",
  });

  const context = searchResults.map((doc) => doc.text).join("\n");

  const prompt: Message = getPrompt(lastMessage, context);

  messages[messages.length - 1] = prompt;

  return messages;
}

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages, chat_id, readPDF } = await req.json();

  const lastMessage = messages[messages.length - 1];

  let promptMessages: Message[];

  if (readPDF) {
    try {
      promptMessages = await buildRAGPrompt(messages, chat_id);
    } catch (error) {
      console.error("Build RAG Prompt Error", error);
      promptMessages = messages;
    }
  } else {
    promptMessages = messages;
  }

  const chatPrompt = buildChatPrompt(promptMessages);

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
