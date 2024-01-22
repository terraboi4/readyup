'use client';

import { db } from '@/lib/firebase-config';
import { collection, setDoc } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function StartGame() {
	const searchParams = useSearchParams();
	const game = searchParams.get('game');
	const [pin, setPin] = useState<Number>(0);

	const generatePin = async () => {
		var minm = 100000;
		var maxm = 999999;
		setPin(Math.floor(Math.random() * (maxm - minm + 1)) + minm);
	};

	useEffect(() => {
		generatePin;
	}, []);

	return (
		<div>
			<div className='navbar mb-4'>
				<div className='navbar-start'></div>
				<div className='navbar-center bg-primary rounded-md p-2'>
					<p className='text-4xl text-white font-bold'>PIN: {pin}</p>
				</div>
				<div className='navbar-end'>
					<button className='btn btn-primary'>Start Game</button>
				</div>
			</div>
			<div>{/*users*/}</div>
		</div>
	);
}
