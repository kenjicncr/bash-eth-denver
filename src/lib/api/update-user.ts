export const updateUser = async ({
  email,
  polkadotAddress,
  tokenproofAddress,
}: {
  email: string;
  polkadotAddress?: string;
  tokenproofAddress?: string;
}) => {
  if (email === "") {
    throw new Error("Email is required");
  } else {
    const res = await fetch("/api/update-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, polkadotAddress, tokenproofAddress }),
    });
    return await res.json();
  }
};
