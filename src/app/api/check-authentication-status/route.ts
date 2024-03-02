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

    const results = await db
      .selectFrom("tokenproofdata")
      .select(["nonce", "status", "account", "timestamp", "session_id"])
      .where("nonce", "=", data.nonce)
      .distinct()
      .execute();

    // claim ticket for user
    let claimTicketResult = {};
    if (results[0].account !== null) {
      claimTicketResult = await claimTicket(results[0].account);
    }

    const result = results[0];

    // Respond with a success message
    return NextResponse.json(
      { ...result, claimTicketResult },
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

const claimTicket = async (account: string) => {
  const eventId =
    process.env.NODE_ENV === "development"
      ? "4c85a386-ead5-4051-aaba-5ea5213b7251"
      : "e346179a-7b7f-4f34-a005-2c4fa73e8d3c";
  const ticketId =
    process.env.NODE_ENV === "development"
      ? "40f912df-a8ff-4c78-9597-b2c8510307c6"
      : "c57480b3-c8ff-452d-a8f0-b679da3d3a87";

  const claim = await fetch("https://api.tokenproof.xyz/v1/tickets/claim", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      account: account,
      event_id: eventId,
      ticket_options: [
        {
          guests: 0,
          id: ticketId,
        },
      ],
    }),
  });

  return await claim.json();
};
