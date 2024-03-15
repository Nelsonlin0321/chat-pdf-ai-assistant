"use client";
import { cn } from "@/lib/utils";
import { MessageCircle, PlusCircle } from "lucide-react";
import Link from "next/link";
import DeleteChatFileAlert from "./DeleteChatFileAlert";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export type ChatWindow = {
  chatId: string;
  fileName: string;
};

type Props = {
  chats: ChatWindow[];
  chatId: string;
};

const ChatSideBar = ({ chats, chatId }: Props) => {
  const [showSidebar, setShowSidebar] = useState(true);

  const [chatWindows, setChatWindows] = useState<ChatWindow[]>([]);

  useEffect(() => {
    setChatWindows(chats);
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <button
        className="fixed left-0 z-30 bg-gray-700 text-white p-2 rounded-md hover:bg-gray-600"
        onClick={toggleSidebar}
      >
        <div className="flex items-center gap-2">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>

          <div className="flex flex-col">
            <p>{showSidebar ? "Close PDF List" : "Show PDF List"}</p>
          </div>
        </div>
      </button>

      <div
        className={`flex max-w-xs md: fixed mt-16 inset-y-0 z-10 left-0 w-64 bg-white transition-transform duration-300 transform ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-full h-screen p-4 text-gray-200 bg-gradient-to-tl from-slate-300 to-zinc-400 pt-20 pb-20 overflow-scroll">
          <Link href="/">
            <Button className="w-full border-dashed">
              <PlusCircle className="mr-2 w-4 h-4" />
              New Chat Room
            </Button>
          </Link>
          <div className="flex flex-col gap-2 mt-4 mb-36">
            {chatWindows.map((chat) => (
              <div key={chat.chatId}>
                <div
                  className={cn(
                    "rounded-lg p-3 text-slate-800 flex items-center border-2",
                    {
                      "bg-slate-700 text-white": chat.chatId === chatId,
                      "hover:text-white": chat.chatId !== chatId,
                    }
                  )}
                >
                  <MessageCircle className="mr-2" />
                  <Link
                    className="w-full overflow-hidden text-sm text-ellipsis"
                    href={"/chat/" + chat.chatId}
                  >
                    {chat.fileName}
                  </Link>
                  <DeleteChatFileAlert
                    chatId={chatId}
                    setChatWindows={setChatWindows}
                    chatWindows={chatWindows}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSideBar;
