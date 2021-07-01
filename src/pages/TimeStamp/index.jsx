import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks';
import { getData } from '../../services';
import { Loader } from '../../components';
import toast from 'react-hot-toast';

export const TimeStamp = () => {
	React.useEffect(() => {
		document.title = 'Time stamp';
	}, []);

	const {
		state: { loading: authLoading, authUser },
	} = useAuth();

	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(undefined);

	const getLogs = async (e) => {
		try {
			setLoading(true);
			const res = await getData();
			setLoading(false);
			setData(
				res.map((d) => ({
					email: d.email,
					timeStamp: new Date(d.timeStamp.toDate()).toUTCString(),
				}))
			);
			console.log(res);
			return res;
		} catch (error) {
			setLoading(false);
			toast.error(error.message);
		}
	};

	useEffect(() => {
		getLogs();
	}, []);

	if (loading) {
		return <Loader />;
	}
	return (
		<div className='container mt-4'>
			<h5 className='pb-4'>LOGS</h5>
			<ul class='list-group list-group-flush'>
				{data?.map((d) => {
					return (
						<li class='list-group-item'>
							<h6>{d?.email}</h6>
							<span>{d?.timeStamp}</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
