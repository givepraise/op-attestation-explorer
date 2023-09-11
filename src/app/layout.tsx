import "./globals.css";

import { Footer } from "../components/user/Footer";
import { MainNav } from "../components/MainNav";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Optimism Attestation Explorer",
  description: "Browse attestations on Optimism.",
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
        <main className="flex flex-col min-h-screen items-center">
          <MainNav />
          <div className="flex flex-grow flex-col w-full px-5 lg:w-[1024px] items-center gap-5">
            {children}
          </div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
