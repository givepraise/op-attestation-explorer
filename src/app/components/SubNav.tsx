"use client";

import { usePathname } from "next/navigation";

export function SubNav() {
  const path = usePathname();

  const activeClassNames = "border-b-2 border-red-500 p-5";
  const inactiveClassNames = "border-b-2 border-white p-5";

  return (
    <div className="w-full flex">
      <div className={path === "/" ? activeClassNames : inactiveClassNames}>
        <a href="/">Attestations</a>
      </div>
      <div
        className={path === "/users" ? activeClassNames : inactiveClassNames}
      >
        <a href="/users">Users</a>
      </div>
      <div className="border-b-2 border-white grow" />
    </div>
  );
}
