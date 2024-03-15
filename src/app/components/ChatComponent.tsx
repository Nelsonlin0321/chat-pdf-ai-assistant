"use client";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import MessageList from "./MessageList";
import { Message } from "@prisma/client";
import StopButton from "./StopButton";
import { Toaster, toast } from "react-hot-toast";
import { useEffect } from "react";
import DeleteChatHistoryAlert from "./DeleteChatHistoryAlert";

type Props = {
  file_key: string;
  chat_id: string;
  initMessages: Message[];
};

function extractUserQuestion(text: string): string | null {
  const regex = /QUESTION\s*->\s*(.*?)\s*\n/;
  const match = text.match(regex);
  return match ? match[1] : text;
}

const ChatComponent = ({ file_key, chat_id, initMessages }: Props) => {
  const {
    input,
    handleInputChange,
    handleSubmit,
    messages,
    stop,
    isLoading,
    setMessages,
    error,
  } = useChat({
    api: "/api/ai/chat",
    body: { file_key, chat_id },
    initialMessages: initMessages,
  });

  // const isLoading = true;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const reconstructedMessages = messages.map((message) => {
    if (message.role === "user") {
      return { ...message, content: extractUserQuestion(message.content)! };
    } else {
      return message;
    }
  });

  // const template_chats = [
  //   { id: "1", content: "Hi", role: "user" },
  //   { id: "2", content: "How can I help you?", role: "assistant" },
  // ];

  useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <>
      <div
        className="relative h-screen overflow-scroll mt-10 mb-12"
        id="message-container"
      >
        <MessageList
          messages={reconstructedMessages}
          isLoading={isLoading}
          setMessages={setMessages}
        />

        <form
          className="fixed bottom-0 inset-x-0 px-2 py-4 bg-slate-100"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-2 w-full mb-2">
            {isLoading ? (
              <StopButton onStop={stop} />
            ) : (
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask any question ..."
                className="mb-4"
              />
            )}

            <Button className="bg-blue-600" disabled={isLoading} type="submit">
              <Send className="h-4 w-4" />
            </Button>
            <DeleteChatHistoryAlert
              chatId={chat_id}
              setMessages={setMessages}
            />
          </div>
        </form>
        <Toaster />
      </div>
    </>
  );
};

export default ChatComponent;
