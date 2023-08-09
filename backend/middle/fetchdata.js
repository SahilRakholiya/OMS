const jwt = require('jsonwebtoken')
require('dotenv').config();
const JWT_SECRET = process.env.jwt_token_key

const fetchuser = (req, resp, next) => {
    const token = req.headers['auth-token']
    // console.log("hi");
    if(typeof token !=='undefined')
    {
        const data = jwt.verify(token,JWT_SECRET,(err,data)=>{
            if(err)
            {
                success=false;
                return resp.status(400).send({success,message:"invalid token"});
            }
            else{
                next();
            }
        })
        // req.token =data.users
    }
    else{
       return resp.status(401).send({error : "please authenticate using a valid token"})
    }
    // if(!token){
    //     resp.status(401).send({error : "please authenticate using a valid token"})

    //     try {
    //         const data = jwt.verify(token,JWT_SECRET)
    //         req.token =data.users
    //         next()
    //     } catch (error) {
    //         resp.status(401).send({ error: "please authenticate using a valid token" })
    //     }
    // }
}

module.exports = fetchuser