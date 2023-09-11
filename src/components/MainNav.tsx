"use client";

import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { chains, wagmiConfig } from "../wagmi/wagmiConfig";

import ConnectWallet from "./ConnectWallet";
import Link from "next/link";
import { WagmiConfig } from "wagmi";

export function MainNav() {
  return (
    <div className="flex items-start w-full pt-3 px-7 bg-header h-40">
      <div className="flex flex-col md:flex-row items-center justify-between w-full px-7">
        <div className="flex items-center gap-5">
          <div className="py-5">
            <Link href="/">
              <img
                src="/optimism-attestations.svg"
                alt="Optimism Attestations"
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
