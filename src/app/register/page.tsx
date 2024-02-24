import { Registration } from "@/components/registration";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <Script id="luma-checkout" src="https://embed.lu.ma/checkout-button.js" />
      <Script
        id="tokenproof"
        src="https://cdn.tokenproof.xyz/js/tokenproof-oa-widget-v1.0.js"
      />
      <div>
        <main className="flex min-h-screen flex-col items-center justify-between p-12 bg-gradient-to-t">
          <div className="pt-12 lg:pt-32 w-full flex flex-col items-center">
            <Registration />
          </div>
        </main>
      </div>
    </>
  );
}
