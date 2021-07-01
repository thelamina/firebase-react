import {
	all,
	call,
	fork,
	put,
	takeEvery,
	takeLatest,
} from 'redux-saga/effects';
import toast from 'react-hot-toast';
import { ACTIONTYPES } from '../../constants';
import {
	userSignInSuccess,
	userAuthfail,
	userCurrentSuccess,
	userSignOutSuccess,
	userSignUpSuccess,
	userAuthStart,
} from '../actions';
import { loginUser, logoutUser, registerUser } from '../../services';
import { useHistory } from 'react-router-dom';

function* register({ payload }) {
	const { email, password } = payload;
	try {
		yield put(userAuthStart());
		const signUpUser = yield call(registerUser, email, password);
		localStorage.setItem('user_id', signUpUser.user.uid);
		yield put(userSignUpSuccess(signUpUser.user.uid));
	} catch (error) {
		yield put(userAuthfail(error));
	}
}

function* login({ payload }) {
	const { email, password } = payload;
	try {
		yield put(userAuthStart());
		const signInUser = yield call(loginUser, email, password);
		localStorage.setItem('user_id', signInUser.user.uid);
		yield put(userSignInSuccess(signInUser.user));
	} catch (error) {
		console.log(error);
		toast.error(error.message);
		yield put(userAuthfail(error));
	}
}

function* getCurrentUser({ payload }) {
	try {
		yield put(userAuthStart());
		yield put(userCurrentSuccess(payload));
	} catch (error) {
		yield put(userAuthfail(error));
	}
}

function* logout() {
	try {
		yield put(userAuthStart());
		const signOutUser = yield call(logoutUser);
		if (signOutUser === undefined) {
			localStorage.removeItem('user_id');
			yield put(userSignOutSuccess(signOutUser));
		} else {
			throw new Error(signOutUser.user.uid);
		}
	} catch (error) {
		yield put(userAuthfail(error));
	}
}

export function* createUserAccount() {
	yield takeEvery(ACTIONTYPES.SIGNUP_USER, register);
}

export function* signInUser() {
	yield takeEvery(ACTIONTYPES.SIGNIN_USER, login);
}

export function* signOutUser() {
	yield takeEvery(ACTIONTYPES.SIGNOUT_USER, logout);
}

export function* activeUser() {
	yield takeEvery(ACTIONTYPES.CURRENT_USER, getCurrentUser);
}

// const root = [
// 	takeLatest(ACTIONTYPES.SIGNUP_USER, register),
// 	takeLatest(ACTIONTYPES.SIGNIN_USER, login),
// 	takeLatest(ACTIONTYPES.SIGNOUT_USER, logout),
// 	takeLatest(ACTIONTYPES.CURRENT_USER, getCurrentUser),
// ];
// export default root;

export default function* rootSaga() {
	yield all([
		fork(signInUser),
		fork(createUserAccount),
		fork(signOutUser),
		fork(activeUser),
	]);
}
