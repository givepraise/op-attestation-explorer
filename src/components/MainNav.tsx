"use client";

import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { WagmiConfig, useAccount } from "wagmi";
import { chains, wagmiConfig } from "../wagmi/wagmiConfig";

import ConnectWallet from "./ConnectWallet";
import Link from "next/link";

export function MainNav() {
  return (
    <div className="flex items-center justify-between w-full mt-3 px-7">
      <div className="flex items-center gap-5">
        <div className="py-5">
          <Link href="/">
            <img src="/optimism-attestations.svg" alt="Optimism Attestations" />
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
  );
}
