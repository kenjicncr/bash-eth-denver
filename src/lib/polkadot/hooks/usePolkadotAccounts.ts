"use client";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { decodeAddress, encodeAddress } from "@polkadot/util-crypto";

export type Maybe<T> = T | null | undefined;
export function safeConvertAddressSS58(
  address: Maybe<string>,
  ss58prefix: number
) {
  return encodeAddress(decodeAddress(address), ss58prefix);
}

export const usePolkadotWeb3 = () => {
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [injector, setInjector] = useState(null);
  const { address } = useAccount();

  useEffect(() => {
    const enableWeb3 = async () => {
      const { web3Accounts, web3Enable, web3FromAddress } = await import(
        "@polkadot/extension-dapp"
      );

      if (typeof window !== undefined && address) {
        const polkadotAddy = safeConvertAddressSS58(address, 7);

        console.log({ polkadotAddy });

        const extensions = await web3Enable("Bash ETHDenver");
        console.log({ extensions });
        const allAccounts = await web3Accounts();
        const provider = address ? await web3FromAddress(address) : [];

        console.log({ allAccounts, provider });
        setAccounts(allAccounts);
        //const injector = await web3FromAddress(SENDER);
        // setInjector(injector);
      }
    };

    enableWeb3();
  }, [address]);

  return { accounts, injector };
};
