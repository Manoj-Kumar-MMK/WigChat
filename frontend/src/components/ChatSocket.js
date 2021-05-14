import socketIOClient from 'socket.io-client';
import {useEffect} from 'react'

const SERVER_ENDPOINT = 'http://localhost:3000' ;




export function SocketProvider({myid,fid}){

    let socket ;

    useEffect(()=>{

        //creating a socket instance
        socket =socketIOClient(SERVER_ENDPOINT,{
            query:{myid,fid}
        });

        socket.emit('joinroom',{myid,fid});

        return  ()=> socket.close();

        },[myid,fid])

    return socket ;
  
}