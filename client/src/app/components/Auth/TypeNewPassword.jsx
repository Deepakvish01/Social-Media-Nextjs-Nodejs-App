import { AuthContext } from '@/app/Context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'

export const TypeNewPassword = (id) => {
  const [passwordStruc, setPasswordStruc] = useState({ newPassword: "", confirmNewPassword: "" })
  const { forgotPassword } = useContext(AuthContext);
  const router = useRouter();
  async function ForgotPassword() {
    try {
      if (passwordStruc.newPassword != "" && passwordStruc.confirmNewPassword != "") {
        if (passwordStruc.newPassword == passwordStruc.confirmNewPassword) {
          const status = await forgotPassword(id.id, { password: passwordStruc.newPassword });
          if (status == 200) {
            router.push("/Auth");
          }
        } else {
          alert("Password Do Not Match");
        }
      } else {
        alert("Fields cannot be empty")
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <input type="text" className='form-control' placeholder='Type New Password'
        style={{ fontFamily: "cursive" }} onChange={(e) => {
          setPasswordStruc((prev) => { return { ...prev, newPassword: e.target.value } })
        }} />
      <br />
      <input type="text" className='form-control' placeholder='Confirm New Password'
        style={{ fontFamily: "cursive" }} onChange={(e) => {
          setPasswordStruc((prev) => { return { ...prev, confirmNewPassword: e.target.value } })
        }} />
      <br />
      <button className='btn btn-outline-success fw-bold fs-5'
        style={{ width: "260px", fontFamily: "cursive" }} onClick={() => {
          ForgotPassword()
        }}> Submit ! </button>
    </div>
  )
}
