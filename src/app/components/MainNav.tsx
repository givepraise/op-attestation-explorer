import Link from "next/link";

export function MainNav() {
  return (
    <div className="w-full flex p-10 gap-10">
      <div>
        <Link href="/">
          <img src="/optimism.svg" alt="Optimism" />
        </Link>
      </div>
      <Link href="/1">Explore</Link>
    </div>
  );
}
