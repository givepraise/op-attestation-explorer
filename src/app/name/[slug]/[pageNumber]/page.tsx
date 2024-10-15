import { AttestationsLoadingList } from '../../../../components/attestations/AttestationsLoadingList';
import { SchemaAttestationList } from '../../../../components/attestations/SchemaAttestationsList';
import SchemaAttestationsPageChooser from '../../../../components/attestations/SchemaAttestationsPageChooser';
import SchemaButtons from '../../../../components/attestations/SchemaButtons';
import { SearchAndSort } from '../../../../components/attestations/SearchAndSort';
import { Suspense } from 'react';

type SchemaAttestationListPageProps = {
	params: {
		slug: string;
		pageNumber: number;
	};
};

export default async function SchemaAttestationListPage({
	params,
}: SchemaAttestationListPageProps) {
	const { slug, pageNumber } = params;

	return (
		<>
			<SearchAndSort />
			<SchemaButtons slug={slug} />
			<Suspense fallback={<AttestationsLoadingList />}>
				<SchemaAttestationList slug={slug} page={pageNumber} />
			</Suspense>
			<SchemaAttestationsPageChooser slug={slug} currentPage={pageNumber} />
		</>
	);
}
