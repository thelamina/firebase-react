import React from 'react';
import toast from 'react-hot-toast';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../../hooks';

export const Navbar = () => {
	const { logout, state } = useAuth();
	const { error, loading, authenticated } = state;

	const handleLogout = (e) => {
		e.preventDefault();
		logout();
	};

	React.useEffect(() => {
		if (!loading && error) {
			toast.error(error.message);
		}
	}, [error]);

	console.log(state);

	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light '>
			<div className='navbar navbar-light bg-light container'>
				<Link to='/' className='navbar-brand'>
					Firebase-React
				</Link>

				<ul className='navbar-nav ml-auto'>
					<li className='nav-item '>
						<NavLink exact to='/' className='nav-link'>
							Home
						</NavLink>
					</li>
					{state.authenticated ? (
						<>
							<li className='nav-item'>
								<NavLink
									exact
									to='/timestamps'
									className='nav-link'
								>
									Timestamps
								</NavLink>
							</li>
							<li className='nav-item'>
								<Link
									onClick={handleLogout}
									className=' nav-link'
								>
									Logout
								</Link>
							</li>
						</>
					) : (
						<>
							<li className='nav-item'>
								<Link to='/login' className=' nav-link'>
									Login
								</Link>
							</li>
							<li className='nav-item'>
								<Link to='/register' className=' nav-link'>
									Register
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
};
