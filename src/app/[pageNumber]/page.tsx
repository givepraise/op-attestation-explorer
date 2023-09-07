import AttestationList from "./components/AttestationsList";
import { AttestationsLoadingList } from "./components/AttestationsLoadingList";
import AttestationsPageChooser from "./components/AttestationsPageChooser";
import SchemaButtons from "./components/SchemaButtons";
import { SearchAndSort } from "./components/SearchAndSort";
import { SubNav } from "../components/SubNav";
import { Suspense } from "react";

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
      <Suspense fallback={<AttestationsLoadingList />}>
        <AttestationList page={params.pageNumber} />
      </Suspense>
      <AttestationsPageChooser currentPage={params.pageNumber} />
    </>
  );
}
