const express = require("express");
const { loginUser, signupUser, logoutUser, getUser } = require("../controllers/authcontroller");
const router = express.Router();

router.post("/login", loginUser)
router.post("/signup", signupUser)
router.post("/logout", logoutUser)
router.get("/getuser", getUser)


module.exports = router