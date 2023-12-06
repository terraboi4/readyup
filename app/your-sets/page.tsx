'use client';

import { db } from '@/lib/firebase-config';
import { useUser } from '@clerk/nextjs';

import {
	QuerySnapshot,
	collection,
	onSnapshot,
	query,
	where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

export default function YourSets() {
	const { user } = useUser();
	const [sets, setSets] = useState<Array<any>>([]);

	const setsRef = collection(db, 'sets');
	useEffect(() => {
		const q = query(setsRef);
		onSnapshot(q, (snapshot) => {
			let s: Object[] = [];
			snapshot.forEach((doc) => {
				s.push({ ...doc.data(), id: doc.id });
			});

			setSets(s);
		});
	}, []);

	return (
		<div>
			<h1 className='h1'>Your Sets</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
				{sets.map((set) => {
					return (
						<div className='card w-1/2 mx-auto bg-base-100 shadow-xl'>
							<div className='card-body'>
								<h2 className='card-title'>{set.setTitle}</h2>
								<p>{(Object.keys(set).length - 3) / 5} questions</p>
								<div className='card-actions justify-end'>
									<button className='btn'>Edit</button>
									<button className='btn btn-primary'>Play</button>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
