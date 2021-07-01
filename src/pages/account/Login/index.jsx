import React, { useEffect, useState } from 'react';
import useFormValidator from 'use-form-input-validator';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import toast from 'react-hot-toast';

export const Login = () => {
	const { login, state } = useAuth();
	const { error, loading, authenticated } = state;
	const history = useHistory();

	const { values, errors, updateField, isAllFieldsValid } = useFormValidator({
		email: {
			value: '',
			checks: 'required|email',
		},
		password: {
			value: '',
			checks: 'required|min:8',
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(values);
		if (isAllFieldsValid()) {
			login(values);
		}
	};

	// if (loading) {
	// 	return <p>Loading</p>;
	// }
	return (
		<div className='container '>
			<div className='d-flex flex-wrap justify-content-center align-items-center vh-100'>
				<div>
					<h4>Login</h4>
					<p>
						Login with your data that you have entered during your
						registration
					</p>
					<p>
						A new user?{' '}
						<Link to='/register'>create an account instead</Link>
					</p>
				</div>

				<form
					onSubmit={handleSubmit}
					className='d-grid gap-1 col-md-6 mx-auto'
				>
					<div className='mb-0'>
						<label className='form-label h6'>Email address</label>
						<input
							type='email'
							className='form-control'
							name='email'
							onChange={updateField}
							disabled={loading}
						/>
						<p className='text-danger'>
							<small>{errors.email}</small>
						</p>
					</div>
					<div className='mb-2'>
						<label className='form-label h6'>Password</label>
						<input
							type='password'
							className='form-control'
							name='password'
							onChange={updateField}
							disabled={loading}
						/>
						<p className='text-danger'>
							<small>{errors.password}</small>
						</p>
					</div>
					<button
						disabled={errors.email || errors.password || loading}
						type='submit'
						className='btn btn-primary'
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};
