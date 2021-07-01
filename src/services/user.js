import { auth } from '../config/firebaseConfig';

export const registerUser = async (email, password) => {
	try {
		const res = await auth.createUserWithEmailAndPassword(email, password);
		return res;
	} catch (error) {
		const err = error?.response?.data?.message || error?.message;
		throw new Error(err);
	}
};

export const loginUser = async (email, password) => {
	console.log({ email, password });
	try {
		const res = await auth.signInWithEmailAndPassword(email, password);
		return res;
	} catch (error) {
		const err = error?.response?.data?.message || error?.message;
		throw new Error(err);
	}
};

export const logoutUser = async () => {
	try {
		const res = await auth.signOut();
		return res;
	} catch (error) {
		const err = error?.response?.data?.message || error?.message;
		throw new Error(err);
	}
};
