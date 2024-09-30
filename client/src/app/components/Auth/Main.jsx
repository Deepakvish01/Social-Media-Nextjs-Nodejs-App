import React, { useState } from 'react'
import { Signup } from './Signup'
import { Login } from './Login'

const Main = () => {
  const [mode, setMode] = useState("login")
  return (
    <div className='container'>
      {
        mode == "login" ? <Login setMode={setMode} /> : <Signup setMode={setMode} /> 
      }
    </div>
  )
}

export default Main