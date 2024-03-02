import { cn } from "@/lib/utils";
import { Message } from "ai";
import React from "react";
import { Bot, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import MarkdownPreview from "@uiw/react-markdown-preview";

type Props = {
  messages: Message[];
  isLoading: boolean;
};

const MessageList = ({ messages, isLoading }: Props) => {
  if (!messages) return <></>;

  return (
    <div className="flex flex-col gap-2 px-4 py-2 overflow-scroll">
      {messages.map((message) => {
        return (
          <div
            key={message.id}
            className={cn("flex", {
              "justify-end pl-10": message.role === "user",
              "justify-start pr-10": message.role === "assistant",
            })}
          >
            <div>
              {message.role !== "user" && <Bot className="mb-3" />}
              <div
                className={cn(
                  "rounded-lg px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10",
                  {
                    "bg-blue-600 text-white": message.role === "user",
                  }
                )}
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

                {/* <ReactMarkdown>{message.content}</ReactMarkdown> */}
              </div>
            </div>
          </div>
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
