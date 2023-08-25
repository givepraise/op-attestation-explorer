"use client";

import { KeyboardEvent, useState } from "react";

export function SearchBox() {
  const [error, setError] = useState<string>();

  function handleKeyUp(event: KeyboardEvent) {
    if (event.key === "Enter") {
      if (event.target instanceof HTMLInputElement) {
        const value = event.target.value;
        if (value.length === 66) {
          // search by attestation
          window.location.href = `/attestation/${value}`;
          return;
        }
        if (value.length === 42) {
          // search by user
          window.location.href = `/user/${value}`;
          return;
        }
        setError("Invalid address or transaction hash");
      }
    }
  }

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search by Address / Txn hash "
        className="w-full bg-black border-white p-2 text-sm focus:border-white focus:bg-white focus:bg-opacity-10 focus:outline-none"
        onKeyUp={handleKeyUp}
        spellCheck={false}
      />
      {error && <div className="text-red-500 pt-2">{error}</div>}
    </div>
  );
}
