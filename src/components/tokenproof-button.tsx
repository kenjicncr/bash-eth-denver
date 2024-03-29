"use client";
import React, { useCallback, useEffect, useState } from "react";
import { CustomButton } from "./custom-button";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

import logo from "@/assets/logos/tokenproof-logo.png";
import { LoadingSpinner } from "./loading-spinner";
import { Button } from "@nextui-org/react";
import { useLocalStorage } from "react-use";

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
  const [nonce, setNonce] = useLocalStorage("nonce", "");
  const mutation = useMutation({
    mutationFn: async (): Promise<TokenProofResponse> => {
      if (typeof window !== "undefined") {
        setIsLoading(true);
        //@ts-ignore
        let tokenproof = window.tokenproof;

        const appId =
          process.env.NODE_ENV === "development"
            ? "20b9a646-1aa9-4d33-b776-bcb126969d9c"
            : "afb7c5d9-136f-489a-8fe1-8f53f130064a";
        return (await tokenproof.login({
          appId,
        })) as Promise<TokenProofResponse>;
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

  useEffect(() => {
    let tokenproofAuthenticate: any;
    let tokenproof: any;
    if (typeof window !== undefined) {
      //@ts-ignore
      tokenproof = window.tokenproof;
      tokenproofAuthenticate = tokenproof.on("nonce", (e: any) => {
        console.log("new nonce generated: ", e);
        setNonce(e.current);
      });
    }
  }, []);

  return (
    <Button
      radius="sm"
      variant="solid"
      size="lg"
      isLoading={isLoading}
      aria-label="verify with tokenproof"
      className="opacity-100 hover:text-primary-300 hover:text-opacity-100"
      onClick={async () => {
        const data = await mutation.mutate();
        console.log({ data });
      }}
      startContent={
        <Image src={logo} alt="token proof" height={20} width={20} />
      }
    >
      Claim with Tokenproof
    </Button>
  );
};
