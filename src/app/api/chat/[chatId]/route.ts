import { cloudRunApiClient } from "@/lib/api-clients";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { chatId: string };
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const chatId = params.chatId;

  const chatFileKey = await prisma.chat.findFirst({
    where: { chatId: chatId },
    select: { fileKey: true },
  });

  // await prisma.message.deleteMany({
  //   where: { chatId: chatId },
  // });

  // await prisma.embedding.deleteMany({
  //   where: { chatId: chatId },
  // });

  if (chatFileKey) {
    const fileKey = chatFileKey.fileKey;
    await prisma.uploadedFile.deleteMany({ where: { fileKey: fileKey } });
    cloudRunApiClient.delete("/delete_file", { data: { file_key: fileKey } });
  }

  await prisma.chat.deleteMany({
    where: { chatId: chatId },
  });

  return NextResponse.json(
    { message: "Deleted successfully" },
    { status: 200 }
  );
}
