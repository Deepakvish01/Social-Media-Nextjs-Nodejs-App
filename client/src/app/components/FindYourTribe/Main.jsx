import React, { useContext, useEffect } from 'react'
import { ReceivedRequest } from './ReceivedRequest'
import { UserList } from './UserList'
import { AuthContext } from '@/app/Context/AuthContext';
import { ProfileContext } from '@/app/Context/ProfileContext';
import { Friends } from '../Profile/Friends';

export const Main = () => {
  const { AuthData } = useContext(AuthContext);
  const { getAllReceivedRequest, dispatch } = useContext(ProfileContext);

  useEffect(() => {
    fetchHandlers();
  }, [])

  async function fetchHandlers() {
    try {
      const data = await getAllReceivedRequest(AuthData);
      dispatch({
        type: "GET_RECEIVED_REQUESTS",
        payload: data
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='container p-4'>
      <ReceivedRequest fetchHandlers={fetchHandlers} />
      <UserList />
    </div>
  )
}
