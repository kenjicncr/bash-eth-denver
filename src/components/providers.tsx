"use client";

import React, { ReactNode } from "react";
import { config, projectId } from "@/lib/wagmi/config";
import UniversalProvider from "@walletconnect/universal-provider";

import { createWeb3Modal } from "@web3modal/wagmi/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { State, WagmiProvider } from "wagmi";
import { UniversalConnectProvider } from "./universal-connect-provider";

// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  featuredWalletIds: [
    "43fd1a0aeb90df53ade012cca36692a46d265f0b99b7561e645af42d752edb92",
  ],
  includeWalletIds: [
    "43fd1a0aeb90df53ade012cca36692a46d265f0b99b7561e645af42d752edb92",
  ],
});

export function Providers({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <UniversalConnectProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </UniversalConnectProvider>
    </WagmiProvider>
  );
}
