import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import { ATTESTATIONS_PER_PAGE } from '../../config';
import { getAllSchemaAttestationsCount } from '../../eas/getAllSchemaAttestationsCount';
import { getSchemaBySlug } from '@/eas/getSchemaData';

type SchemaAttestationsPageChooserProps = {
	slug: string;
	currentPage: number;
};

async function SchemaAttestationsPageChooser({
	slug,
	currentPage,
}: SchemaAttestationsPageChooserProps) {
	const schema = getSchemaBySlug(slug);
	if (!schema) return null;
	const attestationsCount = await getAllSchemaAttestationsCount(schema);
	const totalPages = Math.ceil(attestationsCount / ATTESTATIONS_PER_PAGE);
	currentPage = Number(currentPage);

	return (
		<div className='flex items-baseline justify-between w-full'>
			<div className='w-40'>
				{/* First Button */}
				<div className='hidden mr-4 md:inline-block hover:border-b-2 hover:border-theme-1'>
					{currentPage > 1 && (
						<Link href={`/name/${slug}/1`}>
							<FontAwesomeIcon icon={faArrowLeft} className='w-4 h-4 pr-2' />
							First
						</Link>
					)}
				</div>

				{/* Previous Button */}
				<div className='inline-block hover:border-b-2 hover:border-theme-1'>
					{currentPage > 1 && (
						<Link href={`/name/${slug}/${currentPage - 1}`}>
							{' '}
							<FontAwesomeIcon icon={faArrowLeft} className='w-4 h-4 pr-2' />
							Previous
						</Link>
					)}
				</div>
			</div>

			{/* Current Page Info */}
			<div className='text-sm text-gray-500 whitespace-nowrap'>
				{currentPage} of {totalPages}
			</div>

			<div className='flex justify-end w-40'>
				{/* Next Button */}
				<div className='inline-block mr-4 hover:border-b-2 hover:border-theme-1'>
					{currentPage < totalPages && (
						<Link href={`/name/${slug}/${currentPage + 1}`}>
							Next
							<FontAwesomeIcon icon={faArrowRight} className='w-4 h-4 pl-2' />
						</Link>
					)}
				</div>

				{/* Last Button */}
				<div className='hidden md:inline-block hover:border-b-2 hover:border-theme-1'>
					{currentPage < totalPages && (
						<Link href={`/name/${slug}/${totalPages}`}>
							Last
							<FontAwesomeIcon icon={faArrowRight} className='w-4 h-4 pl-2' />
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}

export default SchemaAttestationsPageChooser;
