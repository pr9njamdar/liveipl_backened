import React, { useState, useEffect, useRef } from 'react'
import '../Components/Room.css'
import Emojibar from './Emojibar'
import Navbar from './Navbar'
import Poll from './Poll'
import io from 'socket.io-client'
import axios from 'axios'
const socket = io.connect("http://localhost:3002")

export default function Room() {
    const componentmounted = useRef(false);
    const componentmounted1 = useRef(false);
    const username = localStorage.getItem('username');
    const [message, seTmessage] = useState('')
  

    const Handlemessage = (e) => {
        seTmessage(e.target.value);

    }
 
 
    const Sendmessage = () => {
        if (message != '') {
            socket.emit('send-message', { message });
            const div = document.createElement('div');
            div.className = 'message-right';
            div.id = 'self-massage'
            div.textContent = message;
            document.getElementsByClassName('chatbox')[0].appendChild(div);
            seTmessage('');

        }

    }
    
    useEffect(() => {
        
           
                
                axios({
                    method: 'post',
                     url: 'http://localhost:3001/addmember',
                     data: {
                      name:username,
                      room:'Room2'
                 }
                  }).then((res)=>{
                    console.log(res)
                 })
            
           
            
            socket.emit('user-joined', username);
            socket.on('user-sucessfully-joined', (username) => {

                const div  = document.createElement('div');
              
                div.className = 'message';
                div.textContent = username + " joined";
                document.getElementsByClassName('chatbox')[0].appendChild(div);
                componentmounted.current = true;
                return () => {
                    document.body.removeChild(div);
                };
            })
        
             
       
            
            //  setInterval(() => {
            //     axios.get('https://api.cricapi.com/v1/currentMatches?apikey=4fd4bad7-67b6-4daa-8b6c-676fb822b228&offset=0').then((response)=>{
            //         console.log(response.data.data[0].score[0])
            //     })
            //   }, 10000);


            //  axios.get('http://localhost:3001/teammembers').then((res)=>{
            //      members=res.data.members
            //      console.log(members)
            //   console.log(res.data.members)
            //  })
              window.addEventListener('beforeunload',  (e)=> {
                  
                 
                 
                  axios({
                               method: 'post',
                              url: 'http://localhost:3001/removeuser',
                               data: {
                                 name:username,
                            
                            }
                             }).then((res)=>{
                               console.log(res)
                            })
              });
              
        

    }, []);
    useEffect(() => {
        
            socket.on("recieve-message", (r_message) => {
                // Get the parent div
                const div = document.createElement('div');
                div.className = 'message';
                const div1  = document.createElement('div');
                div1.className='name';
                div1.textContent=username;
                div.textContent = r_message.message;
                document.getElementsByClassName('chatbox')[0].appendChild(div).appendChild(div1); // Append the new div to the parent div
                componentmounted1.current = true;
                return () => {
                    document.body.removeChild(div);
                };
    
            })
           
        
           
           
    },[socket])
    return (
        <div className="master">

            <Navbar />
            <div className='RoomContainer'>
                <div className="responsivecont">
                    <div className="mastermembers">
                        <div className="teamheader">
                            <div className="teamlogo"></div>
                            Team A Fans
                        </div>
                        <div className="roommates">
                          

                        </div>
                    </div>
                    <div className="teamscont">
                        <h3 className="chatboxheader">CSK V/S MI</h3>
                        <div className="chatbox">
                           

                        </div>
                        <div className="typingbox">
                            <input type="text" className='messagebox' placeholder='Message' value={message} name="Message" onChange={Handlemessage} id="Mess-a" />
                            <div className="messbtn" onClick={Sendmessage}>Send</div>
                        </div>

                    </div>
                    <div className="mastermembers">
                        <div className="teamheader">
                            <div className="teamlogo"></div>
                            Team A Fans
                        </div>
                        <div className="roommates">
                           

                        </div>
                    </div>
                </div>
                <div className="scoreinfo">Score</div>
               
            </div>
    
             <Emojibar />
            <Poll /> 
        </div>
    )
}
