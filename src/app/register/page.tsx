import { Registration } from "@/components/registration";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "{Bash} | ETH Denver After Party",
  description: "Register for the official ETH Denver 2024 after party",
};
export default function Home() {
  return (
    <>
      <Script id="luma-checkout" src="https://embed.lu.ma/checkout-button.js" />
      <Script
        id="tokenproof"
        src="https://cdn.tokenproof.xyz/js/tokenproof-oa-widget-v1.0.js"
      />
      <div>
        <main className="flex min-h-screen flex-col items-center justify-between px-6 lg:px-12 p-12 bg-gradient-to-t">
          <div className="pt-32 lg:pt-16 w-full flex flex-col items-center">
            <Registration />
          </div>
        </main>
      </div>
    </>
  );
}
