import React from 'react';
import { EAS_SCHEMAS } from '../../config';

type SchemaNameProps = {
	uid: string;
	name?: string;
};

export const SchemaName = React.memo(function SchemaName({
	uid,
	name,
}: SchemaNameProps) {
	const schema = EAS_SCHEMAS.find(schema => schema.uid === uid);

	return (
		<div className='w-32 px-2 py-1 text-xs text-center border rounded-md bg-theme-gray-1'>
			{name || schema?.name}
		</div>
	);
});
