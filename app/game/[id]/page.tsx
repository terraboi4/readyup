'use client';

import Questions from '@/components/Questions';
import { db } from '@/lib/firebase-config';
import { doc, onSnapshot } from 'firebase/firestore';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
export default function Game({ params }: { params: { id: String } }) {
	const searchParams = useSearchParams();

	const username = searchParams.get('username');
	const game = usePathname().slice(6);
	const [state, setState] = useState<String>('WAITING');
	const [setId, setSetId] = useState<String>('');
	const gameDoc = doc(db, 'games', game!.toString());
	const unsubscribe = onSnapshot(gameDoc, (doc) => {
		const data = doc.data()!;

		setSetId(data.setId);
		if (data.state == 'GAMING') {
			setState('GAMING');
		}
	});

	return (
		<div>
			{state == 'WAITING' && (
				<div className='h-screen flex justify-center items-center'>
					<div className='m-auto space-y-20 text-center'>
						<h1>{username}</h1>
						<p>Waiting for host to start the game...</p>
					</div>
				</div>
			)}
			{state == 'GAMING' && <Questions setId={setId} />}
		</div>
	);
}
