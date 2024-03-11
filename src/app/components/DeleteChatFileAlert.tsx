"use client";
import React, { useState } from "react";
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
import { Toaster, toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

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
  const [isDeleting, setDeleting] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      setDeleting(true);
      await axios.delete("/api/chat/" + chatId);

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
    } catch (error) {
      toast.error("Error deleting chat");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <PiTrashSimpleBold
          size={15}
          className=" text-red-600 shrink-0 cursor-pointer"
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
          <Button
            onClick={async () => {
              await onDelete();
              setOpen(false);
            }}
            className=" bg-red-500"
            disabled={isDeleting}
          >
            {isDeleting ? <Loader2 className="animate-spin" /> : "Continue"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
      <Toaster />
    </AlertDialog>
  );
};

export default DeleteChatFileAlert;
