"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { PiTrashSimpleBold } from "react-icons/pi";
import { ChatWindow } from "./ChatSideBar";
import { useRouter } from "next/navigation";

type Props = {
  chatId: string;
  chatWindows: ChatWindow[];
  setChatWindows: (chatWindows: ChatWindow[]) => void;
};

const DeleteChatFileAlert = ({
  chatId,
  chatWindows,
  setChatWindows,
}: Props) => {
  const router = useRouter();

  const onDelete = () => {
    axios.delete("/api/chat/" + chatId);

    const newChatWindows = chatWindows.filter(
      (window) => window.chatId !== chatId
    );

    if (newChatWindows.length === 0) {
      router.push("/");
    } else {
      setChatWindows(newChatWindows);
      const newChatId = newChatWindows[0].chatId;
      router.push("/chat/" + newChatId);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <PiTrashSimpleBold
          size={15}
          className=" text-slate-400 shrink-0 cursor-pointer"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your file
            and chat history
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onDelete()} className=" bg-red-500">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteChatFileAlert;
