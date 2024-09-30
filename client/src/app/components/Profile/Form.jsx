import React from 'react'
import { imageURL } from './EdtiProfile'

export const Form = ({ user, setUser, updateHandler, router, dpHandler }) => {
  return (
    <>
      {
        user && <div className="container">
          <div className="p-5 my-3">
            <div id="header">
              <div className="d-flex justify-content-between">
                <img src={
                  user.profilePicture.length == 0 ? imageURL : user.profilePicture
                } height="150px" width="150px" style={{ borderRadius: "50%" }} />
                <div className="my-4">
                  <p id="profileName" style={{ textTransform: 'capitalize', fontFamily: "cursive" }} className="display-4 fw-bold mt-3"> {user.firstname} {user.lastname} </p>
                </div>
                <div className=' align-content-center'>
                  <button className='btn btn-outline-primary fs-4 fw-bold' style={{ fontFamily: "cursive" }} onClick={() => {
                    router.push("/Profile/Friends")
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                      style={{ marginBottom: "5px" }}
                      width="28"
                      height="28"
                      fill="currentColor"
                      class="bi bi-person-hearts" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M11.5 1.246c.832-.855 2.913.642 0 2.566-2.913-1.924-.832-3.421 0-2.566M9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4m13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276ZM15 2.165c.555-.57 1.942.428 0 1.711-1.942-1.283-.555-2.281 0-1.71Z" />
                    </svg> Friends </button>
                </div>
              </div>
              <button className='btn btn-danger mx-2 my-3' onClick={()=>{
                dpHandler()
              }}> Remove Picture </button>
              <hr />
              <br />
            </div>
            <div id="detail">
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="form-outline">
                      <label className="form-label" for="firstname">First Name</label>
                      <input type="text" id="firstname" value={user.firstname} className="form-control form-control-lg" onChange={(e) => {
                        setUser((prev) => { return { ...prev, firstname: e.target.value } })
                      }} />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form-outline">
                      <label className="form-label" for="lastname">Last Name</label>
                      <input type="text" id="lastname" value={user.lastname} className="form-control form-control-lg" onChange={(e) => {
                        setUser((prev) => { return { ...prev, lastname: e.target.value } })
                      }} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3 pb-2">
                    <div className="form-outline">
                      <label className="form-label" for="email">Email</label>
                      <input type="email" id="email" value={user.email} className="form-control form-control-lg" onChange={(e) => {
                        setUser((prev) => { return { ...prev, email: e.target.value } })
                      }} />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3 pb-2">
                    <div className="form-outline">
                      <label className="form-label" for="phoneNumber">Phone Number</label>
                      <input type="text" id="phone" value={user.phone} className="form-control form-control-lg" onChange={(e) => {
                        setUser((prev) => { return { ...prev, phone: e.target.value } })
                      }} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3 pb-2">
                      <div className="form-outline">
                        <label className="form-label" for="email">Age</label>
                        <input type="email" id="age" value={user.age} className="form-control form-control-lg" disabled onChange={(e) => {
                          setUser((prev) => { return { ...prev, age: e.target.value } })
                        }} />
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="form-outline">
                        <label for="" className="form-label">Gender</label>
                        <input type="text" id="gender" value={user.gender} className="form-control form-control-lg" disabled onChange={(e) => {
                          setUser((prev) => { return { ...prev, gender: e.target.value } })
                        }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3 pb-2">
                  <div className="form-outline">
                    <input type="file" className='form-control' style={{ width: "300px" }} onChange={(e) => {
                      const profilePicture = e.target.files[0]
                      const reader = new FileReader();
                      reader.readAsDataURL(profilePicture);
                      reader.addEventListener("load", (e) => {
                        setUser((prev) => { return { ...prev, profilePicture: e.target.result } })
                      })
                    }} />
                  </div>
                </div>
              </form>
              <div className="mt-1 pt-1">
                <button className='btn btn-primary btn-lg' onClick={() => {
                  updateHandler()
                }}> Submit </button>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
