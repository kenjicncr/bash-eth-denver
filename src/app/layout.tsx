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
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <Providers initialState={initialState}>
        <Header />
        <Toaster
          toastOptions={{
            duration: 20000,
            closeButton: true,
            style: {
              background: `#8994eb`,
              border: `none`,
            },
            classNames: {
              toast: "bg-primary-500",
              title: "text-white",
              description: "text-white",
              actionButton: "bg-zinc-400",
              cancelButton: "bg-orange-400",
              closeButton: "bg-lime-400",
            },
          }}
        />
        {children}
      </Providers>
    </html>
  );
}
