"use client"
import React, { useContext, useEffect } from 'react'
import { Main } from '../components/FindYourTribe/Main'
import Header from '../components/Header/Main'
import { useRouter } from 'next/navigation'
import { AuthContext } from '../Context/AuthContext'
import { checkAuthHandler } from '@/Utils/constants'

const page = () => {
    const router = useRouter();
	const { AuthData } = useContext(AuthContext);
	useEffect(() => {
		checkAuthHandler(AuthData, router);
	}, [])
    return (
        <div className='p-5'>
            <Header/>
            <Main />
        </div>
    )
}

export default page