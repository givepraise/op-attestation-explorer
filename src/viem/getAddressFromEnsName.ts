import { publicClient } from './client';
import { unstable_cache } from 'next/cache';

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
