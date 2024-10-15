import { normalize } from 'viem/ens';
import { unstable_cache } from 'next/cache';
import { publicClient } from './client';

export const getEnsAvatar = unstable_cache(async (address: string) => {
	const ensName = await publicClient.getEnsName({
		address: address as `0x${string}`,
	});
	if (ensName) {
		const ensAvatar = await publicClient.getEnsAvatar({
			name: normalize(ensName),
		});
		return ensAvatar;
	}
});
