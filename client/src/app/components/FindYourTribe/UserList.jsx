import { AuthContext } from '@/app/Context/AuthContext';
import { ProfileContext } from '@/app/Context/ProfileContext'
import React, { useContext, useEffect, useState } from 'react'
import { imageURL } from '../Profile/EdtiProfile';

export const UserList = () => {
  const { AuthData } = useContext(AuthContext);
  const { fetchAllUsers, sendFriendRequest } = useContext(ProfileContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchHandler();
  }, [])

  async function fetchHandler() {
    try {
      const data = await fetchAllUsers(AuthData);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function sendFriendRequestHandler(id) {
    try {
      const status = await sendFriendRequest(id, AuthData);
      if (status == 200)
        fetchHandler();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='card my-2 p-4 mb-lg-5 fs-1 text-center fw-bold'>
      <i> ❤️ Find Your Tribe ❤️
        <hr />
        {
          users?.length == 0
            ?
            <>
              <p className='card shadow-lg my-4 p-4 fs-2'> Nothing to Show </p>
            </>
            :
            <>
              {
                users?.map((ele) => {

                  return (
                    <div className='container card shadow-lg my-4 p-4'>
                      <div className='d-flex justify-content-between align-items-center'>
                        <img src={
                          ele.profilePicture.length == 0 ? imageURL : ele.profilePicture
                        } id='profile' style={{ borderRadius: "50%", height: "150px", width: "150px" }} />
                        <p className='my-1 fs-2 fw-bold' style={{ fontFamily: 'cursive' }}> {ele.firstname} {ele.lastname} </p>

                        <button className='btn btn-primary btn-lg' onClick={() => {
                          sendFriendRequestHandler(ele._id);
                        }}>
                          <svg xmlns="http://www.w3.org/2000/svg"
                            style={{ marginRight: "5px", marginBottom: "5px" }}
                            width="23"
                            height="23"
                            fill="currentColor"
                            class="bi bi-person-add" viewBox="0 0 16 16">
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                            <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                          </svg> Add Friend </button>
                      </div>
                    </div>
                  )
                })
              }
            </>
        }
      </i>
    </div>
  )
}
