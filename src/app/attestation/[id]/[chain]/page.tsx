import { chains } from '@/config';
import Attestation from '@/components/attestation/Attestation';

export default async function AttestationPage({
	params,
}: {
	params: { id: string; chain: chains };
}) {
	return <Attestation params={params} />;
}
