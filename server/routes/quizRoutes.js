const express = require('express');
const router = express.Router();
const quizSchema = require('../models/quizSchema')

router.post('/addquestions', async (req, res) => {
    const {question, options} = req.body;

    try {
        let quiz = await quizSchema.findOne();
        if(!quiz){
            quiz = await quizSchema.create({questions: []});
        }

        quiz.questions.push({question, options});
        await quiz.save();

        res.json(quiz);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
});


router.get('/allquestions', async (req, res) => {
    try {
        const quiz = await quizSchema.findOne();
        if(!quiz){
            return res.status(404).json({error: "Quiz not found"})
        }

        const questions = quiz.questions;
        res.json(questions);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
})

module.exports = router;