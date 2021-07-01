import { firestore } from '../config/firebaseConfig';

export const sendData = async (data) => {
	try {
		console.log(data);
		const res = await firestore.collection('data').add(data);
		return res;
	} catch (error) {
		const err = error?.response?.data?.message || error?.message;
		throw new Error(err);
	}
};

export const getData = async () => {
	try {
		const snapshot = await firestore.collection('logs').get();
		return snapshot.docs.map((doc) => doc.data());
	} catch (error) {
		const err = error?.response?.data?.message || error?.message;
		throw new Error(err);
	}
};
