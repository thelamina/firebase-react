import { ACTIONTYPES } from '../../../constants';

export const userSignUp = (user) => {
	return {
		type: ACTIONTYPES.SIGNUP_USER,
		payload: user,
	};
};

export const userSignIn = (user) => {
	return {
		type: ACTIONTYPES.SIGNIN_USER,
		payload: user,
	};
};

export const userCurrent = (user) => {
	console.log('user', user);
	return {
		type: ACTIONTYPES.CURRENT_USER,
		payload: user,
	};
};

export const userSignOut = () => {
	return {
		type: ACTIONTYPES.SIGNOUT_USER,
	};
};

export const userSignUpSuccess = (authUser) => {
	return {
		type: ACTIONTYPES.SIGNUP_USER_SUCCESS,
		payload: authUser,
	};
};

export const userSignInSuccess = (authUser) => {
	return {
		type: ACTIONTYPES.SIGNIN_USER_SUCCESS,
		payload: authUser,
	};
};

export const userCurrentSuccess = (authUser) => {
	console.log('auth', authUser);
	return {
		type: ACTIONTYPES.CURRENT_USER_SUCCESS,
		payload: authUser,
	};
};

export const userSignOutSuccess = () => {
	return {
		type: ACTIONTYPES.SIGNOUT_USER_SUCCESS,
	};
};

export const userAuthStart = () => {
	return {
		type: ACTIONTYPES.AUTH_START,
	};
};

export const userAuthfail = (error) => {
	return {
		type: ACTIONTYPES.AUTH_FAIL,
		payload: error,
	};
};
