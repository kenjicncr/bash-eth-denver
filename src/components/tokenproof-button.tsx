"use client";
import React, { useCallback, useEffect } from "react";
import { CustomButton } from "./custom-button";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

export interface TokenProofResponse {
  nonce: string;
  status: "authenticated" | "rejected";
  reason?: string;
  timestamp?: string;
  session_id?: string;
  accounts?: string[];
  account?: string;
}

interface TokenproofButtonProps {
  onAuthenticate?: (response: TokenProofResponse) => void;
}
export const TokenproofButton = ({ onAuthenticate }: TokenproofButtonProps) => {
  const mutation = useMutation({
    mutationFn: (): Promise<TokenProofResponse> => {
      if (typeof window !== "undefined") {
        //@ts-ignore
        let tokenproof = window.tokenproof;

        const appId = "20b9a646-1aa9-4d33-b776-bcb126969d9c";
        return tokenproof.login({ appId }) as Promise<TokenProofResponse>;
      } else {
        throw new Error("Window is undefined");
      }
    },
    onSuccess: (response) => {
      console.log(response);
      if (onAuthenticate) {
        onAuthenticate(response);
      }
    },
  });

  return (
    <div>
      <button
        onClick={() => mutation.mutate()}
        aria-label="verify with tokenproof"
      >
        <Image
          src="/tokenproof-button.png"
          alt="Image"
          width={530}
          height={111}
        />
      </button>
    </div>
  );
};
