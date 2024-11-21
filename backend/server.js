
const express=require("express");
const cors=require("cors")
const dotenv = require("dotenv");

const cookieParser=require("cookie-parser")
//const dotenv=require("dotenv")

const authRoute=require("./routes/autnRoutes")
const messageRoute=require("./routes/messageRoute")
const userRoute=require("./routes/userRoute")

const connectToMongoDb=require("./db/connectToMongoDb")

const {app,server} =require("./socket/socket")

dotenv.config()

//const app=express();



app.use(
    cors({
      origin: "http://localhost:3004",
      credentials: true,
    })
  );

app.use(express.json())
app.use(cookieParser())




const PORT=process.env.PORT || 5001


app.use("/api/auth",authRoute)
app.use("/api/message",messageRoute)
app.use("/api/users",userRoute)


app.get("/",(req,res)=>{
    res.send("HELLOW WORLD")
})



connectToMongoDb().then(()=>{
        server.listen(PORT,()=>{
            console.log(`Server is Runnning ${PORT}`)
        })
    })   
  