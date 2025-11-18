import jwt from "jsonwebtoken"

const isAuth = async(req,res,next)=>{
    try {
        const token = req.cookies?.token;
        if(!token){
            return res.status(400).json({message: "Token is not found"});

        }
        const verifyToken = jwt.verify(token,process.env.JWT_SECRET || "This is JWT Secret");

        req.userId = verifyToken.userId;
        // console.log("req UserId",req.userId);
        next()
    } catch (error) {
        return res.status(500).json({message:"isAuth error",error})
    }
}
export default isAuth;