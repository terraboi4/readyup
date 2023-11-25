'use client';

import React, { createElement, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function NewSet() {
	const {
		register,
		handleSubmit,
		formState: { isValid },
	} = useForm();
	const [questions, setQuestions] = useState(1);

	const onSubmit = (data: Object) => {
		console.log(data);
	};

	const addQuestion = () => {
		
	};

	
	return (
		<div className='text-center'>
			<h1 className='h1'>New Set</h1>
			<input
				{...register('setTitle', { required: true })}
				type='text'
				className='input input-bordered'
				placeholder='Set Title'
			/>
			<div className='card bg-base-200 my-2'>
				<div className='card-body'>
					<input
						{...register('questionTitle', { required: true })}
						type='text'
						className='input input-bordered'
						placeholder='Question Title'
					/>
					<div className='grid grid-cols-2 gap-2 pt-2'>
						<input
							{...register('answer1', { required: true })}
							type='text'
							className='input input-bordered input-error'
							placeholder='Answer 1'
						/>

						<input
							{...register('answer2', { required: true })}
							type='text'
							className='input input-bordered input-warning'
							placeholder='Answer 2'
						/>

						<input
							{...register('answer3', { required: true })}
							type='text'
							className='input input-bordered input-success'
							placeholder='Answer 3'
						/>

						<input
							{...register('answer4', { required: true })}
							type='text'
							className='input input-bordered input-info'
							placeholder='Answer 4'
						/>
					</div>
					<div className='text-center p-2'>
						<input
							{...register('correctAnswer', { required: true })}
							type='text'
							className='input input-bordered'
							placeholder='Correct Answer (1, 2, 3, 4)'
						/>
					</div>
					<div className='card-actions justify-end'>
						<button className='btn btn-primary' onClick={addQuestion}>
							Add Question
						</button>
					</div>
				</div>
			</div>
			<button
				type='submit'
				className='btn'
				onClick={handleSubmit(onSubmit)}
				disabled={!isValid}
			>
				Finish Quiz
			</button>
		</div>
	);
}

function Card ({register})
	  <div className='card bg-base-200 my-2'>
				<div className='card-body'>
					<input
						{...register('questionTitle', { required: true })}
						type='text'
						className='input input-bordered'
						placeholder='Question Title'
					/>
					<div className='grid grid-cols-2 gap-2 pt-2'>
						<input
							{...register('answer1', { required: true })}
							type='text'
							className='input input-bordered input-error'
							placeholder='Answer 1'
						/>

						<input
							{...register('answer2', { required: true })}
							type='text'
							className='input input-bordered input-warning'
							placeholder='Answer 2'
						/>

						<input
							{...register('answer3', { required: true })}
							type='text'
							className='input input-bordered input-success'
							placeholder='Answer 3'
						/>

						<input
							{...register('answer4', { required: true })}
							type='text'
							className='input input-bordered input-info'
							placeholder='Answer 4'
						/>
					</div>
					<div className='text-center p-2'>
						<input
							{...register('correctAnswer', { required: true })}
							type='text'
							className='input input-bordered'
							placeholder='Correct Answer (1, 2, 3, 4)'
						/>
					</div>
					<div className='card-actions justify-end'>
						<button className='btn btn-primary' onClick={addQuestion}>
							Add Question
						</button>
					</div>
				</div>
			</div>
}