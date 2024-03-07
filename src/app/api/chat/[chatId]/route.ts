import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { chatId: string };
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const chatId = params.chatId;

  const messages = await prisma.message.findMany({
    where: {
      chatId: chatId,
    },
  });

  if (messages) {
    await prisma.message.deleteMany({
      where: { chatId: chatId },
    });
  }

  return NextResponse.json(
    { message: "Deleted successfully" },
    { status: 200 }
  );
}
