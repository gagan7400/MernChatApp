const mongoose = require("mongoose");


const ConversationSchema = new mongoose.Schema({
    participants: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
     messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            default:[],
        }
     ]
    //createdAt , updatedAt 
}, { timestamps: true })
//timestamps by the use of this mongoose
// can automaticaaly added the createdat
// and updatedat feild for us ,and we 
//can recive it in our frontend

const Conversation = mongoose.model("Conversation",ConversationSchema)
module.exports = {Conversation }