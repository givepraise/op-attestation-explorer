"use client";

import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { chains, wagmiConfig } from "../wagmi/wagmiConfig";

import ConnectWallet from "./ConnectWallet";
import Image from "next/image";
import Link from "next/link";
import { WagmiConfig } from "wagmi";

export function Header() {
  return (
    <div className="flex items-start w-full h-40 pt-3 px-7 bg-header">
      <div className="flex flex-col items-center justify-between w-full md:flex-row px-7">
        <div className="flex items-center gap-5">
          <div className="py-5">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Optimism Attestations"
                width={40}
                height={40}
              />
            </Link>
          </div>
          <Link
            href="/1"
            className="hidden p-5 hover:bg-theme-3 hover:bg-opacity-20 md:inline-block"
          >
            Explore
          </Link>
        </div>

        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider
            modalSize="compact"
            theme={lightTheme({
              accentColor: "#d82e2a",
              accentColorForeground: "white",
              borderRadius: "large",
              fontStack: "system",
              overlayBlur: "small",
            })}
            chains={chains}
          >
            <ConnectWallet />
          </RainbowKitProvider>
        </WagmiConfig>
      </div>
    </div>
  );
}
