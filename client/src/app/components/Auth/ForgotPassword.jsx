import { AuthContext } from '@/app/Context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { TypeNewPassword } from './TypeNewPassword';

let email = ""
let otp = ""

export const ForgotPassword = () => {
  const router = useRouter();
  const [showOtpInput, setshowOtpInput] = useState(false);
  const { findUserByEmail, generateOtp, verifyOtp } = useContext(AuthContext);
  const [auxUser, setAuxUser] = useState()
  const [newPassword, setNewPassword] = useState(false);

  async function generateOtpHandler() {
    try {
      const user = await findUserByEmail({ email: email });
      const status = await generateOtp(user?.user?._id);
      setAuxUser(user?.user)
      if (status == 200) {
        setshowOtpInput(true);
      }
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }

  async function verifyOtpHandler() {
    try {
      const data = await verifyOtp({ _id: auxUser._id, otp: otp });
      if (data?.verified) {
        setshowOtpInput(false)
        setNewPassword(true)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='container my-2 p-2'>
      <div className='d-flex justify-content-center align-items-center' style={{ height: "80vh" }}>
        <div className='card shadow-sm p-5' style={{ fontFamily: "cursive" }} >
          <label className='fs-3 text-center fw-bolder ' style={{ fontFamily: "cursive" }}> Forgot Password </label>
          <label htmlFor="email" className='mt-4 fs-6' style={{ fontFamily: "cursive" }}> Email : </label>
          <input type="email" name='email' className='form-control mt-2' placeholder='Enter email'
            style={{ borderRadius: "5px" }} onChange={(e) => {
              email = e.target.value
            }} />
          <br />
          {!showOtpInput && !newPassword && <button className='btn btn-outline-primary ' onClick={() => {
            generateOtpHandler()
          }}> Generated Otp ! </button>}
          {showOtpInput &&  (
            <div>
              <input type="text" className='form-control' placeholder='Enter Otp !'
                style={{ fontFamily: "cursive" }} onChange={(e) => {
                  otp = e.target.value
                }} />
              <button className='btn btn-outline-primary fs-5 mt-4' style={{ fontFamily: "serif" }} onClick={() => {
                verifyOtpHandler()
              }}> Verify Otp ! </button>
            </div>
          )}
          {!showOtpInput && !newPassword && <button className='btn btn-warning text-white fs-4 mt-5'
            style={{ fontFamily: "serif" }} onClick={() => {
              router.push("/Auth")
            }}> Back to Login </button>}
          <div>
            {
              newPassword ? <TypeNewPassword id={auxUser?._id} /> : <></>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
