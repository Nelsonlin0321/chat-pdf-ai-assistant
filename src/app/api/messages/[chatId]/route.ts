import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { chatId: string };
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const chatId = params.chatId;

  const message = await prisma.message.findFirst({
    where: {
      chatId: chatId,
    },
  });

  if (!message) {
    return NextResponse.json(
      { error: `The message with chatId ${chatId} doesn't exist!` },
      { status: 404 }
    );
  }

  await prisma.message.deleteMany({
    where: { chatId: chatId },
  });

  return NextResponse.json(
    { message: "Deleted successfully" },
    { status: 200 }
  );
}
