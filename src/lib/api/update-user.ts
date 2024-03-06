export const updateUser = async ({
  email,
  polkadotAddress,
  tokenproofAddress,
  role,
}: {
  email: string;
  polkadotAddress?: string;
  tokenproofAddress?: string;
  role?: string;
}) => {
  if (email === "") {
    throw new Error("Email is required");
  } else {
    const res = await fetch("/api/update-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, polkadotAddress, tokenproofAddress, role }),
    });
    return await res.json();
  }
};
