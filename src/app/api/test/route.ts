import { NextRequest, NextResponse } from "next/server";

function extractUserQuestion(text: string): string | null {
  const regex = /QUESTION\s*->\s*(.*?)\s*\n/;
  const match = text.match(regex);
  return match ? match[1] : "";
}

const text = `Given the context within CONTEXT BLOCK and not prior knowledge, answer the question: 
    ---------------------
    QUESTIN -> How are you ?
    ---------------------
    CONTEXT BLOCK ->
    some content
    `;

export async function GET(req: NextRequest) {
  const messages = [1, 2, 3, 4];
  messages[0] = 100;

  const userQuestion = extractUserQuestion(text);
  // console.log(userQuestion); // Output: How are you ?

  return NextResponse.json({ message: userQuestion }, { status: 200 });
}
