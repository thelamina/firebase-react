import { all } from 'redux-saga/effects';
import authSagas from './auth';

export default function* rootSaga(getState) {
	yield all([authSagas()]);
}
