import { Registration } from "@/components/registration";
import Script from "next/script";
import type { Metadata } from "next";
import { Spacer } from "@nextui-org/react";
import { LandingPagePartners } from "@/components/landing-page-partners";

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
      <div className="overflow-hidden relative w-full h-screen flex flex-col justify-center items-center h-screen px-4">
        <div className="absolute bottom-0 opacity-30 z-0">
          <LandingPagePartners />
        </div>
        <div className="relative z-1 w-full">
          <Registration />
        </div>
      </div>
    </>
  );
}
