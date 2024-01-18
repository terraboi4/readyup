import { UserButton } from '@clerk/nextjs';

export default function Navbar() {
	return (
		<div className='navbar shadow-md rounded-md'>
			<div className='navbar-start'>
				<div className='dropdown z-30'>
					<label tabIndex={0} className='btn btn-ghost lg:hidden'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M4 6h16M4 12h8m-8 6h16'
							/>
						</svg>
					</label>
					<ul
						tabIndex={0}
						className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
					>
						<li>
							<a href='/home'>Home</a>
						</li>
						<li>
							<a href='/new-set'>New Set</a>
						</li>
						<li>
							<a href='/your-sets'>Your Sets</a>
						</li>

						<li>
							<a>Games</a>
							<ul className='p-2'>
								<li>
									<a>ReadyUp Racing</a>
								</li>
								<li>
									<a>Hot Potato</a>
								</li>
								<li>
									<a>Buzzin Bracket</a>
								</li>
								<li>
									<a>Scavenger Hunt</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
				<a className='btn btn-ghost text-xl'>ReadyUp</a>
			</div>
			<div className='navbar-center hidden lg:flex'>
				<ul className='menu menu-horizontal px-1 z-30'>
					<li>
						<a href='/home'>Home</a>
					</li>
					<li>
						<a href='/new-set'>New Set</a>
					</li>
					<li>
						<a href='/your-sets'>Your Sets</a>
					</li>

					<li tabIndex={0}>
						<details>
							<summary>Games</summary>
							<ul className='p-2'>
								<li>
									<a>ReadyUp Racing</a>
								</li>
								<li>
									<a>Hot Potato</a>
								</li>
								<li>
									<a>BuzzIn Bracket</a>
								</li>
								<li>
									<a>Scavenger Hunt</a>
								</li>
							</ul>
						</details>
					</li>
				</ul>
			</div>
			<div className='navbar-end space-x-2'>
				<a href='/join'>
					<button className='btn btn-primary'>
						<span>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-6 h-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M12 4.5v15m7.5-7.5h-15'
								/>
							</svg>
						</span>
						Join Game
					</button>
				</a>
				<UserButton afterSignOutUrl='/' />
			</div>
		</div>
	);
}
