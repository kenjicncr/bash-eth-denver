import { NextResponse } from "next/server";

interface UserData {
  email_address: string | null;
  wallet_address: string | null;
  custom_value: string | null;
}

type UpdateUserResponse =
  | {
      user: {
        email: string;
        polkadotAddress: string;
        tokenproofAddress: string;
      };
      success: true;
    }
  | {
      success: false;
      error: string;
    };

export async function POST(request: Request) {
  try {
    const { email, tokenproofAddress, action } = await request.json();

    if (email) {
      console.log("button clicked", email, action);
      const result = await fetch(
        `https://partner-api.exiledracers.com/api/v1/event/user_action/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            apikey: process.env.EXILED_RACERS_API_KEY,
            event_id: 4,
            email: email,
            wallet: tokenproofAddress,
            action: action,
          }),
        }
      );

      return NextResponse.json(
        {
          user: {
            action: action,

            email: email,
            tokenproofAddress: tokenproofAddress,
          },
          success: true,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "No email provided",
        },
        { status: 400 }
      );
    }

    /**

    const user = await fetch(
      `https://partner-api.exiledracers.com/api/v1/event/user_update/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apikey: process.env.EXILED_RACERS_API_KEY,
          event_id: 4,
          wallet: "",
        }),
      }
    );
     */
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
