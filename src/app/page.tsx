import AttestationList from "./components/AttestationList";
import Image from "next/image";
import { SearchBox } from "./components/SearchBox";

export default function Home() {
  return (
    <>
      <SearchBox />
      <AttestationList />
    </>
  );
}
