import React from 'react';

export default function Questions({ setId }: { setId: String }) {
	console.log(setId);

	return (
		<div className='h-screen flex flex-col'>
			<div className='border h-1/2 w-full'>
				<h1 className='text-center p-4 !text-4xl'>
					What is the color of the sky?
				</h1>
			</div>
			<div className='grid grid-cols-2 flex-grow'>
				<button className='border text-center'>Blue</button>

				<button className='border text-center'>Red</button>

				<button className='border text-center'>Yellow</button>

				<button className='border text-center'>Green</button>
			</div>
		</div>
	);
}
