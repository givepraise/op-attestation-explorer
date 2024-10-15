import { AllAttestationsResult } from './types/gql/all-attestations-result.type';
import { Attestation } from './types/gql/attestation.type';
import { CORE_ATTESTATION_FIELDS } from './types/fragments/core-attestation-fields.fragment';
import { DEFAULT_REVALIDATE_TIME } from '../config';
import { getClient } from '../apollo/getClient';
import { gql } from '@apollo/client';
import { unstable_cache } from 'next/cache';
import { SchemaListItem } from '@/eas/types/schema-list-item.type';

const query = gql`
	${CORE_ATTESTATION_FIELDS}
	query Attestations($where: AttestationWhereInput, $take: Int, $skip: Int) {
		attestations(
			orderBy: { time: desc }
			where: $where
			take: $take
			skip: $skip
		) {
			...CoreAttestationFields
		}
	}
`;

export const getAllSchemaAttestations = unstable_cache(
	async (
		schema: SchemaListItem,
		take: number,
		skip: number,
	): Promise<Attestation[]> => {
		const chain = schema.chain;
		const result = await getClient(chain).query<AllAttestationsResult>({
			query,
			fetchPolicy: 'cache-first',
			variables: {
				where: schema.gqlWhere,
				take,
				skip: skip || undefined,
			},
		});

		if (result.error) {
			console.error(result.error);
			throw new Error('Failed to fetch schema attestations.');
		}

		return result.data.attestations;
	},
	['getAllSchemaAttestations'],
	{ revalidate: DEFAULT_REVALIDATE_TIME },
);
