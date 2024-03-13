import apiClient from "@/app/services/api-client";

type Props = {
  chat_id: string;
  query: string;
  search_type: "keyword_search" | "vector_search" | "hybrid_search";
  limit: number;
};

export type DocMeta = {
  text: string;
  page_number: number[];
};

export async function search({ chat_id, query, search_type, limit }: Props) {
  const data = { chat_id, query, limit };
  const response = await apiClient.get("/" + search_type, { params: data });

  const searchResults: DocMeta[] = response.data;
  return searchResults;
}
