import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import AppRouter from './routes';
import { Navbar, Footer, Loader } from './components';
import { auth } from './config/firebaseConfig';
import { useAuth } from './hooks';

const App = () => {
	const { state, currentUser } = useAuth();
	const history = useHistory();
	useEffect(() => {
		if (localStorage.getItem('user_id')) {
			auth.onAuthStateChanged((authUser) => {
				console.log(authUser);
				if (authUser) {
					currentUser(authUser);
				} else {
					currentUser(null);
				}
			});
		} else {
			history.push('/login');
		}
	}, []);

	if (state.loading) {
		return <Loader />;
	}
	return (
		<>
			<Navbar />
			<AppRouter />
			<Toaster
				position='top-center'
				toastOptions={{
					className: '',
					style: {
						margin: '30px',
						minWidth: '300px',
						display: 'inline-flex',
						fontSize: '14px',
						zIndex: 999999,
					},
					duration: 5000,
				}}
			/>
			<Footer />
		</>
	);
};

export default App;
