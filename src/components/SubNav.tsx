"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SubNav() {
  const path = usePathname();

  const inactiveClassNames =
    "border-b-4 border-theme-gray-1 p-5 hover:bg-theme-3 hover:bg-opacity-20 hover:border-theme-3";
  const activeClassNames =
    "border-b-4 border-theme-1 p-5 hover:bg-theme-3 hover:bg-opacity-20";

  return (
    <div className="w-full flex">
      <Link href="/1">
        <div
          className={
            path.startsWith("/users") ? inactiveClassNames : activeClassNames
          }
        >
          Attestations
        </div>
      </Link>
      <Link href="/users">
        <div
          className={
            path.startsWith("/users") ? activeClassNames : inactiveClassNames
          }
        >
          Users
        </div>
      </Link>
      <div className="border-b-4 border-theme-gray-1 grow" />
    </div>
  );
}
