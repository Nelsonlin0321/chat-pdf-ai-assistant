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
        className="fixed bottom-24 left-0 z-50 bg-gray-700 text-white p-2 rounded-md hover:bg-gray-600"
        onClick={toggleSidebar}
      >
        <div className="flex">
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
          {showSidebar ? "<-Close Chats" : "Show Chats ->"}
        </div>
      </button>
      {/*  flex-[1] max-w-xs */}
      <div
        className={`flex max-w-xs md: fixed mt-16 inset-y-0 left-0 w-64 bg-white transition-transform duration-300 transform ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-full h-screen p-4 text-gray-200 bg-gray-900">
          <div className="flex flex-col gap-2 mt-4">
            {chatWindows.map((chat) => (
              <div key={chat.chatId}>
                <div
                  className={cn(
                    "rounded-lg p-3 text-slate-300 flex items-center",
                    {
                      "bg-blue-600 text-white": chat.chatId === chatId,
                      "hover:text-white": chat.chatId !== chatId,
                    }
                  )}
                >
                  <MessageCircle className="mr-2" />
                  <Link
                    className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis"
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
          <Link href="/">
            <Button>
              <PlusCircle className="mr-2 w-4 h-4" />
              New Chat Room
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ChatSideBar;
