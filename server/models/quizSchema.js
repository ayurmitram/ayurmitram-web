const mongoose = require('mongoose');


const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true
    }
});

const QuizSchema = new mongoose.Schema({
    questions: [QuestionSchema]
});

module.exports = mongoose.model("Quiz", QuizSchema);