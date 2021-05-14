const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

dotenv.config();

module.exports = (token)=>{

    try{
        console.log(token)
        if(!token){
            return
        }
        const tokenInfo = jwt.verify(token,process.env.JWT_SECRETKEY)

        return tokenInfo ;
    }
    catch(err){
       //error handling
       console.log(error);
       return 
    }
    
}

