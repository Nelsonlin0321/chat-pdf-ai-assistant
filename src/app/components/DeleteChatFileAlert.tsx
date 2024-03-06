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
import { Button } from "@/components/ui/button";
import { Message } from "ai";
import axios from "axios";
import { PiTrashSimpleBold } from "react-icons/pi";

type Props = {
  chatId: string;
};

const DeleteChatFileAlert = ({ chatId }: Props) => {
  const onDelete = () => {
    // setMessages([]);
    // axios.delete("/api/messages/" + chatId);
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