'use client';

import { useForm } from 'react-hook-form';

type Data = {
	pin: Number;
	nickname: String;
};

export default function JoinGame() {
	const { register, handleSubmit } = useForm<Data>();

	const submit = async (data: Data) => {
		console.log(data);
	};

	return (
		<div>
			<h1 className='h1'>Join Game</h1>
			<form
				className='text-center space-y-4 flex flex-col w-1/2 lg:w-1/ mx-auto'
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
					ReadyUp!
				</button>
			</form>
		</div>
	);
}
