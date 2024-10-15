import { publicClient } from './client';
import { unstable_cache } from 'next/cache';

export const getEnsName = unstable_cache(async (address: string) => {
	return publicClient.getEnsName({
		address: address as `0x${string}`,
	});
});
