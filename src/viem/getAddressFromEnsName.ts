import React from 'react';
import { publicClient } from './client';
import { unstable_cache } from 'next/cache';

export const getAddressFromEnsName = unstable_cache(async (name: string) => {
	try {
		const ensAddress = await publicClient.getEnsAddress({
			name: name,
		});
		return ensAddress;
	} catch (e) {
		console.error(e);
		return null;
	}
});
