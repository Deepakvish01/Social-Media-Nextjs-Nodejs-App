import { AuthContext } from '@/app/Context/AuthContext';
import { ProfileContext } from '@/app/Context/ProfileContext'
import React, { useContext, useEffect, useState } from 'react'
import { imageURL } from './EdtiProfile';

export const Friends = () => {
  const { getAllFriends, Profile, deleteFriend, dispatch } = useContext(ProfileContext);
  const { AuthData } = useContext(AuthContext);
  const [searchFriend, setSearchFriend] = useState("");

  const searchFriends = Profile.friends?.filter((ele) => {
    if (searchFriend == "") {
      return ele
    } else if (ele?.firstname.toLowerCase().includes(searchFriend.toLowerCase()) ||
      ele?.lastname.toLowerCase().includes(searchFriend.toLowerCase())) {
      return ele
    }
  })

  useEffect(() => {
    searchFriends
    fetchAllFriends()
  }, [])

  async function fetchAllFriends() {
    try {
      const data = await getAllFriends(AuthData);
      dispatch({
        type: "GET_ALL_FRIENDS",
        payload: data
      })
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteFriendHandler(id) {
    try {
      const status = await deleteFriend(AuthData, id);
      if (status == 200) {
        fetchAllFriends()
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='container card my-5 p-5 mb-lg-5 fs-1 text-center fw-bold'>
      <i> 🤝 All Friends  🤝
        <hr />
        {
          Profile?.friends?.length == 0
            ?
            <> <p className='card shadow-lg my-4 p-4 fs-2'> No Friends </p> </>
            :
            <div>
              <div className='mt-5'>
                <input type="text" className='form-control' placeholder='Search Friends'
                  style={{ width: "250px", border: "1px grey solid" }} onChange={(e) => [
                    setSearchFriend(e.target.value)
                  ]} />
              </div>
              {
                searchFriends?.map((ele) => {
                  return (
                    <>
                      <div className='container card shadow-lg my-4 p-4'>
                        <div className='d-flex justify-content-between align-items-center'>
                          <img src={
                            ele.profilePicture.length == 0 ? imageURL : ele.profilePicture
                          } style={{ borderRadius: "50%", height: "150px", width: "150px" }} />
                          <p className='my-1 fs-2 fw-bold' style={{ fontFamily: 'cursive' }}> {ele.firstname} {ele.lastname} </p>

                          <div>
                            <button className='btn btn-danger btn-lg' onClick={() => {
                              deleteFriendHandler(ele._id)
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
                              Delete Friend </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })
              }
            </div>
        }
      </i>
    </div>
  )
}
