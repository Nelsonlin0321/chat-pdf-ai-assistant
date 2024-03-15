import { cn } from "@/lib/utils";
import { Message } from "ai";
import React from "react";
import { Bot, Loader2 } from "lucide-react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { PiTrashSimpleBold } from "react-icons/pi";
import ChatMessage from "./ChatMessage";

type Props = {
  messages: Message[];
  isLoading: boolean;
  setMessages: (messages: Message[]) => void;
};

const MessageList = ({ messages, isLoading, setMessages }: Props) => {
  if (!messages) return <></>;

  return (
    <div className="flex flex-col gap-2 pl-8 py-2 overflow-scroll">
      {messages.map((message) => {
        return (
          <ChatMessage
            message={message}
            key={message.id}
            messages={messages}
            setMessages={setMessages}
          />
        );
      })}
      {isLoading && (
        <>
          <Bot className="mb-3" />
          <div className="rounded-lg px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10">
            <div className="flex items-center">
              <Loader2 className="animate-spin" />
              Thinking...
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MessageList;
