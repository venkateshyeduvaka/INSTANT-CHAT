


const jwt=require("jsonwebtoken")
const userModel=require("../models/userModel")

const protuctedRoute=async (req,res,next)=>{
      
   try {

    //console.log("Cookies received on backend:", req.cookies.jwt_token); 
    const token = req.cookies.jwt_token;
     
    if (!token) {
        throw Error("Unauthorized: you need to login first");
      }

     const decoded = jwt.verify(token, process.env.SECREATE_KEY);
      if (!decoded) {
        throw Error("Unauthorized: Invalid token");
      }
  
      const user = await userModel.findById(decoded.userId).select("-password");
      if (!user) {
        throw Error("User not found");
      }
  
      req.user = user;
      next();

   } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
   }

}

module.exports=protuctedRoute