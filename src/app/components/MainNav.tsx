import Link from "next/link";

export function MainNav() {
  return (
    <div className="w-full flex p-10 gap-10">
      <div>
        <Link href="/">
          Optimism <br />
          Attestations
        </Link>
      </div>
      <Link href="/1">Explore</Link>
    </div>
  );
}
