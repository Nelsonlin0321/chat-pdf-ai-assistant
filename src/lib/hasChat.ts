import prisma from "@/prisma/client";

export async function hasChat({ userId }: { userId: string | null }) {
  let hasChat = false;

  if (!userId) {
    return hasChat;
  }

  const chat = await prisma.chat.findFirst({ where: { userId: userId } });

  if (chat) {
    hasChat = true;
  }

  return hasChat;
}
