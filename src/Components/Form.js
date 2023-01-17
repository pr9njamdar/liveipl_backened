import React, { useState } from 'react'
import '../Components/Form.css'
import { useNavigate, } from 'react-router-dom';
import axios from 'axios';

export default function Form() {
  const [name, seTname] = useState('')
  const [password, seTpassword] = useState('')
  const [email, seTemail] = useState('')
  let navigate = useNavigate();
  const Handleclick = () => {
    axios({
      method: 'post',
      url: 'http://localhost:3001/register',
      data: {
        name: name,
        email: email,
        password: password,
      }
    })
    navigate('/Room');
  }

  const emailhandler = (event) => {
    seTemail(event.target.value)
  }
  const passwordhanler = (event) => {
    seTpassword(event.target.value)
  }
  const namehandler = (event) => {
    seTname(event.target.value)
  }
  return (


    <div className="upfcont">
      <div className="formContainer">
        <div className="formheader">Register</div>

        <div className="inputs">
          <label htmlFor="name">Name:</label>
          <input onChange={namehandler} value={name} type="text" placeholder='Name' id='name' className='inp' />
        </div>

        <div className="inputs">
          <label htmlFor="Email">Email:</label>
          <input onChange={emailhandler} value={email} type="email" placeholder='Email' id='Email' className='inp' />
        </div>

        <div className="inputs">
          <label htmlFor="Password">Password:</label>
          <input onChange={passwordhanler} value={password} type="password" placeholder='Password' id='Password' className='inp' />
        </div>

       

        <div onClick={Handleclick} className="btn">Submit</div>
        <div onClick={()=>{navigate('/login')}} className="loginlink">Already a Member Login here</div>

      </div>
    </div>

  )
}
