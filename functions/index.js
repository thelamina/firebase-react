const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// exports.helloWorld = functions.https.onRequest((request, response) => {
// 	functions.logger.info('Hello logs!', { structuredData: true });
// 	response.send('Hello from Firebase-react!');
// });

const createUser = async (user) => {
	try {
		const res = await admin
			.firestore()
			.collection('users')
			.doc(user.uid)
			.set(user);
		console.log('User Created result:', res);
		return res;
	} catch (error) {
		console.log(error);
	}
};

const addDataToLog = async (data) => {
	try {
		const res = await admin.firestore().collection('logs').add(data);
		console.log('data added', res);
	} catch (error) {
		console.log(error);
	}
};

exports.userJoined = functions.auth.user().onCreate((user) => {
	const userDoc = {
		uid: user.uid,
		email: user.email,
		displayName: user.displayName,
		isAdmin: false,
	};
	return createUser(userDoc);
});

exports.dataSent = functions.firestore
	.document('data/{dataId}')
	.onCreate((snap, context) => {
		const doc = snap.data();
		const dataDoc = {
			email: doc.email,
			timeStamp: admin.firestore.FieldValue.serverTimestamp(),
		};
		return addDataToLog(dataDoc);
	});
