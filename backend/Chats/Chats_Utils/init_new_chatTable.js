const execSql = require('../../db/execSql');


function init_new_chatTable(myId,room,rand_db_name){

    let sql = `insert into chats_entry values("${myId}","${room}","${rand_db_name}")` ;

    execSql(sql,(error , results)=>{
        if(results){
            sql = `CREATE TABLE IF NOT EXISTS ${rand_db_name} (senderid int not null, msg TEXT , timestamp DATETIME,FOREIGN KEY(senderid) REFERENCES users(id) );`

            execSql(sql,(error,results)=>{

                if(results){
                    console.log("table created with name " , rand_db_name);
                }
                else{
                    console.log(error)
                    // error handling
                }
            })
        }
        else{
            //error handling
            console.log(error)
        }
    })

}

module.exports = init_new_chatTable ;

