const express = require("express");
const { sendMessage ,getMessages } = require("../controllers/messageController.js");
const router = express.Router();
const { protectRoute } = require("../middleware/protectRoute.js")
router.get("/:id",protectRoute, getMessages)
router.post("/send/:id", protectRoute, sendMessage)


module.exports = router