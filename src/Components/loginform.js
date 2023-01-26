import React, { useEffect, useRef, useState } from "react";
import "../Components/Form.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Loginform() {
  const [password, seTpassword] = useState("");
  const [email, seTemail] = useState("");
  const [error, seTerror] = useState("");
  const [room, seTroom] = useState("");
  const [Team1, setTeam1] = useState(false);
  const [Team2, setTeam2] = useState(false);
  const [team, seTteam] = useState("");

  const url = "http://localhost:3001";
  const [roomcode, seTroomcode] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("logged_in") == "yes") {
      navigate("/Room");
    }
    // console.log(team);
    localStorage.setItem("team",team)
    

  });

  const Handleclick = () => {
    axios({
      method: "post",
      url: `${url}/login`,
      data: {
        email: email,
        password: password,
        room: room,
       
        roomcode: roomcode,
      },
    }).then((res) => {
      if (res.data.memberfound) {
        console.log(res.data);
        localStorage.setItem("username", res.data.name);
        localStorage.setItem("logged_in", "yes");
        localStorage.setItem("Room", room);
        navigate("/Room");
      } else {
        seTerror("You are not registered");
      }
    });
  };

  const emailhandler = (event) => {
    seTemail(event.target.value);
  };
  const passwordhanler = (event) => {
    seTpassword(event.target.value);
  };
  const roomhandler = (event) => {
    seTroom(event.target.value);
  };
  const roomcodehandler = (event) => {
    seTroomcode(event.target.value);
  };
  return (
    <div className="upfcont">
      <div className="formContainer">
        <div className="formheader">Login</div>

        <div className="inputs">
          <label htmlFor="Email">Email:</label>
          <input
            onChange={emailhandler}
            value={email}
            type="email"
            placeholder="Email"
            id="Email"
            className="inp"
          />
        </div>

        <div className="inputs">
          <label htmlFor="Password">Password:</label>
          <input
            onChange={passwordhanler}
            value={password}
            type="password"
            placeholder="Password"
            id="Password"
            className="inp"
          />
        </div>

        <div className="inputs">
          <label htmlFor="RoomCode">Room:</label>
          <input
            type="text"
            onChange={roomhandler}
            placeholder="Room"
            value={room}
            id="Room"
            className="inp"
          />
        </div>
        <div className="inputs">
          <label htmlFor="RoomCode">Roomcode:</label>
          <input
            type="text"
            onChange={roomcodehandler}
            placeholder="RoomCode"
            value={roomcode}
            id="RoomCode"
            className="inp"
          />
        </div>
        <div className="inputs">
          <label htmlFor="team1">MI</label>
          <input
            type="radio"
            value="MI"
            checked={Team1}
            onChange={(e) => {
              seTteam(e.target.value);
              setTeam1(true);
              setTeam2(false);
             
            }}
            id="team1"
          />

          <label htmlFor="team2">CSK</label>
          <input
            type="radio"
            value="CSK"
            checked={Team2}
            onChange={(e) => {
              seTteam(e.target.value);
              setTeam2(true);
              setTeam1(false);
             
            }}
            id="team2"
          />
        </div>

        <div onClick={Handleclick} className="btn">
          Enter Room
        </div>

        <div className="errormsg">{error}</div>
      </div>
    </div>
  );
}
