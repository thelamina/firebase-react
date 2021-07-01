import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import reducers from './reducers';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //https://github.com/zalmoxisus/redux-devtools-extension

const Root = ({ children, initialState = {} }) => {
	const store = createStore(
		reducers,
		initialState,
		composeEnhancers(applyMiddleware(...middlewares))
	);
	sagaMiddleware.run(rootSaga);

	return <Provider store={store}>{children}</Provider>;
};

export default Root;
