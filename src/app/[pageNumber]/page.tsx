import AttestationList from "./components/AttestationsList";
import AttestationsPageChooser from "./components/AttestationsPageChooser";
import { SearchAndSort } from "../components/SearchAndSort";
import { SubNav } from "../components/SubNav";

export default async function AttestationListPage({
  params,
}: {
  params: { pageNumber: number };
}) {
  return (
    <>
      <SubNav />
      <SearchAndSort />
      <AttestationList page={params.pageNumber} />
      <AttestationsPageChooser currentPage={params.pageNumber} />
    </>
  );
}
