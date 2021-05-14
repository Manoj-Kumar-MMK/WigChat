
const execSql = (sql,callback)=>{

    db.query(sql,(error,results)=>{

        if(error) callback(error,null)
        else{
         
          let rows = {} ;
          //converting the rowdatapackts into propr usable objects

          Object.keys(results).forEach(function(key) {
              rows[key] = results[key];
            });
        //  console.log(rows.chats_table_name)
          
          
          //console.log(rows,global.SQLresults);
          callback(null,rows);
         
        }
    })

  }

module.exports = execSql ;
