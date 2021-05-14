import React,{useState,useEffect,useContext} from 'react';
import socketIOClient from 'socket.io-client';

const SocketContext = React.createContext();
const SERVER_ENDPOINT = 'http://localhost:3000' ;


export function useSocket(){
    return useContext(SocketContext);
}

export default function SocketProvider({id,fid,children}){

    console.log(fid,id);
    const [socket,setSocket] = useState();

    useEffect(()=>{
        const newSocket = socketIOClient(SERVER_ENDPOINT,{
            query:{id,fid}
        });

        setSocket(newSocket);
        console.log("creating a new socket instance")

        return ()=>{
            newSocket.close();
        }
    },[id,fid]);

    
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}