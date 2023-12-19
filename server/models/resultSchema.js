const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema(
    {
        vatta_percent: String,
        pitta_percent: String,
        kapha_percent: String,
        outcome: String,
        summary: String,
    }
)
resultSchema.index({ createdAt: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 }); 

module.exports = mongoose.model('Results', resultSchema);