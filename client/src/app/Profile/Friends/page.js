"use client"
import React from 'react'
import { Friends } from '@/app/components/Profile/Friends'
import Header from '@/app/components/Header/Main'

const page = () => {
  return (
    <div className='p-5'> 
      <Friends/>
      <Header/>
    </div>
  )
}

export default page