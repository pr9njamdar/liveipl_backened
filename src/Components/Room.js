import React, { useState, useEffect, useRef } from "react";
import "../Components/Room.css";
import Emojibar from "./Emojibar";
import Navbar from "./Navbar";
import Poll from "./Poll";
import io from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const url = "http://localhost:3001";
const socket = io.connect("http://localhost:3001");
let team1members=[];
let team2members=[];
export default function Room() {
  let navigate = useNavigate();
  const componentmounted = useRef(false);
  const componentmounted1 = useRef(false);
  const username = localStorage.getItem("username");
  const [message, seTmessage] = useState("");
  const room = localStorage.getItem("Room");
  const logout = () => {
    localStorage.setItem("logged_in", "no");
    axios({
      method: "post",
      url: `${url}/removeuser`,
      data: {
        name: username,
      },
    }).then((res) => {
      console.log(res);
    });
    localStorage.setItem("username", "");

    navigate("/");
  };
  const Handlemessage = (e) => {
    seTmessage(e.target.value);
  };

  const Sendmessage = () => {
    if (message != "") {
      socket.emit("send-message", { message, username, room });
      const div = document.createElement("div");
      div.className = "message-right";
      div.id = "self-massage";
      div.textContent = message;
      document.getElementsByClassName("chatbox")[0].appendChild(div);
      seTmessage("");
    }
  };

  useEffect(() => {
    axios({
      method: "post",
      url: `${url}/addmember`,
      data: {
        name: username,
        room: room,
        team:localStorage.getItem("team")
      },
    }).then((res) => {
      console.log(res.data)
      if (res.data==false){
        localStorage.setItem('logged_in','');
        localStorage.setItem('username','');
        navigate('/')
      }
      if(res.data==true){
        axios({
          method:"post",
          url:'http://localhost:3001/teammembers',
          data:{
            room:room,
          }
        }).then((res)=>{
           let n=res.data.length;
           for(var i=0;i<n;i++){
            if(res.data[i].team=="MI"){
              team1members[i]=res.data[i].membername
              let div = document.createElement('div')
              div.className="members"
              div.textContent=res.data[i].membername
              document.getElementById('team1').appendChild(div)
            }
            else{
              team2members[i]=res.data[i].membername;
              let div2 = document.createElement('div')
              div2.className="members"
              div2.textContent=res.data[i].membername
              document.getElementById('team2').appendChild(div2)
            }
            
           }
           console.log(team1members,team2members)
        })
      }
     
    });

    socket.emit("user-joined", { username, room });
    socket.on('member_left',(username)=>{
      const div = document.createElement("div");

      div.className = "message";
      div.textContent = username + " left the chat";
      document.getElementsByClassName("chatbox")[0].appendChild(div);
      componentmounted.current = true;
    })
    socket.on("user-sucessfully-joined", (username) => {
      const div = document.createElement("div");

      div.className = "message";
      div.textContent = username + " joined";
      document.getElementsByClassName("chatbox")[0].appendChild(div);
      componentmounted.current = true;
      axios({
        method:"post",
        url:'http://localhost:3001/teammembers',
        data:{
          room:room,
        }
      }).then((res)=>{
         let n=res.data.length;
         for(var i=0;i<n;i++){
          if(res.data[i].team=="MI"){
            team1members[i]=res.data[i].membername
            let div = document.createElement('div')
            div.className="members"
            div.textContent=res.data[i].membername
            document.getElementById('team1').appendChild(div)
          }
          else{
            team2members[i]=res.data[i].membername;
            let div2 = document.createElement('div')
            div2.className="members"
            div2.textContent=res.data[i].membername
            document.getElementById('team2').appendChild(div2)
          }
          
         }
         console.log(team1members,team2members)
      })
      // return () => {
      //   document.body.removeChild(div);
      //   axios({
      //     method: "post",
      //     url: `${url}/removeuser`,
      //     data: {
      //       name: username,
      //     },
      //   }).then((res) => {
      //     console.log(res);
      //   });
      // };
    });

      
     window.addEventListener("beforeunload", async (e) => {
      team1members=''
      team2members=''
      axios({
            method: "post",
            url: `${url}/removeuser`,
            data: {
             name: username,
             room:room,
              team:localStorage.getItem("team"),
            },
          }).then((res) => {
            console.log(res);
        });
     });
  }, []);
  useEffect(() => {
    socket.on("recieve-message", (object) => {
      const div = document.createElement("div");
      div.className = "message";
      const div1 = document.createElement("div");
      div1.className = "name";
      div1.textContent = object.username;
      div.textContent = object.message;
      document
        .getElementsByClassName("chatbox")[0]
        .appendChild(div)
        .appendChild(div1);
      componentmounted1.current = true;
      return () => {
        document.body.removeChild(div);
         
        
          axios({
            method: "post",
            url: `${url}/removeuser`,
            data: {
              name: username,
            },
          }).then((res) => {
            console.log(res);
          });
      
      };
    });
  }, [socket]);
  return (
    <div className="master">
      <Navbar />
      <div className="RoomContainer">
        <div className="responsivecont">
          <div className="mastermembers">
            <div className="teamheader">
              <div className="teamlogo"></div>
              Team A Fans
            </div>
            <div className="roommates" id="team1"></div>
          </div>
          <div className="teamscont">
            <h3 className="chatboxheader">CSK V/S MI</h3>
            <div className="chatbox"></div>
            <div className="typingbox">
              <input
                type="text"
                className="messagebox"
                placeholder="Message"
                value={message}
                name="Message"
                onChange={Handlemessage}
                id="Mess-a"
              />
              <div className="messbtn" onClick={Sendmessage}>
                Send
              </div>
            </div>
          </div>
          <div className="mastermembers">
            <div className="teamheader">
              <div className="teamlogo"></div>
              Team b Fans
            </div>
            <div className="roommates" id="team2">
             
            </div>
          </div>
        </div>
        <div className="scoreinfo">Score</div>
      </div>

      <button onClick={logout} className="logoutbtn">
        Exit Room
      </button>
      {/* <Emojibar />
            <Poll />  */}
    </div>
  );
}
