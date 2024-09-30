"use client"
import React, { useContext, useEffect } from 'react'
import { checkAuthHandler } from '@/Utils/constants';
import { AuthContext } from '../Context/AuthContext';
import { useRouter } from 'next/navigation';
import { Main } from '../components/Profile/Main';
import Header from '../components/Header/Main';

const page = () => {
	const router = useRouter();
	const { AuthData } = useContext(AuthContext);
	useEffect(() => {
		checkAuthHandler(AuthData, router);
	}, [])
	return (
		<div className='p-3'> 
			<Main/>
			<Header/>
		</div>
	)
}

export default page