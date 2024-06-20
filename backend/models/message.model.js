const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required: true
    }
    //createdAt , updatedAt 
},
    { timestamps: true }
)
//timestamps by the use of this mongoose
// can automaticaaly added the createdat
// and updatedat feild for us ,and we 
//can recive it in our frontend

const Message = mongoose.model("Message", messageSchema)
module.exports = { Message } 