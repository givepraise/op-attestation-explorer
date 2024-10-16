import './globals.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { faHourglassEnd } from '@fortawesome/free-solid-svg-icons';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Optimism Attestation Explorer',
	description: 'Browse attestations on Optimism.',
	metadataBase: new URL('https://citizen-attestations.xyz'),
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>
				<Toaster position='top-center' reverseOrder={false} />
				<main className='flex flex-col items-center min-h-screen'>
					<Header />
					<div className='flex flex-grow flex-col w-full px-5 lg:w-[1024px] items-center gap-5'>
						<Suspense
							fallback={
								<FontAwesomeIcon
									icon={faHourglassEnd}
									spin
									className='w-10 h-10 text-theme-2'
								/>
							}
						>
							{children}
						</Suspense>
					</div>
					<Footer />
				</main>
			</body>
		</html>
	);
}
