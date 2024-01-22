'use client';

import { useForm } from 'react-hook-form';

type Data = {
	pin: Number;
	nickname: String;
};

import {
	QuerySnapshot,
	collection,
	onSnapshot,
	query,
	where,
	setDoc,
	doc,
} from 'firebase/firestore';
import { useState } from 'react';
import { db } from '@/lib/firebase-config';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function JoinGame() {
	const { register, handleSubmit } = useForm<Data>();
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const submit = async (data: Data) => {
		setLoading(true);
		const gamesRef = collection(db, 'games');
		const q = query(gamesRef, where('state', '==', 'WAITING'));

		const unsubscribe = onSnapshot(q, (snapshot) => {
			let s: Object[] = [];
			snapshot.forEach((doc) => {
				s.push({ ...doc.data(), id: doc.id });
			});

			s.forEach(async (game: any) => {
				if (game.id == data.pin) {
					const docRef = doc(gamesRef, game.id);

					setDoc(docRef, {
						state: 'WAITING',
						users: [...game.users, data.nickname],
					});

					setLoading(false);

					router.push(`game/${game.id}?username=${data.nickname}`);
					unsubscribe();
				} else {
					toast.error('No game found with this PIN.');

					setLoading(false);
				}
			});
		});
	};

	return (
		<div>
			<h1 className='h1'>Join Game</h1>
			<form
				className='text-center space-y-4 flex flex-col w-1/2 lg:w-1/3 mx-auto'
				onSubmit={handleSubmit(submit)}
			>
				<p className='text-lg'>Enter your PIN Code and nickname</p>
				<input
					type='number'
					className='input input-primary'
					placeholder='PIN Code'
					{...register('pin', { required: true })}
				/>
				<input
					type='text'
					className='input input-primary'
					placeholder='Nickname'
					{...register('nickname', { required: true })}
				/>
				<button className='btn btn-primary' type='submit'>
					{loading && <span className='loading loading-spinner'></span>}{' '}
					ReadyUp!
				</button>
			</form>
		</div>
	);
}
