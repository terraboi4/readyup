import { db } from '@/lib/firebase-config';
import {
	arrayRemove,
	arrayUnion,
	doc,
	getDoc,
	updateDoc,
} from 'firebase/firestore';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Questions({ setId }: { setId: String }) {
	const setDoc = doc(db, 'sets', setId.toString());
	const gameDoc = doc(db, 'games', usePathname().slice(-6));
	const username = useSearchParams().get('username');
	const [questionsArray, setQuestionsArray] = useState<any>(null);
	const [questionNumber, setQuestionNumber] = useState<number>(0);
	const [hydrated, setHydrated] = useState<boolean>(false);
	const [shuffle, setShuffle] = useState<any>([3, 2, 1, 4]);
	const colors = ['error', 'warning', 'success', 'info'];
	useEffect(() => {
		const a = async () => {
			const doc = await getDoc(setDoc);
			const data = doc.data();

			setHydrated(true);

			if (data && data.questions) {
				setQuestionsArray(data.questions.split(' | '));
			}
		};

		a();
	}, []);

	if (!hydrated) return null;

	const getDocData = async () => {
		const doc = await getDoc(gameDoc);
		if (doc.exists()) {
			return doc.data();
		} else {
			console.error('Document not found!');
			return null;
		}
	};

	const updatePoints = (data: any, nickname: any) => {
		if (!data || !data.users) return;
		const users = data.users;
		for (let i = 0; i < users.length; i++) {
			if (users[i].nickname === nickname) {
				users[i].points += 1;
				break;
			}
		}
		return data;
	};

	const answerClick = async (key: number) => {
		setQuestionNumber(Math.floor(Math.random() * (questionsArray.length / 5)));
		setShuffle(shuffleForward([1, 2, 3, 4]));

		if (key == 1) {
			try {
				const data = await getDocData();
				if (data) {
					const updatedData = updatePoints(data, username); // Update nickname if needed

					await updateDoc(gameDoc, updatedData);
					console.log('Document updated successfully!');
				}
			} catch (error) {
				console.error('Error updating document:', error);
			}
		} else {
			document.getElementById('my_modal_1').showModal();
			setTimeout(() => {
				document.getElementById('my_modal_1').close();
			}, 3000);
		}
	};

	const shuffleForward = (data: Array<number>) => {
		const shuffledData = data.slice(); // Create a copy to avoid modifying the original array
		for (let i = 0; i < shuffledData.length; i++) {
			// Generate a random number of steps to move forward (between 0 and length-1)
			const steps = Math.floor(Math.random() * shuffledData.length);
			// Move the element forward by the random number of steps
			shuffledData.splice(
				(i + steps) % shuffledData.length,
				0,
				shuffledData.splice(i, 1)[0]
			);
		}
		return shuffledData;
	};

	return (
		<div className='h-screen flex flex-col'>
			<dialog id='my_modal_1' className='modal'>
				<div className='modal-box'>
					<h3 className='font-bold text-lg'>Incorrect</h3>
					<p className='py-4'>Please wait 3 seconds before moving on</p>
				</div>
			</dialog>
			<div className='h-1/2 w-full'>
				<h1 className='text-center p-4 !text-4xl'>
					{questionsArray[questionNumber * 5]}
				</h1>
			</div>
			<div className='grid grid-cols-2 flex-grow'>
				{colors.map((color, key) => {
					let colorClass;
					switch (color) {
						case 'info':
							colorClass = 'bg-info';
							break;
						case 'warning':
							colorClass = 'bg-warning';
							break;
						case 'success':
							colorClass = 'bg-success';
							break;
						case 'error':
							colorClass = 'bg-error';
							break;
					}
					return (
						<button
							key={key}
							className={`text-center text-xl rounded-md ${colorClass} m-[0.0625rem]`}
							onClick={() => {
								answerClick(shuffle[key]);
							}}
						>
							{
								questionsArray[
									shuffle[key] + questionNumber * 4 + questionNumber
								]
							}
						</button>
					);
				})}
			</div>
		</div>
	);
}
