import React ,{ useState }from 'react'
import '../Components/Form.css'
import { useNavigate, } from 'react-router-dom';
import axios from 'axios';

export default function Loginform() {
  const [password, seTpassword] = useState('')
  const [email, seTemail] = useState('')
  const [error,seTerror]=useState('')
  const [room,seTroom]=useState('')
  const [roomcode,seTroomcode]=useState('')
  let navigate = useNavigate();
  const Handleclick = () => {
    axios({
      method: 'post',
      url: 'http://localhost:3001/login',
      data: {
        
        email: email,
        password: password,
        room:room,
        roomcode:roomcode
      }
    }).then((res)=>{
      if(res.data.memberfound){
        console.log(res.data)
        localStorage.setItem('username',res.data.name)
        
         navigate('/Room');
      }
      else
      {
        
        seTerror('You are not registered')
      }
    })
    
  }

  const emailhandler = (event) => {
    seTemail(event.target.value)
  }
  const passwordhanler = (event) => {
    seTpassword(event.target.value)
  }
  const roomhandler = (event) => {
    seTroom(event.target.value)
  }
  const roomcodehandler = (event) => {
    seTroomcode(event.target.value)
  }
  return (
    <div className="upfcont">
      <div className="formContainer">
        <div className="formheader">Login</div>

       

        <div className="inputs">
          <label htmlFor="Email">Email:</label>
          <input onChange={emailhandler} value={email} type="email" placeholder='Email' id='Email' className='inp' />
        </div>

        <div className="inputs">
          <label htmlFor="Password">Password:</label>
          <input onChange={passwordhanler} value={password} type="password" placeholder='Password' id='Password' className='inp' />
        </div>

       
        <div className="inputs">
          <label htmlFor="RoomCode">Room:</label>
          <input type="text" onChange={roomhandler} placeholder='Room' value={room} id='Room' className='inp' />
        </div>
        <div className="inputs">
          <label htmlFor="RoomCode">Roomcode:</label>
          <input type="text" onChange={roomcodehandler} placeholder='RoomCode' value={roomcode} id='RoomCode' className='inp' />
        </div>
        <div onClick={Handleclick} className="btn">Enter Room</div>
        
        <div className="errormsg">{error}</div>
      </div>
    </div>
  )
}
