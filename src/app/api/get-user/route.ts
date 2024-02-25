import { NextResponse } from "next/server";

interface UserData {
  email_address: string | null;
  wallet_address: string | null;
  custom_value: string | null;
}

export async function POST(request: Request) {
  try {
    const { email, polkadotAddress, tokenproofAddress } = await request.json();

    if (email) {
      const result = await fetch(
        `https://partner-api.exiledracers.com/api/v1/event/user_status/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            apikey: process.env.EXILED_RACERS_API_KEY,
            event_id: 4,
            email: email,
          }),
        }
      );

      const users = await result.json();

      if (users.length > 0) {
        const user: UserData = users[0];
        console.log({ user, users });
        return NextResponse.json(
          {
            user: {
              email: user.email_address,
              polkadotAddress: user.wallet_address,
              tokenproofAddress: user.custom_value,
            },
            success: true,
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            user: null,
            success: true,
          },
          {
            status: 200,
          }
        );
      }
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
