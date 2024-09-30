"use client"
import Header from '@/app/components/Header/Main'
import PostDetail from '@/app/components/Posts/PostDetail'
import { AuthContext } from '@/app/Context/AuthContext'
import { checkAuthHandler } from '@/Utils/constants'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect } from 'react'

const page = () => {
  const router = useRouter();
	const { AuthData } = useContext(AuthContext);
	useEffect(() => {
		checkAuthHandler(AuthData, router);
	}, [])
  return (
    <div className='py-5'>
        <Header/>
        <PostDetail/>
    </div>
  )
}

export default page