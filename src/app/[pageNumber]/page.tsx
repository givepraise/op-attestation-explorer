import AttestationList from "../../components/attestations/AttestationsList";
import { AttestationsLoadingList } from "../../components/attestations/AttestationsLoadingList";
import AttestationsPageChooser from "../../components/attestations/AttestationsPageChooser";
import SchemaButtons from "../../components/attestations/SchemaButtons";
import { SubNav } from "../../components/SubNav";
import { Suspense } from "react";
import { SearchAndSort } from "../../components/users/SearchAndSort";

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
