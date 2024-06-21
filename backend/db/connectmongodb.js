const mongoose = require("mongoose");


const connectDB = async () => {
    try {
     await mongoose.connect(process.env.MONGO_URL);
     console.log("connected to mongodb")
    } catch (error) {
        console.log("databse not connect successfully: ",error.message)
    }  
}
module.exports = connectDB