import { Suspense } from 'react';
import { AttestationList } from '../../components/attestations/AttestationsList';
import { AttestationsLoadingList } from '../../components/attestations/AttestationsLoadingList';
import AttestationsPageChooser from '../../components/attestations/AttestationsPageChooser';
import SchemaButtons from '../../components/attestations/SchemaButtons';
import { SearchAndSort } from '../../components/attestations/SearchAndSort';

export default async function AttestationListPage({
	params,
}: {
	params: { pageNumber: number };
}) {
	return (
		<>
			<SearchAndSort />
			<SchemaButtons />
			<Suspense fallback={<AttestationsLoadingList />}>
				<AttestationList page={params.pageNumber} />
			</Suspense>
			<AttestationsPageChooser currentPage={params.pageNumber} />
		</>
	);
}
