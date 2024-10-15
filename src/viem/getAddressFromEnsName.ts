import { unstable_cache } from 'next/cache';
import { publicClient } from './client';

export const getAddressFromEnsName = unstable_cache(async (name: string) => {
	try {
		return await publicClient.getEnsAddress({
			name: name,
		});
	} catch (e) {
		console.error(e);
		return null;
	}
});
