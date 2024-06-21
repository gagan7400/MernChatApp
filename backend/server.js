const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connectmongodb");
const path = require("path")
require("dotenv").config({path:path.join(__dirname,"../.env")});
// Dotenv Import

//Variables
const PORT = process.env.PORT || 5000;
const {app,server}  = require("./socket/socket.js")  


//Route Import
const authRoutes = require("./routes/auth.routes");
const messageRoute = require("./routes/message.routes.js");
const userRoute = require("./routes/user.routes.js");

 
//Middlewares
app.use(express.json());
app.use(cookieParser());
 app.use(express.static(path.join(__dirname,"../frontend/dist")))
app.get("/",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/dist/index.html"))
})
 
//Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);
 
// Server Calling 
server.listen(PORT, (err) => {
    connectDB()
    console.log(err || "suuccessfull run on " + PORT)
})