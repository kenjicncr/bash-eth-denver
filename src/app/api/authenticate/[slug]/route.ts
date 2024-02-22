import { NextRequest, NextResponse } from "next/server";
import { createKysely } from "@vercel/postgres-kysely";
import { TokenProofResponse } from "@/components/tokenproof-button";

interface TokenProofData {
  nonce: string;
  status: string;
  account: string;
  timestamp: Date;
  session_id: string;
}

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON data from the request body
    const data = (await req.json()) as TokenProofResponse;

    // Handle the incoming webhook data here
    console.log("Received webhook data:", data);

    const db = createKysely<any>();

    // save to db
    const result = await db
      .insertInto("tokenproofdata")
      .values({
        nonce: data.nonce,
        status: data.status,
        account: data.account,
        timestamp: data.timestamp,
        session_id: data.session_id,
      })
      .executeTakeFirst();

    // Respond with a success message
    return NextResponse.json(
      { data: data, message: "Webhook received successfully." },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error handling webhook:", error);
    return NextResponse.json(
      { message: "Webhook received successfully." },
      {
        status: 500,
      }
    );
  }
}
