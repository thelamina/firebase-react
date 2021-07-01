import { Home, NotFound, Login, Register, TimeStamp } from '../pages';

export const ROUTES = [
	{
		name: 'Home',
		path: '/',
		component: Home,
		exact: true,
		role: 'customer',
		protected: false,
	},
	{
		name: 'Login',
		path: '/login',
		component: Login,
		exact: true,
		role: 'customer',
		protected: false,
	},
	{
		name: 'Register',
		path: '/register',
		component: Register,
		exact: true,
		role: 'customer',
		protected: false,
	},
	{
		name: 'Timestamps',
		path: '/timestamps',
		component: TimeStamp,
		exact: true,
		role: 'customer',
		protected: true,
	},

	{
		name: 'Not Found',
		component: NotFound,
		exact: true,
		role: '',
		protected: false,
	},
];
