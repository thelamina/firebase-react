import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useFormValidator from 'use-form-input-validator';
import { useAuth } from '../../hooks';
import { sendData } from '../../services';

export const Home = () => {
	const {
		state: { loading: authLoading, authUser },
	} = useAuth();
	const [loading, setLoading] = useState(false);

	const { values, errors, updateField, isAllFieldsValid } = useFormValidator({
		title: {
			value: '',
			checks: 'required|min:2',
		},
		message: {
			value: '',
			checks: 'required|min:2',
		},
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isAllFieldsValid()) {
			try {
				setLoading(true);
				const res = await sendData({
					...values,
					email: authUser?.email,
				});
				toast.success('Message delivered!');
				setLoading(false);
				return res;
			} catch (error) {
				setLoading(false);
				toast.error(error.message);
			}
		}
	};

	return (
		<div className='container pt-4'>
			<h4>Welcome, {authUser?.email}</h4>

			<div className='py-4'>
				<form
					onSubmit={handleSubmit}
					className='d-grid gap-1 col-md-6 mx-auto'
				>
					<div className='mb-0'>
						<label className='form-label h6'>Title</label>
						<input
							type='text'
							className='form-control'
							name='title'
							onChange={updateField}
							disabled={loading}
						/>
						<p className='text-danger'>
							<small>{errors.title}</small>
						</p>
					</div>
					<div className='mb-2'>
						<label className='form-label h6'>Message</label>
						<textarea
							rows={4}
							className='form-control'
							name='message'
							onChange={updateField}
							disabled={loading}
						/>
						<p className='text-danger'>
							<small>{errors.message}</small>
						</p>
					</div>
					<button
						disabled={errors.email || errors.password || loading}
						type='submit'
						className='btn btn-primary'
					>
						Send
					</button>
				</form>
			</div>
		</div>
	);
};
