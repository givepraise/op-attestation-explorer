import "./globals.css";

import type { Metadata } from "next";
import { Nav } from "./components/Nav";

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
        <Nav />
        <main className="flex flex-col items-center">
          <div className="pb-20">Optimism Attestation Explorer</div>
          <div className="flex flex-col w-[800px] items-center justify-between font-mono text-sm gap-5">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
