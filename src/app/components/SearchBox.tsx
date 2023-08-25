export function SearchBox() {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search by Address / Txn hash / Schema UID"
        className="w-full bg-black border-white p-2 text-sm"
      />
    </div>
  );
}
