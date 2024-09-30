import { AuthContext } from '@/app/Context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useRef, useState } from 'react'

export const Login = ({ setMode }) => {
  const { signin, dispatch } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();
  const ref = useRef()

  async function handleSubmit() {
    if (formData.email != "" && formData.password != "") {
      const data = await signin(formData);
      dispatch({
        type: "SIGNIN",
        payload: data?.data
      })
      if (data?.status != 200) {
        alert(" ! Wrong Password ! Try Again")
        ref.current.reset()
      } else {
        router.push("/Posts")
      }
    } else {
      alert("Cannot Empty Email and Password")
    }
  }
  return (
    <div className="wrapper">
      <div className="logo">
        <img src="https://static.vecteezy.com/system/resources/previews/005/076/592/non_2x/hacker-mascot-for-sports-and-esports-logo-free-vector.jpg" />
      </div>
      <div className="text-center mt-4 name">
        Login
      </div>
      <form ref={ref} className="p-3 mt-3">
        <div className="form-field d-flex align-items-center">
          <span className="far fa-user"></span>
          <input type="Email" name="Email" id="email" placeholder="Email" onChange={(e) => {
            setFormData((prev) => { return { ...prev, email: e.target.value } })
          }} />
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key"></span>
          <input type="password" name="password" id="password" placeholder="Password" onChange={(e) => {
            setFormData((prev) => { return { ...prev, password: e.target.value } })
          }} />
        </div>
      </form>
      <button className="btn mt-3" id="submitBtn" onClick={() => {
        handleSubmit()
      }} >Login</button>
      <div className="text-center fs-6 my-2">
        <button className='bg-transparent' style={{ border: "0px", color: "#039BE5" }} onClick={() => {
          router.push("/Auth/ForgotPassword")
        }} ><span> Forgot Password </span></button>
        <span style={{ border: "0px", color: "black" }}> or </span>
        <button className='bg-transparent' style={{ border: "0px", color: "#039BE5" }} onClick={() => {
          setMode("signup")
        }}><span> Sign Up </span></button>
      </div>
    </div>
  )
}
