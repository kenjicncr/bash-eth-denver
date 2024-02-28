import Script from "next/script";
import type { Metadata } from "next";
import { TokenproofSuccessPage } from "./tokenproof-success-page";

export const metadata: Metadata = {
  title: "{Bash} | ETH Denver After Party",
  description: "Register for the official ETH Denver 2024 after party",
};
export default function Home() {
  return (
    <>
      <Script
        id="tokenproof"
        src="https://cdn.tokenproof.xyz/js/tokenproof-oa-widget-v1.0.js"
      />
      <TokenproofSuccessPage />
    </>
  );
}
