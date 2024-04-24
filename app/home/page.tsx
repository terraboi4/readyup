'use client';

import { useUser } from '@clerk/nextjs';

export default function Home() {
	const { user } = useUser();

	return (
		<div>
			<h1>Hey, {user?.firstName ?? 'ready to learn?'}</h1>
			<div>
				<h2 className='text-2xl font-semibold mb-3'>Games</h2>
			</div>
		</div>
	);
}
