const { Conversation } = require("../models/conversation.model");
const { Message } = require("../models/message.model");
const { getReceiverSocketid ,io } = require("../socket/socket");

let sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });
        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        // SOCKET IO FUNCTIONALITY  WILL GO HERE 
        const recieverSocketId = getReceiverSocketid(receiverId)

        if (recieverSocketId) {
            io.to(recieverSocketId).emit("newMessage", newMessage)
        }
        // this will run in parallel 
        await Promise.all([conversation.save(), newMessage.save()]);
        res.status(201).json(newMessage)
    } catch (error) {
        console.log("error in  sendmessages ", error.message)
        res.status(500).json({ error: "Internal server error", msg: error.message })
    }
};

let getMessages = async (req, res) => {
    try {

        const { id: userToChatId } = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages");// NOT REFERECE BUT ACTUAL MESSAGES
        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;
         
        res.status(200).json(messages)

    } catch (error) {
        console.log("error in get messages ", error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = { sendMessage, getMessages }