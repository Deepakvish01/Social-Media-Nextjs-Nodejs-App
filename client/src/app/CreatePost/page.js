"use client"
import React, { useContext, useEffect } from 'react'
import { CreatePost } from '../components/Posts/CreatePost'
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
        <div> 
            <Header/>
            <CreatePost /> 
        </div>
    )
}

export default page