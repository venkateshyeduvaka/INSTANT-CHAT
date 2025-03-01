const mongoose=require("mongoose")

const ConversionSchema=new mongoose.Schema(
    {
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "users",
			},
		],
		messages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "message",
				default: [],
			},
		],
	},
	{ timestamps: true }
)

const conversionModel=mongoose.model("conversation",ConversionSchema)

module.exports=conversionModel