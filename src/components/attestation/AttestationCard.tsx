import Link from 'next/link';
import Image from 'next/image';
import { Attestation } from '../../eas/types/gql/attestation.type';
import { From } from '../attestation-card/From';
import { Recipient } from '../attestation-card/Recipient';
import { SchemaName } from '../attestation-card/SchemaName';
import { Time } from '../attestation-card/Time';
import { Uid } from '../attestation-card/Uid';
import { UserIcon } from '../user/UserIcon';
import { chainLogos, chains, UID_PASSPORT_SCORE } from '@/config';
import { SchemaListItem } from '@/eas/types/schema-list-item.type';
import { extractPassportScore } from '@/util/helpers';

type AttestationCardProps = {
	attestation: Attestation;
	schema?: SchemaListItem;
};

export async function AttestationCard({
	attestation,
	schema,
}: AttestationCardProps) {
	const { chain, uid } = schema || {};
	const isPassportScore = uid === UID_PASSPORT_SCORE;
	let passportScore = '0';
	if (isPassportScore) {
		passportScore = extractPassportScore(attestation);
	}
	return (
		<Link href={`/attestation/${attestation.id}/${chain || chains.OP}`}>
			<div className='flex items-center justify-start w-full p-5 text-sm bg-white gap-10 md:text-base gap-x-5 hover:ring-4 hover:ring-theme-3 hover:ring-opacity-40 rounded-xl shadow-theme-shadow-1'>
				<UserIcon address={attestation.recipient} />
				<div className='flex flex-col'>
					<Recipient recipient={attestation.recipient} />
					<div className='block md:hidden'>
						<Time time={attestation.time.toString()} />
					</div>
				</div>
				<div className='hidden md:block'>
					<Time time={attestation.time.toString()} />
				</div>
				{isPassportScore && <div>{passportScore}</div>}
				<Image
					src={chainLogos[chain || chains.OP]}
					width={20}
					height={20}
					alt='chain logo'
				/>
				<div className='flex-grow'></div>
				<div className='@3xl:grid @3xl:grid-cols-3 @3xl:w-56 text-left hidden'>
					<div className='flex items-center w-12 text-xs text-gray-500'>
						From
					</div>
					<div className='flex items-center col-span-2 gap-1'>
						<UserIcon
							address={attestation.attester}
							size='tiny'
							className='inline-block'
						/>
						<From from={attestation.attester} />
					</div>
					<div className='flex items-center w-12 text-xs text-gray-500'>
						Uid
					</div>
					<Uid uid={attestation.id} className='col-span-2' />
				</div>
				<SchemaName name={schema?.name} uid={attestation.schemaId} />
			</div>
		</Link>
	);
}
