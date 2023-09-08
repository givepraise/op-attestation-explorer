import "./globals.css";

import { chains, wagmiConfig } from "../wagmi/wagmiConfig";

import { MainNav } from "../components/MainNav";
import type { Metadata } from "next";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";

export const metadata: Metadata = {
  title: "Optimism Attestation Explorer",
  description: "Browse Praise attestations on Optimism",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" reverseOrder={false} />
        <MainNav />
        <main className="flex flex-col items-center pt-10 pb-10">
          <div className="flex flex-col w-full px-5 lg:w-[1024px] items-center justify-between gap-5">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
