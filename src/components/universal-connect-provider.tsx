"use client";
import UniversalProvider from "@walletconnect/universal-provider";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Struct } from "@polkadot/types";

export interface UniversalConnectContextInterface {
  provider: UniversalProvider | null;
  uri: string | undefined;
}

const UniversalConnectContext = createContext<UniversalConnectContextInterface>(
  {
    provider: null,
    uri: undefined,
  }
);

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

const UniversalConnectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [provider, setProvider] = useState<UniversalProvider | null>(null);
  const [uri, setUri] = useState<string | undefined>(undefined);

  useEffect(() => {
    const initializeProvider = async () => {
      const initializedProvider = await UniversalProvider.init({
        projectId: projectId,
        relayUrl: "wss://relay.walletconnect.com",
      });

      setProvider(initializedProvider);
    };
    initializeProvider();
  }, []);

  return (
    <UniversalConnectContext.Provider
      value={{
        provider: provider,
        uri,
      }}
    >
      {children}
    </UniversalConnectContext.Provider>
  );
};

const useUniversalConnect = () => {
  return useContext(UniversalConnectContext);
};

export { UniversalConnectProvider, useUniversalConnect };
