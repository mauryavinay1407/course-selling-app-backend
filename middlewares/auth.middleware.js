const {asyncHandler}=require("../utils/asyncHandler");
const jwt=require("jsonwebtoken");
const {User}=require("../models/user.model")


const verifyjwt=asyncHandler(async(req,res,next)=>{
    try {
        const token=req.cookies?.token;
        if(!token)
        throw new Error("Unauthorized request");
    
        const decoded=await jwt.verify(token,process.env.SECRET_KEY);
        
        const user= await User.findById(decoded.id);
        if(!user)
        throw new Error("Invalid access token")
    
        next()     
    } catch (error) {
        throw new Error(error)
    }
   
})


module.exports={verifyjwt} ;