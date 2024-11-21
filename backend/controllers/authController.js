
const bcryptjs =require("bcryptjs")
const userModel=require("../models/userModel")
const generateAndSetCookie=require("../utils/generateAndSetCookie")


const signup= async (req,res)=>{
    try {
        const {fullname,username,password,gender,confirmpassword}=req.body 

        if(password!==confirmpassword){
            res.status(400).json({error:"Password don't match"})
        }

        const user=await userModel.findOne({username})

        if(user){
            res.status(400).send({error:"User already exist"})
        }

        else{
            const salt= await bcryptjs.genSalt(10)
            const hashedpassword=await bcryptjs.hash(password,salt)

    
            const boyprofile=`https://avatar.iran.liara.run/public/boy?username=${username}`
            const girlprofile=`https://avatar.iran.liara.run/public/girl?username=${username}`

            const newuser= new userModel({
                fullname,
                username,
                password:hashedpassword,
                gender,
                profilepic:gender==="male"?boyprofile:girlprofile
            })

            if(newuser){
            
                generateAndSetCookie(newuser._id,res)
            
                await newuser.save()


                res.status(200).json({
                _id:newuser._id,
                fullname:newuser.fullname,
                username:newuser.username,
                profilepic:newuser.profilepic
                })
            }
            else{
                res.status(400).json({ error: "Invalid user data" });
            }
        }    


    } catch (error) {

        console.log("error in Signup Controller")
        res.status(500).send({error:"internal server Error"})
        
    }
}


const login=async(req,res)=>{
    try {
        const {username,password}=req.body 
        const user=await userModel.findOne({username})
        const ispasswordcorrect= await bcryptjs.compare(password,user?.password || "")

        if(!user || !ispasswordcorrect){
            //console.log("check--1")
            throw new Error("Invalid username or password")
            //res.status(400).send({error: "Invalid username or password" })
        }
        else{
        generateAndSetCookie(user._id,res)
        res.status(200).json({
            _id:user._id,
            fullname:user.fullname,
            username:user.username,
            profilepic:user.profilepic 
        })

    }

    } catch (error) {

        console.log("Error in login controller",error.message)
        //res.status(400).send({error: "Internal Server Error" })
        res.status(400).send({error: "Invalid username or password" })
        
    }

}

const logout=async (req,res)=>{
    try {
        res.cookie("jwt_token", "", {
            maxAge: 0,
            httpOnly: true,
            sameSite: "lax",
            secure: true,
          });
        //res.cookie("jwt_token", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
        
    } catch (error) {
        console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}


module.exports={login,signup,logout}