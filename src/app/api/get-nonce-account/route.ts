import { NextRequest, NextResponse } from "next/server";
import { createKysely } from "@vercel/postgres-kysely";

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as { nonce: string };

    // Handle the incoming webhook data here
    console.log("Received nonce:", data.nonce);

    const db = createKysely<any>();

    const results = await db
      .selectFrom("tokenproofdata")
      .select(["nonce", "status", "account", "timestamp", "session_id"])
      .where("nonce", "=", data.nonce)
      .distinct()
      .execute();

    const result = results[0];

    return NextResponse.json(
      { ...result },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error handling nonce:", error);
    return NextResponse.json(
      { message: "Failed to handle nonce." },
      {
        status: 500,
      }
    );
  }
}
