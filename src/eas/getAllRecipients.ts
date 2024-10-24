import { gql } from '@apollo/client';
import { unstable_cache } from 'next/cache';
import { DEFAULT_REVALIDATE_TIME, WHERE_ALL_SCHEMAS } from '../config';
import { AllRecipientsResult } from './types/gql/all-recipients-result.type';
import { Recipient } from './types/gql/recipient.type';
import { getClient } from '../apollo/getClient';

const query = gql`
	query Attestations($where: AttestationWhereInput) {
		recipients: attestations(where: $where) {
			address: recipient
		}
	}
`;

export const getAllRecipients = unstable_cache(
	async (): Promise<Recipient[]> => {
		const result = await getClient().query<AllRecipientsResult>({
			query,
			fetchPolicy: 'cache-first',
			variables: { where: WHERE_ALL_SCHEMAS, distinct: 'recipient' },
		});

		if (result.error) {
			console.error(result.error);
			throw new Error('Failed to fetch recipients.');
		}

		const aggregatedRecipients: Recipient[] = Object.values(
			result.data.recipients.reduce(
				(acc, recipient) => {
					if (!acc[recipient.address]) {
						acc[recipient.address] = {
							...recipient,
							attestations: 0,
						};
					}
					acc[recipient.address].attestations! += 1;
					return acc;
				},
				{} as Record<string, Recipient>,
			),
		);

		return aggregatedRecipients;
	},
	['getAllRecipients'],
	{ revalidate: DEFAULT_REVALIDATE_TIME },
);
