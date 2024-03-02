import ChatComponent from "@/app/components/ChatComponent";
import ChatSideBar from "@/app/components/ChatSideBar";
import PDFViewer from "@/app/components/PDFViewer";
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

  return (
    <div className="flex max-h-screen">
      <div className="flex w-full max-h-screen">
        {/* chat side bar */}
        <div className="flex-[1] max-w-xs">
          <ChatSideBar chats={_chats} chatId={chatId} />
        </div>
        <div className="max-h-screen p-4 overflow-scroll flex-[5]">
          <PDFViewer pdf_url={_chat.fileUrl} />
        </div>
        <div className="flex-[3] border-1-4 border-l-slate-200">
          <ChatComponent file_key={_chat.fileKey} chat_id={_chat.chatId} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

// https://d2gewc5xha837s.cloudfront.net/chatpdf/user_2cotzAlVmd4jt0TlizIjUV0tzTi/e7df56b6-d40f-4ea4-a5a1-1a3c6199255e/investment_policy_guidelines.pdf
