const mongoose=require("mongoose")

const MessageSchema=new mongoose.Schema({
    senderid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    receiverid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    message:{
        type:String,
        required:true
    }
},
{ timestamps: true }
)

const messageModel=mongoose.model("message",MessageSchema)

module.exports=messageModel