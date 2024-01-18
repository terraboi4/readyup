'use client';

import { db } from '@/lib/firebase-config';
import { useUser } from '@clerk/nextjs';

import { collection, onSnapshot, query, where } from 'firebase/firestore';

import React, { useEffect, useState } from 'react';

export default function YourSets() {
	const { user } = useUser();
	const [sets, setSets] = useState<Array<any>>([]);

	const setsRef = collection(db, 'sets');

	const removeSet = async (id: String) => {
		const q = query(setsRef, where('id', '==', id));
		onSnapshot(q, (snapshot) => {
			snapshot.forEach((doc) => {
				console.log(doc);
			});
		});
	};

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
							<div className='card-actions justify-end m-2'>
								<button
									onClick={() => {
										removeSet(set.id);
									}}
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth={1.5}
										stroke='#FF5861'
										className='w-6 h-6'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
										/>
									</svg>
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
