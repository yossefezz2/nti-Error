var jwt = require('jsonwebtoken');
const userMoudle = require("../../db/moudels/user.modul")
const auth= async (req,res,next)=>{
    try {

        const token = req.header("authorization").replace("bearer ","")
        console.log(token);
        let decoded = jwt.verify(token,process.env.jwtKey)
        const user =await userMoudle.findOne({
            _id:decoded._id,
            "tokens.token":token
        })
        if(!user)  throw new Error("invalid auth")

        req.user = user
        req.token = token

        next()
        
    } catch (error) {
        res.send({
            error: error.message
        })
    }
}
module.exports = auth