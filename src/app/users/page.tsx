import AttestationList from "../components/AttestationList";
import Image from "next/image";
import { SearchBox } from "../components/SearchBox";
import UsersList from "../components/UsersList";

export default function UsersPage() {
  return (
    <>
      <SearchBox />
      <UsersList />
    </>
  );
}
