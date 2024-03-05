import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const messageId = params.id;

  const message = await prisma.message.findUnique({
    where: {
      id: messageId,
    },
  });

  if (!message) {
    return NextResponse.json(
      { error: `The message with id ${messageId} doesn't exist!` },
      { status: 404 }
    );
  }

  await prisma.message.delete({
    where: { id: messageId },
  });

  return NextResponse.json(
    { message: "Deleted successfully" },
    { status: 200 }
  );
}
