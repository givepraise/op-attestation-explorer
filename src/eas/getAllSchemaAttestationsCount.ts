import { DEFAULT_REVALIDATE_TIME } from '../config';
import { getClient } from '../apollo/getClient';
import { getSchemaByUid } from './getSchemaData';
import { gql } from '@apollo/client';
import { unstable_cache } from 'next/cache';
import { SchemaListItem } from '@/eas/types/schema-list-item.type';

const query = gql`
	query AggregateAttestation($where: AttestationWhereInput) {
		aggregateAttestation(where: $where) {
			_count {
				id
			}
		}
	}
`;

export const getAllSchemaAttestationsCount = unstable_cache(
	async (schema: SchemaListItem): Promise<number> => {
		const chain = schema.chain;
		const result = await getClient(chain).query<AllAttestationsCountResult>({
			query,
			fetchPolicy: 'cache-first',
			variables: { where: schema.gqlWhere },
		});

		if (result.error) {
			console.error(result.error);
			throw new Error('Failed to fetch schema attestations count.');
		}

		return result.data.aggregateAttestation._count.id;
	},
	['getAllSchemaAttestationsCount'],
	{ revalidate: DEFAULT_REVALIDATE_TIME },
);
