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
      <div className="w-full h-screen flex flex-col justify-center items-center h-screen px-4">
        <Spacer className="flex-grow"/>
        <Registration />
        <Spacer className="flex-grow"/>
        <LandingPagePartners />
      </div>
    </>
  );
}
