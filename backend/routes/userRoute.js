
const express=require("express")

const protuctedRoute=require("../middleware/protuctedRoute")

const  { getUsersForSidebar } = require("../controllers/userSidebarController")

const router = express.Router();

router.get("/",protuctedRoute, getUsersForSidebar);

module.exports=router