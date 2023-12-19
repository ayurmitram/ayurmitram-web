const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
    {
        type: {
            type: String
        },
        message: {
            type: String
        },
        display: {
            type: String
        },
        timestamp: {
            type: Date,
            default: Date.now()
        }

    }
)


module.exports = mongoose.model("Messages", MessageSchema);





