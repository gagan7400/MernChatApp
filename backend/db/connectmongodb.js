const mongoose = require("mongoose");


const connectDB = async () => {
    try {
     await mongoose.connect(process.env.MONGO_URL);
     console.log("connected to mongodb")
    } catch (error) {
        console.log(error.message)
    }  
}
module.exports = connectDB