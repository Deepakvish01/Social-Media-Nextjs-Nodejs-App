import { AuthContext } from '@/app/Context/AuthContext';
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import { imageURL } from '../Profile/EdtiProfile';

const Header = ({user}) => {
  const router = useRouter();
  const { dispatch } = useContext(AuthContext)
  function logOut() {
    try {
      dispatch({
        type: "SIGNOUT"
      })
      router.push("/Auth");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-dark navbar-dark" >
      <div className="container-fluid">
        <img src={user?.profilePicture.length == 0 ? imageURL : user?.profilePicture} style={{height:"40px",width:"40px",borderRadius:"50%" }} onClick={() => {
          router.push("/Profile")
        }} />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-2">
            <li className="nav-item">
              <button className="nav-link active" aria-current="page" onClick={() => {
                router.push("/Posts")
              }} >Home</button>
            </li>
            <li className="nav-item dropdown">
              <button className="nav-link active" aria-current="page" onClick={() => {
                router.push("/CreatePost")
              }} >Create Post</button>
            </li>
            <li className="nav-item dropdown">
              <button className="nav-link active" aria-current="page" onClick={() => {
                router.push("/FindYourTribe")
              }} >Find Your Tribes</button>
            </li>
          </ul>
          <button className="btn btn-outline-danger" onClick={() => {
            logOut()
          }}>Sign Out</button>
        </div>
      </div>
    </nav>
  )
}

export default Header