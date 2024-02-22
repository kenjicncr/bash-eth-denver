import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`CREATE TABLE TokenProofData (
      nonce VARCHAR(255),
      status VARCHAR(255),
      account VARCHAR(255),
      timestamp TIMESTAMP,
      session_id VARCHAR(255)
);`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
