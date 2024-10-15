import { gql } from '@apollo/client';
import { unstable_cache } from 'next/cache';
import { chains, DEFAULT_REVALIDATE_TIME, WHERE_ALL_SCHEMAS } from '../config';
import { AllAttestationsResult } from './types/gql/all-attestations-result.type';
import { Attestation } from './types/gql/attestation.type';
import { CORE_ATTESTATION_FIELDS } from './types/fragments/core-attestation-fields.fragment';
import { getClient } from '../apollo/getClient';

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

export const getAllAttestations = unstable_cache(
	async (take: number, skip: number): Promise<Attestation[]> => {
		const OPResult = await getClient().query<AllAttestationsResult>({
			query,
			fetchPolicy: 'cache-first',
			variables: {
				where: WHERE_ALL_SCHEMAS,
				take,
				skip: skip || undefined,
			},
		});
		const BaseResult = await getClient(
			chains.BASE,
		).query<AllAttestationsResult>({
			query,
			fetchPolicy: 'cache-first',
			variables: {
				where: WHERE_ALL_SCHEMAS,
				take,
				skip: skip || undefined,
			},
		});

		if (OPResult.error || BaseResult.error) {
			console.error(OPResult.error);
			throw new Error('Failed to fetch attestations.');
		}

		return OPResult.data.attestations;
	},
	['getAllAttestations'],
	{ revalidate: DEFAULT_REVALIDATE_TIME },
);
