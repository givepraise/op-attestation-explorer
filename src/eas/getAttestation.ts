import { gql } from '@apollo/client';
import { unstable_cache } from 'next/cache';
import { Attestation } from './types/gql/attestation.type';
import { AttestationResult } from './types/gql/attestation-result.type';
import { CORE_ATTESTATION_FIELDS } from './types/fragments/core-attestation-fields.fragment';
import { chains, DEFAULT_REVALIDATE_TIME } from '../config';
import { getClient } from '../apollo/getClient';

const query = gql`
	${CORE_ATTESTATION_FIELDS}
	query Attestation($where: AttestationWhereUniqueInput!) {
		attestation(where: $where) {
			...CoreAttestationFields
		}
	}
`;

export const getAttestation = unstable_cache(
	async (id: string, chain?: chains): Promise<Attestation> => {
		let result = await getClient(chain).query<AttestationResult>({
			query,
			fetchPolicy: 'cache-first',
			variables: { where: { id } },
		});
		if (!chain && !result.data.attestation) {
			// We have checked OP before because it's the default chain, so now we should only check Base
			result = await getClient(chains.BASE).query<AttestationResult>({
				query,
				fetchPolicy: 'cache-first',
				variables: { where: { id } },
			});
		}

		if (result.error) {
			console.error(result.error);
			throw new Error('Failed to fetch attestation.');
		}

		return result.data.attestation;
	},
	['getAttestation'],
	{ revalidate: DEFAULT_REVALIDATE_TIME },
);
