import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { MessageCircle, PlusCircle } from "lucide-react";
import { Chat } from "@prisma/client";
import path from "path";
import { cn } from "@/lib/utils";
import { PiTrashSimpleBold } from "react-icons/pi";

type Props = {
  chats: Chat[];
  chatId: string;
};

const ChatSideBar = ({ chats, chatId }: Props) => {
  return (
    <div className="w-full h-screen p-4 text-gray-200 bg-gray-900">
      <Link href="/">
        <Button>
          <PlusCircle className="mr-2 w-4 h-4" />
          New Chat
        </Button>
      </Link>

      <div className="flex flex-col gap-2 mt-4">
        {chats.map((chat) => (
          <div key={chat.id}>
            <div
              className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
                "bg-blue-600 text-white": chat.chatId === chatId,
                "hover:text-white": chat.chatId !== chatId,
              })}
            >
              <MessageCircle className="mr-2" />
              <Link
                className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis"
                href={"/chat/" + chat.chatId}
              >
                {path.basename(chat.fileKey)}
              </Link>
              <PiTrashSimpleBold
                size={15}
                className=" text-slate-400 shrink-0 cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-4">
        <div className="flex items-center gap-2 text-sm text-slate-500 flex-wrap">
          <Link href={"/"}>Home</Link>
          <Link href={"/"}>Source</Link>
          {/* Strip Button */}
        </div>
      </div>
    </div>
  );
};

export default ChatSideBar;
