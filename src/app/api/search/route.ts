import apiClient from "@/app/services/api-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const file_key = searchParams.get("file_key");

  if (!file_key) {
    return NextResponse.json(
      { error: "No file_key received." },
      { status: 400 }
    );
  }
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "No query received." }, { status: 400 });
  }
  let search_type = searchParams.get("search_type");
  if (!search_type) {
    search_type = "hybrid_search";
  }
  const search_types = ["keyword_search", "vector_search", "hybrid_search"];
  if (!search_types.includes(search_type)) {
    return NextResponse.json(
      { error: "Invalid search type." },
      { status: 400 }
    );
  }
  const data = { file_key: file_key, query, limit: 5 };
  const response = await apiClient.get("/" + search_type, { params: data });
  return NextResponse.json(response.data, { status: 200 });
}
