import Link from "next/link";

export function MainNav() {
  return (
    <div className="w-full flex mt-3 px-7 items-center justify-between">
      <div className="flex gap-5 items-center">
        <div className="py-5">
          <Link href="/">
            <img src="/optimism-attestations.svg" alt="Optimism Attestations" />
          </Link>
        </div>
        <Link
          href="/1"
          className="hover:bg-theme-3 hover:bg-opacity-20 p-5 hidden md:inline-block"
        >
          Explore
        </Link>
      </div>
      <div>Connect wallet</div>
    </div>
  );
}
