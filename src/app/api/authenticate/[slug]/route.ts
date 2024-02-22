import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON data from the request body
    const data = req.body;

    // Handle the incoming webhook data here
    console.log("Received webhook data:", data);

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
