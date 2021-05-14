import React , {useEffect , useRef, useState } from 'react'
import {useHistory} from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import './css/Chats.css';

import {getId,outputMessage} from './Chats_Utils';

//chat server endpoint
const SERVER_ENDPOINT = 'http://localhost:3300' ;

const Chats = () => {
 
    const inputRef = useRef();
    const history = useHistory();
    let socket ;

    console.log("in main chat controller")

    //getting id from localstorage
    const {myid , fid } = getId();

    const token = myid + fid ;
   //checking if localstorage had myid and fid else alerting error
    if(!myid || !fid){
        alert('not provided u r name and friend name ');
        history.push('/login');
    }

    useEffect(()=>{

        //creating a socket instance
        socket =socketIOClient(SERVER_ENDPOINT,{
            query:{myid,fid,token}
        });

        socket.emit('joinroom',{myid,fid});

        return  ()=> socket.close();

        },[myid,fid,socket])

   // socket instance waiting for new msg event from the server
   useEffect(()=>{
    if(socket){
        socket.on('msg',(data)=>{
           // console.log()

            //if the username is you then then change it to you 
            if(data.username === myid) data.username = 'you' ;
            // console.log("[+++++]",data , myid)
            outputMessage(data);
        })
    }
   },[myid,socket])
  

   // eventhandler for sending msg to server 
   function sendMessage(event){

        event.preventDefault();
        //get the current msg 
        let chat_msg = inputRef.current.value
        console.log(chat_msg);
        //empting the chat bar
        inputRef.current.value = ""
        let chatMessages = document.querySelector('.chat-messages');

        //scroll to the top to the bar height 
        chatMessages.scrollTop = chatMessages.scrollHeight;

        //emitting to server
        socket.emit('sendMsg',{message:chat_msg,myid:myid , fid:fid});
       // outputMessage(chat_msg)
    };

    //end chat and redirect to homepage
    const endChatHandler = (e)=>{
        history.push('/');
    }
    // chat template


    const chat_template = (
        <div>
            <main className="chat-main">
                <div className="chat-sidebar">
                    <h3><i className="fas fa-comments"></i> ME:{myid}</h3>
                 
                    <h2 id="room-name"></h2>
                    <h3><i className="fas fa-users"></i> FRIEND :{fid}</h3>
                    <ul id="users"></ul>
                </div>
                <div className="chat-messages">
                  
                </div>
                </main>
                <div className="chat-form-container">
                <form id="chat-form">
                    <input
                    id="msg"
                    type="text"
                    placeholder="Enter Message"
                    ref={inputRef}
                    required
                    />
                    <button className="btn" onClick={sendMessage}><i className="fas fa-paper-plane"></i> Send</button>
                </form>
                </div>
        </div>
        );



    return (
        <div className="chat-container">
            <header className="chat-header">
            <h1><i className="fas fa-smile"></i> HO4XCHAT </h1>
            <button id="leave-btn" className="btn" onClick={endChatHandler}>END CHAT</button>
            </header>
            {chat_template}
        </div>
  

    )
}

export default Chats
