import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";
import "./globals.css";
import { config } from "@/lib/wagmi/config";
import { Providers } from "@/components/providers";
import { Toaster } from "sonner";
import { Header } from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "{Bash}",
  description: "records and events for artists and their communities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
      <html lang="en">
        <body className="bg-gradient-to-t">
          <Header />
          <Toaster />
          <Providers initialState={initialState}>{children}</Providers>
        </body>
      </html>
  );
}
