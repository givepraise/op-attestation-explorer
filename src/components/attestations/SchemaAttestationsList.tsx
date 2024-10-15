import { ATTESTATIONS_PER_PAGE } from '../../config';
import { AttestationCard } from '../attestation/AttestationCard';
import { getAllSchemaAttestations } from '../../eas/getAllSchemaAttestations';
import { getSchemaBySlug } from '@/eas/getSchemaData';

type AttestationListProps = {
	slug: string;
	page: number;
};
export async function SchemaAttestationList({
	slug,
	page,
}: AttestationListProps) {
	const schema = getSchemaBySlug(slug);
	if (!schema) return null;
	const attestations = await getAllSchemaAttestations(
		schema,
		ATTESTATIONS_PER_PAGE,
		(page - 1) * ATTESTATIONS_PER_PAGE,
	);

	return (
		<ol className='w-full @container'>
			{attestations.map(att => (
				<li key={att.id} className='pb-5'>
					<AttestationCard attestation={att} schema={schema} />
				</li>
			))}
		</ol>
	);
}
