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

MessageSchema.index({ createdAt: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 });


module.exports = mongoose.model("Messages", MessageSchema);





