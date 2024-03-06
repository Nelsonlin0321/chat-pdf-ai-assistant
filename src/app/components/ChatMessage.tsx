"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Message } from "ai";
import { PiTrashSimpleBold } from "react-icons/pi";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Bot } from "lucide-react";
import axios from "axios";

type Props = {
  message: Message;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
};

const ChatMessage = ({ message, messages, setMessages }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn("flex", {
        "justify-end pl-10": message.role === "user",
        "justify-start pr-10": message.role === "assistant",
      })}
    >
      <div>
        {message.role !== "user" && <Bot className="mb-3" />}
        <div
          className="flex items-center gap-1"
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered && message.role === "user" && (
            <PiTrashSimpleBold
              size={15}
              className=" text-slate-400 shrink-0 cursor-pointer"
              onClick={async () => {
                setMessages([...messages.filter((m) => m.id !== message.id)]);
                axios.delete("/api/message/" + message.id);
              }}
            />
          )}
          <div
            className={cn(
              "rounded-lg px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10",
              {
                "bg-blue-600 text-white": message.role === "user",
              }
            )}
            onMouseEnter={() => setIsHovered(true)}
          >
            {message.role === "user" ? (
              <MarkdownPreview
                source={message.content}
                style={{ backgroundColor: "transparent", color: "white" }}
              />
            ) : (
              <MarkdownPreview
                source={message.content}
                style={{ backgroundColor: "transparent" }}
              />
            )}
          </div>
          {isHovered && message.role !== "user" && (
            <PiTrashSimpleBold
              size={15}
              className=" text-slate-400 shrink-0 cursor-pointer"
              onClick={() => {
                setMessages([...messages.filter((m) => m.id !== message.id)]);
                axios.delete("/api/message/" + message.id);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
