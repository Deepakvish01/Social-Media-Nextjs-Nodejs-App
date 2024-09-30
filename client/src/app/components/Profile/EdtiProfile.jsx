import { AuthContext } from '@/app/Context/AuthContext';
import { ProfileContext } from '@/app/Context/ProfileContext'
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { Form } from './Form';

export const EdtiProfile = () => {
  const { getUserById, updateUserById, removeDP } = useContext(ProfileContext);
  const { AuthData } = useContext(AuthContext);
  const router = useRouter();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    age: "",
    email: "",
    phone: "",
    gender: "",
    profilePicture: ""
  })

  useEffect(() => {
    fetchUserById()
  }, [])

  async function fetchUserById() {
    try {
      const user = await getUserById(AuthData)
      setUser(user)
    } catch (error) {
      console.log(error);
    }
  }

  async function updateHandler() {
    try {
      const status = await updateUserById(AuthData, user);
      if(status == 200){
        fetchUserById()
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function dpHandler() {
    try {
      const status = await removeDP(AuthData);
      if (status == 200) {
        fetchUserById()
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Form user={user} setUser={setUser} updateHandler={updateHandler} router={router} dpHandler={dpHandler} />
    </div>
  )
}

export const imageURL = "https://i.pinimg.com/originals/d1/48/e0/d148e0e1e7e350ff7b95ee5f8888df9e.jpg"
