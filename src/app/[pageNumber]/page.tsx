import AttestationList from "./components/AttestationsList";
import AttestationsPageChooser from "./components/AttestationsPageChooser";
import SchemaButtons from "./components/SchemaButtons";
import { SearchAndSort } from "./components/SearchAndSort";
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
      <SchemaButtons />
      <AttestationList page={params.pageNumber} />
      <AttestationsPageChooser currentPage={params.pageNumber} />
    </>
  );
}
