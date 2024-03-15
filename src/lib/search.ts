const BACKEND_URL = process.env.NEXT_PUBLIC_LAMBDA_BACKEND_URL;

type Props = {
  chat_id: string;
  query: string;
  search_type: "keyword_search" | "vector_search" | "hybrid_search";
  limit: string;
};

export type DocMeta = {
  text: string;
  page_number: number[];
};

export async function search({ chat_id, query, search_type, limit }: Props) {
  const data = { chat_id, query, limit };
  const searchParams = new URLSearchParams(data);

  const response = await fetch(
    `${BACKEND_URL}/${search_type}?${searchParams}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const searchResults: DocMeta[] = await response.json();
  return searchResults;
}
