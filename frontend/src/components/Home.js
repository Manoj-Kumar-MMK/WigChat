import React from 'react'
import {useHistory } from 'react-router-dom';
import './css/Home.css'

const Home = () => {

    let history = useHistory();

    const loginHandler = (e)=>{
        history.push('/login');
    }
    return (
        
         <div class="container">
        <div class="titular">		
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1502&q=80" alt="Students gathered around a table, laughing" class="bg"/>
            <button class="btntop" onClick={loginHandler}>Login</button>
            <h1 class="tagline">JOIN THE TH3H04X CHAT </h1>
            <button class="btn">Get Started</button>
        </div>
    </div>
    )
}

export default Home ;
