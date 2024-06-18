let { User } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateTokenAndSetCookie } = require("../utils/genratetoken");
let signupUser = async (req, res) => {
    try {
        const { fullName, userName, password, confimPassword, gender } = req.body;
        if (password !== confimPassword) {
            return res.status(404).json({ error: "password and confirm password does not match" })
        }
        const user = await User.findOne({ userName });
        if (user) {
            return res.status(404).json({ error: "UserName already exixts" })
        }
        //hash password here
        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(password, salt);
        //https://avatar.iran.liara.run/public/boy?username=gagan
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser = new User({
            fullName,
            userName,
            password: hashPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })
        if (newUser) {
            //Generate jwt token here 
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();
            res.status(201).json({ _id: newUser._id, fullName: newUser.fullName, userName: newUser.userName, profilePic: newUser.profilePic });
        } else {
            return res.status(400).json({ error: "Invalid user data " })
        }

    } catch (error) {
        console.log("error occur in singup controller", error.message)
        res.status(500).json({ "error": "Internal Server Error" })
    }
}


let loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")
        if (!user || !isPasswordCorrect) {
            return res.status(404).json({ error: "Invalid credentials" })
        }
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log("error occur in login controller", error.message)
        res.status(500).json({ "error": "Internal Server Error" })
    }
}







let logoutUser = async (req, res) => {
    try {
  res.cookie("jwt","",{maxAge:0});
  res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        console.log("error occur in logout controller", error.message)
        res.status(500).json({ "error": "Internal Server Error" })
    }
}

















let getUser = async (req, res) => {
    try {
        const data = await User.aggregate([
            { $group: { _id: "$fullName", totalUsers: { $sum: 1 } } }
        ])
        res.send(data)
    } catch (error) {
        res.send({ "msg": "error", result: error })
    }
}


module.exports = { loginUser, signupUser, logoutUser, getUser }