

const myCors = (req,res,next)=>{

    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers',  
                                    'Accept,Content-Type,X-Requested-With,Origin,Authorization');
    res.setHeader('Access-Control-Allow-Methods','*');

    next()
}


module.exports = myCors ;