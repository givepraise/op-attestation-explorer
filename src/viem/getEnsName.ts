import { unstable_cache } from 'next/cache';
import { publicClient } from './client';

export const getEnsName = unstable_cache(async (address: string) => {
	return publicClient.getEnsName({
		address: address as `0x${string}`,
	});
});
