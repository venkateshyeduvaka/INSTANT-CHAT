const express=require("express")

const protuctedRoute=require("../middleware/protuctedRoute")

const {sendMessage,getMessage}=require("../controllers/messageController")

const router=express.Router()

router.post("/send/:id",protuctedRoute,sendMessage)
router.get("/:id",protuctedRoute,getMessage)

module.exports=router 
