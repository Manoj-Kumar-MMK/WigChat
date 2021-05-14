import React from 'react'
import './css/Login.css'
import {useHistory} from 'react-router-dom'

const Login = ({setMyId,setFId}) => {

    const history = useHistory();
    const formSubmitHandler = (event)=>{
        
        event.preventDefault();
       // console.log(event.target.loginer)
        let myid = event.target.uid.value ;
        let friend_id = event.target.fid.value;

        localStorage.setItem('myid',myid);
        localStorage.setItem('fid',friend_id);
        history.push('/chats');

    }

    return (
       
        <div class="login">
            <div class="login-triangle"></div>
            
            <h2 class="login-header">CHAT ROOM</h2>

            <form class="login-container" onSubmit={formSubmitHandler}>
                <p><input id="uid" placeholder="YOUR ID" /></p>
                <p><input id="fid" placeholder="FRIEND ID" /></p>
                <p><input id="loginer" type="submit" value="start chat" /></p>

            </form>
        </div>
       


    )
}

export default Login
