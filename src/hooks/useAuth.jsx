import { useSelector, useDispatch } from 'react-redux';
import {
	userSignIn,
	userSignUp,
	userSignOut,
	userCurrent,
} from '../store/actions';

export const useAuth = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.auth);
	const login = (values) => {
		console.log('asd', values);
		dispatch(userSignIn(values));
	};

	const register = (values) => {
		dispatch(userSignUp(values));
	};

	const currentUser = (user) => {
		dispatch(userCurrent(user));
	};

	const logout = () => {
		dispatch(userSignOut());
	};

	return {
		state,
		login,
		register,
		logout,
		currentUser,
	};
};
