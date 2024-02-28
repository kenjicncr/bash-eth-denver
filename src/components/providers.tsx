"use client";

import React, { ReactNode } from "react";
import { config, projectId } from "@/lib/wagmi/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextUIProvider } from "@nextui-org/react";
import { State, WagmiProvider } from "wagmi";
import { UniversalConnectProvider } from "./universal-connect-provider";

// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

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
          <NextUIProvider>
            <div>{children}</div>
          </NextUIProvider>
        </QueryClientProvider>
      </UniversalConnectProvider>
    </WagmiProvider>
  );
}
