import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks';
// import { setLocationHistory } from 'utils';
// import { Loading } from 'components';

export const ProtectedRoute = ({ roles, ...props }) => {
	const history = useHistory();
	const { state } = useAuth();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setLoading(true);
		if (state.authenticated === false) {
			console.log('here', history.location);

			history.push('/login');
		}
		setLoading(false);
	}, [history, roles, state.authenticated]);

	return loading ? <p>Loading</p>  : <Route {...props} />;
};
