'use client';

import { useUser } from '@clerk/nextjs';

export default function Home() {
	const { user } = useUser();

	return (
		<div>
			<h1 className='h1'>Hey, {user?.firstName + '!' ?? 'ready to learn?'}</h1>
			<div>
				<h2 className='text-2xl font-semibold mb-3'>Games</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
					<div className='card shadow-xl image-full'>
						<figure>
							<img src='https://placehold.co/600x400' alt='Shoes' />
						</figure>
						<div className='card-body'>
							<h2 className='card-title'>ReadyUp Racing</h2>
							<p>Race against your friends and try to be number one!</p>
							<div className='card-actions justify-end'>
								<button className='btn btn-primary'>Play</button>
							</div>
						</div>
					</div>
					<div className='card shadow-xl image-full'>
						<figure>
							<img src='https://placehold.co/600x400' alt='Shoes' />
						</figure>
						<div className='card-body'>
							<h2 className='card-title'>Hot Potato</h2>
							<p>
								Answer the question correctly before time runs out or you are
								eliminated!
							</p>
							<div className='card-actions justify-end'>
								<button className='btn btn-primary'>Play</button>
							</div>
						</div>
					</div>
					<div className='card shadow-xl image-full'>
						<figure>
							<img src='https://placehold.co/600x400' alt='Shoes' />
						</figure>
						<div className='card-body'>
							<h2 className='card-title'>BuzzIn Bracket</h2>
							<p>Compete against your friends in a bracket-style tournament!</p>
							<div className='card-actions justify-end'>
								<button className='btn btn-primary'>Play</button>
							</div>
						</div>
					</div>
					<div className='card shadow-xl image-full'>
						<figure>
							<img src='https://placehold.co/600x400' alt='Shoes' />
						</figure>
						<div className='card-body'>
							<h2 className='card-title'>Scavenger Hunt</h2>
							<p>
								Answer questions correctly to unlock helpful clues as to where a
								treasure chest might be hidden around the map!
							</p>
							<div className='card-actions justify-end'>
								<button className='btn btn-primary'>Play</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
