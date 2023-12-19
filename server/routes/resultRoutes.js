const express = require("express");
const router = express.Router();

const resultSchema = require("../models/resultSchema");

router.post('/dets', async(req,res) =>{
    try {
        const { vatta_percent, pitta_percent, kapha_percent, outcome, summary } = req.body;

        const newResult = new resultSchema({
            vatta_percent,
            pitta_percent,
            kapha_percent,
            outcome,
            summary,
        });

        await newResult.save();

        res.status(201).json({ message: 'Details saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
  
})
module.exports = router;
