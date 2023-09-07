"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SubNav() {
  const path = usePathname();

  const inactiveClassNames = "border-b-2 border-theme-gray-1 p-5";
  const activeClassNames = "border-b-2 border-theme-1 p-5";

  return (
    <div className="w-full flex">
      <div
        className={
          path.startsWith("/users") ? inactiveClassNames : activeClassNames
        }
      >
        <Link href="/1">Attestations</Link>
      </div>
      <div
        className={
          path.startsWith("/users") ? activeClassNames : inactiveClassNames
        }
      >
        <Link href="/users">Users</Link>
      </div>
      <div className="border-b-2 border-theme-gray-1 grow" />
    </div>
  );
}
