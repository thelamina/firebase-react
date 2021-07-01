import { ACTIONTYPES } from '../../../constants';

const InitialState = {
	error: null,
	loading: false,
	authenticated: false,
	authUser: null,
};

const authReducer = (state = InitialState, action) => {
	switch (action.type) {
		case ACTIONTYPES.AUTH_START: {
			return {
				...state,
				loading: true,
			};
		}
		case ACTIONTYPES.AUTH_FAIL: {
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		}

		case ACTIONTYPES.SIGNUP_USER_SUCCESS: {
			return {
				...state,
				loading: false,
				authenticated: true,
				authUser: action.payload,
			};
		}

		case ACTIONTYPES.SIGNIN_USER_SUCCESS: {
			return {
				...state,
				loading: false,
				authenticated: true,
				authUser: action.payload,
			};
		}

		case ACTIONTYPES.CURRENT_USER_SUCCESS: {
			return {
				...state,
				loading: false,
				authenticated: true,
				authUser: action.payload,
			};
		}

		case ACTIONTYPES.SIGNOUT_USER_SUCCESS: {
			return {
				...state,
				loading: false,
				authenticated: false,
				authUser: null,
			};
		}

		default:
			return state;
	}
};

export default authReducer;
