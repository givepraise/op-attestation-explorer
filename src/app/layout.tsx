import "./globals.css";

import { MainNav } from "./components/MainNav";
import type { Metadata } from "next";

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
        <MainNav />
        <main className="flex flex-col items-center">
          <div className="flex flex-col w-[1024px] items-center justify-between gap-5">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
