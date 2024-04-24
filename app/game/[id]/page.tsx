'use client';

import { db } from '@/lib/firebase-config';
import { doc, onSnapshot } from 'firebase/firestore';
import { usePathname, useSearchParams } from 'next/navigation';
export default function Game({ params }: { params: { id: String } }) {
	const searchParams = useSearchParams();

	const username = searchParams.get('username');
	const game = usePathname().slice(6);

	const gameDoc = doc(db, 'games', game!.toString());
	const unsubscribe = onSnapshot(gameDoc, (doc) => {
		const data = doc.data()!;
		if (data.state == 'GAMING') {
			console.log('we are gaming');
		}
	});

	return (
		<div className='h-screen flex justify-center items-center'>
			<div className='m-auto space-y-20 text-center'>
				<h1>{username}</h1>
				<p>Waiting for host to start the game...</p>
			</div>
		</div>
	);
}
