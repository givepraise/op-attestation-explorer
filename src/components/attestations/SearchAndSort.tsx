import { SearchBox } from "../SearchBox";

export function SearchAndSort() {
  return (
      <>
          <h1>Superchain Attestation Explorer</h1>
          <div>Enter an address below to search for attestations relevant to OP governance across the Superchain (on Optimism, Base and beyond).
          </div>
    <div className="flex w-full gap-5">
      <SearchBox />
    </div>
          </>
  );
}
