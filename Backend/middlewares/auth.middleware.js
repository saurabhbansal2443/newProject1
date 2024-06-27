import User from "../Models/users.js"
import jwt from "jsonwebtoken"
let auth = async (req, res  , next) =>{

    try{
    let token = req.cookies?.accessToken || req.header("Authorization")?.replace('Bearer ','');

    console.log("token" , token , req);

    if(!token) {
        res.status(401).json({res : false , message : "unAuthorized request "})
    }else{
        let data = jwt.verify(token , process.env.ACCESS_PRIVATE_KEY);
        let user = await User.findById(data._id);
        req.user = user ;
        next()
    }
}catch(err){
    res.status(401).json({res:false , message : err.message})
}
}

export default auth ;