import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
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
    </div>
  );
};

export default ChatSideBar;
