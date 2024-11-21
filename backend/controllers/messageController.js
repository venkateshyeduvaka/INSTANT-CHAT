
const conversionModel=require("../models/conversionModel")
const messageModel = require("../models/messageModel")
const { getReceiverSocketId,io } = require("../socket/socket")



const sendMessage=async (req,res)=>{
    try {
        const {message}=req.body 
        const {id:receiverid}=req.params
        const senderid=req.user._id

        let conversation=await conversionModel.findOne({
            participants:{$all:[senderid,receiverid]}
        })

        if(!conversation){
            conversation=await conversionModel.create({
                participants:[senderid,receiverid]
            })
        }

        const newMessage=new messageModel({
            senderid,
            receiverid,
            message,
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        //SOCKET FUNCTIONALIY IMPLEMENTACTION

        const receiverSocketId = getReceiverSocketId(receiverid);
        if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}
        res.status(201).json(newMessage);
        
    } catch (error) {
        console.log("Error in SendMessage controller",error.message)
        res.status(400).send({error: "Internal Server Error" })
    }


}



const getMessage=async(req,res)=>{

    try {

        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await conversionModel.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

		res.status(200).json(messages);

        
    } catch (error) {
        console.log("Error in Get Message controller",error.message)
        res.status(400).send({error: "Internal Server Error" })
    }
}

module.exports={sendMessage,getMessage}