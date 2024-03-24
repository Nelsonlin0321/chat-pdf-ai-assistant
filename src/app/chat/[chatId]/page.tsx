import ChatComponent from "@/app/components/ChatComponent";
import ChatSideBar from "@/app/components/ChatSideBar";
import PDFViewer from "@/app/components/PDFViewer";
import { cloudRunApiClient, lambdaApiClient } from "@/lib/api-clients";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("./sign-in");
  }

  const _chats = await prisma.chat.findMany({ where: { userId: userId } });

  if (!_chats) {
    return redirect("/");
  }

  const _chat = _chats.find((chat) => chat.chatId === chatId)!;

  if (!_chat) {
    return redirect("/chat");
  }

  const initMessages = await prisma.message.findMany({
    where: { chatId: _chat.chatId },
    // select: {
    //   id: true,
    //   content: true,
    //   role: true,
    // },
  });

  const lambdaApiPromise = lambdaApiClient.get("/health_check");
  const cloudRunPromise = cloudRunApiClient.get("/health_check");

  return (
    <div className="flex max-h-screen bg-slate-100">
      <div className="flex w-full max-h-screen">
        <ChatSideBar chats={_chats} chatId={chatId} />
        <div className="hidden md:block h-screen p-4 overflow-scroll flex-[5] pb-16">
          <PDFViewer pdf_url={_chat.fileUrl} />
        </div>
        <div className="h-screen flex-[5] border-1-4 border-l-slate-200 overflow-scroll">
          <ChatComponent
            file_key={_chat.fileKey}
            chat_id={_chat.chatId}
            initMessages={initMessages}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

// https://d2gewc5xha837s.cloudfront.net/chatpdf/user_2cotzAlVmd4jt0TlizIjUV0tzTi/e7df56b6-d40f-4ea4-a5a1-1a3c6199255e/investment_policy_guidelines.pdf
