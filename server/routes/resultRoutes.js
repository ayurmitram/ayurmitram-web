const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const resultSchema = require("../models/resultSchema");

const secretKey = "tempkey";


function encryptData(data) {
    if(data == undefined || data == null){
        return null;
    }
    const cipher = crypto.createCipher("aes-256-cbc", secretKey);
    let encrypted = cipher.update(String(data), "utf-8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}

function decryptData(encryptedData) {
    const decipher = crypto.createDecipher('aes-256-cbc', process.env.CYPHER_KEY);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}



router.post('/dets', async(req,res) =>{
    try {
        const { vatta_percent, pitta_percent, kapha_percent, outcome, summary } = req.body;

        const encryptedVattaPercent = encryptData(vatta_percent);
        const encryptedPittaPercent = encryptData(pitta_percent);
        const encryptedKaphaPercent = encryptData(kapha_percent);
        const encryptedOutcome = encryptData(outcome);
        const encryptedSummary = encryptData(summary);

        const newResult = new resultSchema({
            vatta_percent: encryptedVattaPercent,
            pitta_percent: encryptedPittaPercent,
            kapha_percent: encryptedKaphaPercent,
            outcome: encryptedOutcome,
            summary: encryptedSummary,
        });

        await newResult.save();

        res.status(201).json({ message: 'Details saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
  
})

router.get('/all', async (req, res) => {
    const results = await resultSchema.find();

    const decryptedResults = results.map(result => {
        return {
          vatta_percent: decryptData(result.vatta_percent),
          pitta_percent: decryptData(result.pitta_percent),
          kapha_percent: decryptData(result.kapha_percent),
          outcome: result.outcome,
          summary: decryptData(result.summary),
        };
      });

      res.json(decryptedResults);

})




module.exports = router;
