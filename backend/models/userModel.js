const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    }
    ,
    userName: {
        type: String,
        required: true,
        unique: true
    }
    ,
    password: {
        type: String,
        required: true,
        minlength: 6
    }
    ,
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    profilePic: {
        type: String,
        default: ""
    }
    //by using this timeStamp mongoose can automatically ass
    // createdAt and updatedAt feild by using this 
    //we get the user's joining date 
},{timestamps:true})

const User = mongoose.model("User", userSchema)
module.exports = { User }