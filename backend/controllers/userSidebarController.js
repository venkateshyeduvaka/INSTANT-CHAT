const userModel=require("../models/userModel")

const getUsersForSidebar=async(req,res)=>{
    try {
       
        const loggedInUserId = req.user._id;

		const filteredUsers = await userModel.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }
}



module.exports={getUsersForSidebar}