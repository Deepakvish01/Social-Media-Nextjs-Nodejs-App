import { AuthContext } from '@/app/Context/AuthContext';
import { ProfileContext } from '@/app/Context/ProfileContext'
import React, { useContext, useState } from 'react'
import { imageURL } from '../Profile/EdtiProfile';

export const ReceivedRequest = ({ fetchHandlers }) => {
  const { AuthData } = useContext(AuthContext)
  const { Profile, acceptFriendRequest, removeRequest } = useContext(ProfileContext);

  async function acceptFriendRequestHandler(id) {
    try {
      const status = await acceptFriendRequest(id, AuthData);
      if (status == 200)
        fetchHandlers();
    } catch (error) {
      console.log(error);
    }
  }

  async function removeRequestHandler(id) {
    try {
      const status = await removeRequest(AuthData, id)
      if (status == 200)
        fetchHandlers();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='card my-4 p-4 mb-lg-5 fs-1 text-center fw-bold'>
      <i> 🥰 Friend Requests 🥰
        <hr />
        {
          Profile?.receivedRequests?.length == 0
            ?
            <p className='card shadow-lg my-4 p-4 fs-2'> No Requests Received </p>
            :
            <div>
              {
                Profile?.receivedRequests?.map((ele) => {
                  return (
                    <div className='container card shadow-lg my-4 p-4'>
                      <div className='d-flex justify-content-between align-items-center'>
                        <img src={
                          ele.profilePicture.length == 0 ? imageURL : ele.profilePicture
                        } style={{ borderRadius: "50%", height: "150px", width: "150px" }} alt={ele.firstname.charAt(0)} />
                        <p className='my-1 fs-2 fw-bold' style={{ fontFamily: 'cursive' }}> {ele.firstname} {ele.lastname} </p>

                        <div>
                          <button className='btn btn-success btn-lg me-3' onClick={() => {
                            acceptFriendRequestHandler(ele._id);
                          }}>
                            <svg xmlns="http://www.w3.org/2000/svg"
                              style={{ marginRight: "5px", marginBottom: "5px" }}
                              width="23"
                              height="23"
                              fill="currentColor"
                              class="bi bi-person-check" viewBox="0 0 16 16">
                              <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                              <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                            </svg> Accept </button>

                          <button className='btn btn-danger btn-lg' onClick={() => {
                            removeRequestHandler(ele._id)
                          }}>
                            <svg xmlns="http://www.w3.org/2000/svg"
                              style={{ marginRight: "5px", marginBottom: "5px" }}
                              width="23"
                              height="23"
                              fill="currentColor"
                              class="bi bi-person-x" viewBox="0 0 16 16">
                              <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                              <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708" />
                            </svg>
                            Reject ! </button>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
        }
      </i>
    </div>
  )
}
