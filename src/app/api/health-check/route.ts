import { NextResponse } from "next/server";

export async function GET() {
  const now = new Date();
  const hkTimeZoneOffset = 8; // Hong Kong is UTC+8
  const hkDate = new Date(now.getTime() + hkTimeZoneOffset * 60 * 60 * 1000);

  const formattedDateTime = hkDate
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");

  return NextResponse.json(
    { message: `The sever is running at ${formattedDateTime}` },
    { status: 200 }
  );
}
