const mongoose = require('mongoose');

const userAttemptSchema = mongoose.Schema({
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
      },
      userId: String,
      responses: [
        {
          question: String,
          selectedAnswer: String,
        },
      ],
})

module.exports = mongoose.model('UserAttempt', userAttemptSchema);