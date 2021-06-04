const jwt=require('jsonwebtoken')
const mysql = require("mysql");
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "LoginSystem",
  });

const Authenticate=async (req,res,next)=>{
    
    try{

        const token=req.cookies.jwttoken;
        const verifytoken=jwt.verify(token,process.env.TOKEN_SECRET);
        console.log(verifytoken)
        
        db.query("Select * from user where userId=? and jwttoken=?", [verifytoken,token],
        (err,result)=>{
            if(err)
            {
                throw new Error('user not found')
            }
            else{
                // console.log(result)
            // console.log(result[0].userId)
            // req.token=token;
            req.rootuser=result[0];
            // req.userId=result[0].userId
            next();
            }

        });
        
       
        
     }
    catch(err){
        res.status(401).send('Unautherised')
        console.log(err)

    }

}

module.exports=Authenticate;