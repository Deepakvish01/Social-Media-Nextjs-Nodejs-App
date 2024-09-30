"use client"
import React, { useContext, useEffect } from 'react'
import Main from '../components/Posts/Main'
import Header from '../components/Header/Main'
import { checkAuthHandler } from '@/Utils/constants'
import { AuthContext } from '../Context/AuthContext'
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter();
    const { AuthData } = useContext(AuthContext);
    useEffect(() => {
        checkAuthHandler(AuthData, router);
    }, [])
    return (
        <div>
            <Header />
            <Main />
        </div>
    )
}

export default page