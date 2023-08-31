"use client";

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
        <a href="/">Attestations</a>
      </div>
      <div
        className={
          path.startsWith("/users") ? activeClassNames : inactiveClassNames
        }
      >
        <a href="/users">Users</a>
      </div>
      <div className="border-b-2 border-white grow" />
    </div>
  );
}
