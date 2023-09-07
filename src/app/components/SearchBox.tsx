"use client";

import { KeyboardEvent, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
        // search by user address or username
        window.location.href = `/user/${value}`;
        return;
      }
    }
  }

  return (
    <div className="flex-grow relative">
      <FontAwesomeIcon
        icon={faSearch}
        className="w-4 h-4 absolute top-3 left-3"
      />
      <input
        type="text"
        placeholder="Search by Username / Address / Txn hash "
        className="w-full border-none p-2 hover:ring-4 hover:ring-theme-3 hover:ring-opacity-40 focus:ring-1 focus:ring-theme-3 rounded-xl pl-10 shadow-theme-shadow-1 focus:shadow-theme-shadow-1"
        onKeyUp={handleKeyUp}
        spellCheck={false}
      />
      {error && <div className="text-red-500 pt-2">{error}</div>}
    </div>
  );
}
