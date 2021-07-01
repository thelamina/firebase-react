import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFormValidator from 'use-form-input-validator';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import toast from 'react-hot-toast';

export const Register = () => {
	const {
		register,
		state: { error, loading, authenticated },
	} = useAuth();
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

	useEffect(() => {
		if (!loading && error) {
			toast.error(error.message);
		}
	}, [error]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isAllFieldsValid()) {
			register({ ...values });
		}
	};

	// if (loading) {
	// 	return <p>Loading</p>;
	// }
	return (
		<div className='container d-flex flex-wrap align-items-center vh-100'>
			<div>
				<h4>Create an account</h4>
				<p>
					Login with your data that you have entered during your
					registration
				</p>
				<p>
					Already a user? <Link to='/login'>Login instead</Link>
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
					Create Account
				</button>
			</form>
		</div>
	);
};
