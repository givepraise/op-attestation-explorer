import { AttestationsLoadingList } from "../../components/attestations/AttestationsLoadingList";
import AttestationsPageChooser from "../../components/attestations/AttestationsPageChooser";
import SchemaButtons from "../../components/attestations/SchemaButtons";
import { SubNav } from "../../components/SubNav";
import { Suspense } from "react";
import { SearchAndSort } from "../../components/attestations/SearchAndSort";
import { AttestationList } from "../../components/attestations/AttestationsList";

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
