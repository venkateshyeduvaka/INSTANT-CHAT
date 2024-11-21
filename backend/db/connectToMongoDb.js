const mongoose=require("mongoose")

const connectToMongoDb= async ()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("Connected to Database")

    } catch (error) {
        console.log("Error Connection to Database",error.message)
    }

}

module.exports=connectToMongoDb