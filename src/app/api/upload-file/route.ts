import { NextRequest, NextResponse } from "next/server";
import apiClient from "@/services/api-client";
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    const file_key = formData.get("file_key");
    if (!file_key) {
      return NextResponse.json(
        { error: "No file_key received." },
        { status: 400 }
      );
    }

    const response = await apiClient.post("/ingest_file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
