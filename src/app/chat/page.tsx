import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/client";

const ChatHomePage = async () => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("./sign-in");
  }

  const _chat = await prisma.chat.findFirst({ where: { userId: userId } });
  if (!_chat) {
    return redirect("/");
  }

  const chatId = _chat.chatId;

  return redirect("/chat/" + chatId);
};

export default ChatHomePage;
