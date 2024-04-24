'use client';

import { db } from '@/lib/firebase-config';
import { useUser } from '@clerk/nextjs';

import {
	Timestamp,
	collection,
	deleteDoc,
	onSnapshot,
	query,
	where,
} from 'firebase/firestore';
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react';

export default function YourSets() {
	const { user } = useUser();
	const [sets, setSets] = useState<Array<any>>([]);
	const setsRef = collection(db, 'sets');

	const router = useRouter();

	const sendGame = (game: String, id: String) => {
		const pin = 100000 + Math.floor(Math.random() * 900000);
		const encodedPin = btoa(`${game};${pin};${id}`);
		router.push(`/host?id=${encodedPin}`);
	};

	const removeSet = async (createdAt: Timestamp) => {
		const q = query(setsRef, where('createdAt', '==', createdAt));
		onSnapshot(q, (snapshot) => {
			snapshot.forEach((doc) => {
				deleteDoc(doc.ref);
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
			<h1>Your Sets</h1>
			<div className='card w-4/5 mx-auto bg-base-100 shadow-xl pb-4'>
				{sets.length != 0 ? (
					sets.map((set, key) => {
						return (
							<div className='border rounded-xl mx-4 mt-4' key={key}>
								<div className='card-body'>
									<h2 className='card-title'>{set.setTitle}</h2>
									<p>
										{(Object.keys(set).length - 4) / 5}{' '}
										{(Object.keys(set).length - 4) / 5 == 1
											? 'question'
											: 'questions'}
									</p>
									<div className='card-actions justify-end'>
										<button className='btn'>Edit</button>
										<button
											className='btn btn-primary'
											onClick={() =>
												document.getElementById('my_modal_4')!.showModal()
											}
										>
											Play
										</button>
										<dialog id='my_modal_4' className='modal'>
											<div className='modal-box w-11/12 max-w-5xl'>
												<h1 className='font-bold text-2xl'>Games</h1>
												<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
													<a
														className='hover:scale-105 transition duration-200 ease-in-out cursor-pointer'
														onClick={() => {
															sendGame('racing', set.id);
														}}
													>
														<div className='card shadow-xl image-full'>
															<figure>
																<img
																	src='https://placehold.co/600x400'
																	alt='Shoes'
																/>
															</figure>
															<div className='card-body'>
																<h2 className='card-title'>ReadyUp Racing</h2>
																<p>
																	Race against your friends and try to be number
																	one!
																</p>
																<div className='card-actions justify-end'>
																	<a
																		onClick={() => {
																			sendGame('racing', set.id);
																		}}
																	></a>
																</div>
															</div>
														</div>
													</a>
													<a
														className='hover:scale-105 transition duration-200 ease-in-out cursor-pointer'
														onClick={() => {
															sendGame('hotpotato', set.id);
														}}
													>
														<div className='card shadow-xl image-full'>
															<figure>
																<img
																	src='https://placehold.co/600x400'
																	alt='Shoes'
																/>
															</figure>
															<div className='card-body'>
																<h2 className='card-title'>Hot Potato</h2>
																<p>
																	Answer the question correctly before time runs
																	out or you are eliminated!
																</p>
																<div className='card-actions justify-end'>
																	<a
																		onClick={() => {
																			sendGame('hotpotato', set.id);
																		}}
																	></a>
																</div>
															</div>
														</div>
													</a>
													<a
														className='hover:scale-105 transition duration-200 ease-in-out cursor-pointer'
														onClick={() => {
															sendGame('buzzin', set.id);
														}}
													>
														<div className='card shadow-xl image-full'>
															<figure>
																<img
																	src='https://placehold.co/600x400'
																	alt='Shoes'
																/>
															</figure>
															<div className='card-body'>
																<h2 className='card-title'>BuzzIn Bracket</h2>
																<p>
																	Compete against your friends in a
																	bracket-style tournament!
																</p>
																<div className='card-actions justify-end'>
																	<a
																		onClick={() => {
																			sendGame('buzzin', set.id);
																		}}
																	></a>
																</div>
															</div>
														</div>
													</a>
													<a
														className='hover:scale-105 transition duration-200 ease-in-out cursor-pointer'
														onClick={() => {
															sendGame('scavenger', set.id);
														}}
													>
														<div className='card shadow-xl image-full'>
															<figure>
																<img
																	src='https://placehold.co/600x400'
																	alt='Shoes'
																/>
															</figure>
															<div className='card-body'>
																<h2 className='card-title'>Scavenger Hunt</h2>
																<p>
																	Answer questions correctly to unlock helpful
																	clues as to where a treasure chest might be
																	hidden around the map!
																</p>
																<div className='card-actions justify-end'>
																	<a
																		onClick={() => {
																			sendGame('scavenger', set.id);
																		}}
																	></a>
																</div>
															</div>
														</div>
													</a>
												</div>
												<div className='modal-action'>
													<form method='dialog'>
														<button className='btn'>Close</button>
													</form>
												</div>
											</div>
										</dialog>
									</div>
								</div>
								<div className='card-actions justify-end m-2'>
									<button
										onClick={() => {
											removeSet(set.createdAt);
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
					})
				) : (
					<p className='text-center font-medium'>
						😭 Looks like you don&apos;t have any sets... Make one{' '}
						<a href='/new-set' className='link link-primary'>
							here
						</a>
					</p>
				)}
			</div>
		</div>
	);
}
