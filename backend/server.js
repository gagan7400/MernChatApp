const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connectmongodb");

// Dotenv Import
require("dotenv").config();

//Variables
const PORT = process.env.PORT || 5000;
const app = express();

//Route Import
const authRoutes = require("./routes/auth.routes");
const messageRoute = require("./routes/message.routes.js");
const userRoute = require("./routes/user.routes.js");

//Middlewares
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);

// Server Calling 
app.listen(PORT, (err) => {
    connectDB()
    console.log(err || "suuccessfull run on " + PORT)
})