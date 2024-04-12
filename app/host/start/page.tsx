'use client';

import { db } from '@/lib/firebase-config';
import {
	collection,
	addDoc,
	serverTimestamp,
	onSnapshot,
	orderBy,
	query,
	where,
} from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function StartGame() {
	const searchParams = useSearchParams();
	const game = searchParams.get('game');
	const gamesRef = collection(db, 'games');
	const [pin, setPin] = useState(0);

	let s: Object[] = [];
	const makeGame = async () => {
		let number = Math.floor(100000 + Math.random() * 900000);

		await setPin(number);

		await addDoc(gamesRef, {
			pin: number,
			state: 'WAITING',
			users: [],
			createdAt: serverTimestamp(),
		});
	};
	useEffect(() => {
		makeGame();
		console.log('hi');
	}, []);

	return (
		<div>
			<div className='navbar mb-4'>
				<div className='navbar-start'></div>
				<div className='navbar-center flex-col space-y-2'>
					<p className='font-bold'>
						Go to readyup.com/join and enter this pin:
					</p>
					<p className='text-4xl font-bold text-neutral bg-primary rounded-md p-2'>
						{pin == 0 ? 'Waiting...' : pin}
					</p>
				</div>
				<div className='navbar-end'>
					<button className='btn btn-primary'>Start Game</button>
				</div>
			</div>
			<div className='text-center p-4'>hi</div>
		</div>
	);
}
