
const execSql = require('../db/execSql');
const randStr = require('./Chats_Utils/randStr');
const init_new_chatTable = require('./Chats_Utils/init_new_chatTable');
const getTime = require('./Chats_Utils/getTime');

// socket events name
const HOAX_BOT = "hoax-bot"
const JOIN_CHAT = "joinroom"

const chatsSocketCon = ()=>{

    
    io.on('connection',(socket)=>{

        // console.log(socket.handshake.query.myid)
        
        //getting meta info while websockets handshake
        let myId = socket.handshake.query.myid ;
        let room = socket.handshake.query.fid ;
       

        socket.on(JOIN_CHAT,(data)=>{

            let sql = `select chats_table_name from chats_entry where(chats_entry.aid ="${myId}" and chats_entry.bid = "${room}") or (chats_entry.aid = "${room}" and chats_entry.bid = "${myId}")` ;
            
            // checking if chat table for both users chats already presents 
            execSql(sql,(error,results)=>{

                //console.log(results[0])
                //chat table aready presents

                if(results[0]){
                    console.log("chat table already presents")

                    //joining a room
                    socket.join(results[0].chats_table_name);
                    return 
                }

                //creating new chat table
                else if(results){
                    let rand_db_name = randStr()
                    console.log("chat table not presents",rand_db_name);

                    //insert into chat entry both id with randdb name
                    // next create a new table with that rand table name
                    init_new_chatTable(myId,room,rand_db_name);

                    //joining a room
                    socket.join(rand_db_name);
                }
                else{
                    //error handling
                    console.log(error)
                }
               
            });

            let dateTime=  getTime();


            

            let welcomeMsgObj = {
                message:`welcome to our chat ->> ${myId} <<-online <------ [${dateTime}]`,
                time:dateTime,
                username:HOAX_BOT
            } 

            socket.emit('msg',welcomeMsgObj);


            //console.log(room,myId)
            sql = `select chats_table_name from chats_entry where(chats_entry.aid ="${myId}" and chats_entry.bid = "${room}") or (chats_entry.aid = "${room}" and chats_entry.bid = "${myId}")` ;
            
            execSql(sql,(error,results)=>{

                if(results[0]){

                    let USER_TABLE_NAME = results[0].chats_table_name ;
                    socket.broadcast.to(USER_TABLE_NAME).emit('msg',{
                        message:`user ->> ${myId} <<- has joined at <--------- [${dateTime}]`,
                        time:dateTime,
                        username:HOAX_BOT
                        });    

                }
                else{
                    //error handling
                    console.log(error);
                }
            
            })
         
        })

        socket.on('sendMsg', (data, callback) => {

            let dateTime = getTime(); 

            let sendMsgObj =  {
                message:data.message,
                time:dateTime,
                username:data.myid
            };

            //chat msgs to be inserted into db ;
            let sql = `select chats_table_name from chats_entry where(chats_entry.aid ="${myId}" and chats_entry.bid = "${room}") or (chats_entry.aid = "${room}" and chats_entry.bid = "${myId}")` ;
            
            execSql(sql,(error,results)=>{
                if(results[0]){
                    let chats_table_name = results[0].chats_table_name

                    io.to(chats_table_name).emit('msg',sendMsgObj);

                    sql = `insert into ${chats_table_name} values("${data.myid}","${data.message}","${dateTime}")`

                    execSql(sql,(error,results)=>{
                        if(!error){
                            console.log("msg inserted");
                            

                        }
                        else{
                            console.log(error);
                        }
                    })
                    
                }
                else{
                    //error handling
                    console.log(error);
                }
            });

            // io.to(room).emit('msg',sendMsgObj);

            //callback();
        });

        socket.on('disconnect',()=>{
            
            console.log(myId,' disconnected');
            let sql = `select chats_table_name from chats_entry where(chats_entry.aid ="${myId}" and chats_entry.bid = "${room}") or (chats_entry.aid = "${room}" and chats_entry.bid = "${myId}")` ;

            execSql(sql,(error,results)=>{

                if(!error){

                    let chats_table_name = results[0].chats_table_name
                    let dateTime = getTime(); 
                    io.to(chats_table_name).emit('msg',{
                        message:`user ->> ${myId} <<- has left at <--------- [${dateTime}]`,
                        time:dateTime,
                        username:HOAX_BOT
                        });    

                }
                else{
                    console.log(error);
                }
            })
          

        })

    });

}

module.exports = chatsSocketCon ;