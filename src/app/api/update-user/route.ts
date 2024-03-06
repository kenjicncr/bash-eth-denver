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

const getUser = async (email: string) => {
  const usersResult = await fetch(
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

  const users = await usersResult.json();

  if (users.length > 0) {
    return users[0];
  }
};
export async function POST(request: Request) {
  try {
    const { email, role } = await request.json();

    if (email) {
      console.log("updating: ", email, role);
      const result = await fetch(
        `https://partner-api.exiledracers.com/api/v1/partner/user_update/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            apikey: process.env.EXILED_RACERS_API_KEY,
            partner_id: 1,
            email: email,
            role: role,
            source: "general",
          }),
        }
      );

      return NextResponse.json(
        {
          user: {
            email: email,
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
