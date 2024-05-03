import { db } from '@/lib/firebase-config';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

export default function Questions({ setId }: { setId: String }) {
	const sDoc = doc(db, 'sets', setId.toString());
	const [questionsArray, setQuestionsArray] = useState<any>(null);
	const [questionNumber, setQuestionNumber] = useState<number>(0);
	const [hydrated, setHydrated] = useState<boolean>(false);
	const [shuffle, setShuffle] = useState<any>([3, 2, 1, 4]);
	const colors = ['error', 'warning', 'success', 'info'];
	useEffect(() => {
		const unsubscribe = onSnapshot(sDoc, (doc) => {
			const data = doc.data();

			setHydrated(true);

			if (data && data.questions) {
				setQuestionsArray(data.questions.split(', '));
			}
		});

		return () => unsubscribe(); // Cleanup function to unsubscribe on unmount
	}, []);

	if (!hydrated) {
		return (
			<div>
				<span className='loading loading-spinner'></span>Loading...
			</div>
		);
	}

	const answerClick = async (key: number) => {
		setQuestionNumber(Math.floor(Math.random() * (questionsArray.length / 5)));
		setShuffle(shuffleForward([1, 2, 3, 4]));

		if (key == 1) {
			await setDoc(sDoc, {});
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
			<div className='h-1/2 w-full'>
				<h1 className='text-center p-4 !text-4xl'>
					{questionsArray[questionNumber * 5]}
				</h1>
			</div>
			<div className='grid grid-cols-2 flex-grow'>
				{colors.map((color, key) => {
					console.log(shuffle[key] + questionNumber * 4 + questionNumber);

					return (
						<button
							key={key}
							className={`text-center text-xl rounded-md bg-${color} m-[0.0625rem]`}
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
