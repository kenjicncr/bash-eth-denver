import { NextRequest, NextResponse } from "next/server";
import { createKysely } from "@vercel/postgres-kysely";
import { TokenProofResponse } from "@/components/tokenproof-button";

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON data from the request body
    const data = (await req.json()) as { nonce: string };

    // Handle the incoming webhook data here
    console.log("Received nonce:", data.nonce);

    const db = createKysely<any>();

    const result = await db
      .selectFrom("tokenproofdata")
      .select(["nonce", "status", "account", "timestamp", "session_id"])
      .where("nonce", "=", data.nonce)
      .distinct()
      .execute();

    const eventId = "741b389a-fa59-4063-9f56-1ee6fbc73635";
    const ticketId = "9757e9ae-d5ae-4ba3-a383-4c15a78ef3c4";

    console.log(`account:`, result[0].account);
    const claim = await fetch("https://api.tokenproof.xyz/v1/tickets/claim", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account: result[0].account,
        network: "ethereum",
        event_id: eventId,
        ticket_options: [
          {
            guests: 0,
            id: ticketId,
          },
        ],
      }),
    });

    console.log(await claim.json());

    // Respond with a success message
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
