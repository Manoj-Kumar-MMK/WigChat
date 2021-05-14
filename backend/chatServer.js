const express = require('express');
const http = require('http');
const mysql = require('mysql');
const dotenv = require('dotenv');
const IO = require('socket.io');

const myCors = require('./utils/server_utils.js')
const db_connect = require('./db/dbObj');
const chatsSocketCon = require('./Chats/chatsSocketConnection');

dotenv.config()

const app = express();
server = http.createServer(app);

//CORS ENABLING IO SOCKETS
const IO_options={
    cors:true,
    origins:["*"],
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
   }

global.io = IO(server,IO_options);
//enabling cors in http connection
app.use(myCors);

//creating socket server instance and waiting for clients
chatsSocketCon();

// connecting to the database and then starting the server
global.db = mysql.createConnection(db_connect);
db.connect(function(err) {

    if (err) throw err;
    // starting the server
  server.listen(process.env.PORT || 3300,()=>{

    console.log(`Server Started ==> ${process.env.PORT || 3000}`); 

    })

    console.log("DB Connected!");

});

// server.listen(3000,()=>{
//     console.log("server started");

// })