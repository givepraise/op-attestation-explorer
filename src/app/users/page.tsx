import AttestationList from "../components/AttestationList";
import Image from "next/image";
import { SearchBox } from "../components/SearchBox";
import UsersList from "../components/UsersList";

export default function UsersPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col max-w-5xl items-center justify-between font-mono text-sm gap-5">
        Optimism Attestation Explorer
        <SearchBox />
        <UsersList />
      </div>
    </main>
  );
}
