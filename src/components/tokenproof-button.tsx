"use client";
import React, { useCallback, useEffect, useState } from "react";
import { CustomButton } from "./custom-button";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

import logo from "@/assets/logos/tokenproof-logo.png";
import { LoadingSpinner } from "./loading-spinner";

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
  const [isLoading, setIsLoading] = useState(false);
  const mutation = useMutation({
    mutationFn: (): Promise<TokenProofResponse> => {
      if (typeof window !== "undefined") {
        setIsLoading(true);
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
      setIsLoading(false);
      if (onAuthenticate) {
        onAuthenticate(response);
      }
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  return (
    <div className="flex justify-center">
      <button
        onClick={() => mutation.mutate()}
        aria-label="verify with tokenproof"
        className="flex justify-center items-center px-4 py-4 bg-white text-black  rounded-md"
      >
        {isLoading ? (
          <LoadingSpinner size={20} color="black" />
        ) : (
          <Image src={logo} alt="token proof" height={20} width={20} />
        )}

        <span className="ml-2 tracking-wide">Claim ticket with tokenproof</span>
      </button>
    </div>
  );
};
