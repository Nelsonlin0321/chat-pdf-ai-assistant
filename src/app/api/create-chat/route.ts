import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import apiClient from "@/app/services/api-client";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    const file_key = formData.get("file_key") as string;

    if (!file_key) {
      return NextResponse.json(
        { error: "No file_key received." },
        { status: 400 }
      );
    }

    const chat_id = formData.get("chat_id") as string;

    if (!chat_id) {
      return NextResponse.json(
        { error: "No chat_id received." },
        { status: 400 }
      );
    }
    await apiClient.post("ingest_file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    await prisma.chat.create({
      data: {
        chatId: chat_id,
        userId: userId!,
        fileKey: file_key,
        fileUrl: `https://d2gewc5xha837s.cloudfront.net/${file_key}`,
      },
    });

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
