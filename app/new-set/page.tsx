'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase-config';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function NewSet() {
	const {
		register,
		handleSubmit,
		formState: { isValid },
	} = useForm();
	const { user } = useUser();

	const Card = ({ num }: { num: number }) => {
		return (
			<form autoComplete='off'>
				<div className='card bg-base-200 my-4 lg:w-2/3 mx-auto'>
					<div className='card-body'>
						<input
							{...register(`${num + 1}_questionTitle`, {
								required: true,
							})}
							type='text'
							className='input input-bordered w-1/2 mx-auto'
							placeholder='Question Title'
						/>
						<div className='grid grid-cols-2 gap-2 pt-2 content-center'>
							<input
								{...register(`${num + 1}_answer1`, { required: true })}
								type='text'
								className='input input-bordered input-error'
								placeholder='Answer 1 (Correct)'
							/>
							<input
								{...register(`${num + 1}_answer2`, { required: true })}
								type='text'
								className='input input-bordered input-warning'
								placeholder='Answer 2'
							/>
							<input
								{...register(`${num + 1}_answer3`, { required: true })}
								type='text'
								className='input input-bordered input-success'
								placeholder='Answer 3'
							/>
							<input
								{...register(`${num + 1}_answer4`, { required: true })}
								type='text'
								className='input input-bordered input-info'
								placeholder='Answer 4'
							/>
						</div>
					</div>
					<div className='card-actions justify-end m-2'>
						<button
							onClick={() => {
								removeQuestion(num);
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
			</form>
		);
	};

	const [questions, setQuestions] = useState<React.JSX.Element[]>([]);
	const [loading, setLoading] = useState(false);

	const addQuestion = () => {
		setQuestions([
			...questions,
			<Card key={questions.length} num={questions.length} />,
		]);
	};

	function condenseQuestion(data: any) {
		let questions = '';
		let title = '';

		for (const key in data) {
			if (key.includes('answer') || key.endsWith('questionTitle')) {
				questions += data[key] + ' | ';
			} else if (key.includes('setTitle')) {
				title += data[key];
			}
		}

		questions = questions.slice(0, -2);
		return { questions, title };
	}

	const removeQuestion = (cardIndex: number) => {
		const updatedQuestions = [...questions];
		updatedQuestions.splice(cardIndex, 1);
		setQuestions(updatedQuestions);
	};

	const setsRef = collection(db, 'sets');
	const router = useRouter();
	const onSubmit = async (data: Object) => {
		setLoading(true);

		await addDoc(setsRef, {
			questions: condenseQuestion(data).questions.replace(/["]+/g, ''),
			user: user?.id,
			setTitle: condenseQuestion(data).title,
			createdAt: serverTimestamp(),
		});
		setLoading(false);
		router.push('/your-sets');
	};

	return (
		<div className='text-center'>
			<h1>New Set</h1>
			<input
				{...register('setTitle', { required: true })}
				type='text'
				className='input input-bordered'
				placeholder='Set Title'
			/>
			{questions.map((q, i) => {
				return q;
			})}
			<div className='space-x-2 py-2'>
				<button className='btn btn-primary' onClick={addQuestion}>
					Add Question
				</button>
				<button
					type='submit'
					className='btn'
					onClick={handleSubmit(onSubmit)}
					disabled={!isValid || questions.length == 0}
				>
					{loading && (
						<span className='loading loading-spinner loading-sm'></span>
					)}{' '}
					Finish Quiz
				</button>
			</div>
		</div>
	);
}
