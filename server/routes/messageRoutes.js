const express = require("express");
const router = express.Router();
const moment = require('moment');

const MessageSchema = require("../models/messageSchema");

router.post("/create", async (req, res) => {
    try {
        const { type, message, display } = req.body;
        const newMessage = new MessageSchema({
            type,
            message,
            display,
        });

        await newMessage.save();
        res.status(201).json({ message: "Message created successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/all", async (req, res) => {
    try {
        const messages = await MessageSchema.find();
        const formattedMessages = messages.map(message => {
            return {
                ...message._doc,
                timestamp: moment(message.timeStamp).format("YYYY-MM-DD HH:mm:ss")
            };
        });
        res.status(200).json({ data: formattedMessages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
