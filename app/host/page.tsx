'use client';

import { db } from '@/lib/firebase-config';
import {
	collection,
	setDoc,
	doc,
	serverTimestamp,
	query,
	onSnapshot,
	where,
	getDoc,
} from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function StartGame() {
	const searchParams = useSearchParams();

	const id = searchParams.get('id');
	let decodedId;
	if (id) {
		decodedId = atob(id)?.split(';');
	}
	const game = decodedId?.[0];
	const pin = decodedId?.[1];
	const setId = decodedId?.[2];

	const gamesRef = collection(db, 'games');
	const gameDoc = doc(db, 'games', pin ?? '0');
	const [users, setUsers] = useState<any>([]);
	const [currentScreen, setCurrentScreen] = useState('waiting');

	const makeGame = async () => {
		await setDoc(gameDoc, {
			pin: pin,
			state: 'WAITING',
			users: [],
			createdAt: serverTimestamp(),
		});
	};
	useEffect(() => {
		getDoc(gameDoc).then(async (snapshot) => {
			if (!snapshot.exists()) {
				console.log('it doesnt exist');

				makeGame();
				const q = query(gamesRef, where('pin', '==', pin));

				onSnapshot(q, (snapshot) => {
					let currentUsers = {};
					snapshot.forEach((doc) => {
						currentUsers = doc.data().users; // Access the "users" field directly
					});

					setUsers(currentUsers);
				});
			} else {
				console.log('it exists');

				const q = query(gamesRef, where('pin', '==', pin));

				onSnapshot(q, (snapshot) => {
					let currentUsers = {};
					snapshot.forEach((doc) => {
						currentUsers = doc.data().users; // Access the "users" field directly
					});

					setUsers(currentUsers);
				});
			}
		});
	}, [pin]);

	const startGame = async () => {
		await setDoc(gameDoc, {
			pin: pin,
			state: 'GAMING',
			users: [...users],
			createdAt: serverTimestamp(),
		});
		setCurrentScreen('gaming');
	};

	return (
		<div>
			{currentScreen == 'waiting' && (
				<div>
					<div className='navbar mb-4'>
						<div className='navbar-start'></div>
						<div className='navbar-center flex-col space-y-2'>
							<p className='font-bold'>
								Go to readyup.com/join and enter this pin:
							</p>
							<div className='tooltip tooltip-right' data-tip='Click to copy'>
								<button
									className='btn btn-lg !text-3xl'
									onClick={() => {
										navigator.clipboard.writeText((pin ?? '').toString());
									}}
								>
									{pin}
								</button>
							</div>
						</div>
						<div className='navbar-end'>
							<button className='btn btn-primary' onClick={startGame}>
								Start Game
							</button>
						</div>
					</div>
					<div className='text-center p-4 space-x-2'>
						{users
							? users.map((user: any, key: any) => {
									return (
										<span key={key} className='badge badge-lg'>
											{user}
										</span>
									);
							  })
							: 'Waiting for users...'}
					</div>
				</div>
			)}
			{currentScreen == 'gaming' && (
				<div>
					<p>{game}</p>
				</div>
			)}
		</div>
	);
}
