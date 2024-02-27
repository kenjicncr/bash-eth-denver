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
  title: "{bash}",
  description: "records and events for artists and their communities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <html lang="en" className="dark">
      <Providers initialState={initialState}>
        <Header />
        <Toaster />
        {children}
      </Providers>
    </html>
  );
}
