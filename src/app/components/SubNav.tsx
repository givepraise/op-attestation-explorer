"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SubNav() {
  const path = usePathname();

  const activeClassNames = "border-b-2 border-white border-opacity-20 p-5";
  const inactiveClassNames = "border-b-2 border-white p-5";

  return (
    <div className="w-full flex">
      <div
        className={
          path.startsWith("/users") ? inactiveClassNames : activeClassNames
        }
      >
        <Link href="/">Attestations</Link>
      </div>
      <div
        className={
          path.startsWith("/users") ? activeClassNames : inactiveClassNames
        }
      >
        <Link href="/users">Users</Link>
      </div>
      <div className="border-b-2 border-white grow" />
    </div>
  );
}
