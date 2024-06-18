const { User } = require("../models/userModel.js");

const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")
        // this line of code is use for the sidebar of screen 
        // $ne == not equal to this ,expect this find all the users 
        return res.status(200).json(filteredUsers)

    } catch (error) {
        console.log("error in getuserfor sidebar ", error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = { getUsersForSidebar }