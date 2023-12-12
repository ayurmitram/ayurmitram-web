const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8000;
const dotenv = require("dotenv");
dotenv.config();

const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const langchainRoutes = require("./routes/langchainRoutes");
try {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Connected to MongoDB");
    });
} catch (err) {
    console.log(err);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/predict", async (req, res) => {
    try {
        const { message } = req.body; // Extract the "message" from the request body
        console.log(message);

        const predictServerResponse = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({message: message}),
        });

        console.log('Response status:', predictServerResponse.status);

        if (!predictServerResponse.ok) {
            console.error('Request failed:', predictServerResponse.statusText);
            res.status(500).json({ error: 'Prediction request failed' });
            return;
        }

        const predictionData = await predictServerResponse.json();
        console.log('Prediction Data:', predictionData);

        // Send the prediction response back to the client
        res.json(predictionData);
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.use("/api/patient", patientRoutes);
app.use("/api/doctor", doctorRoutes);
app.use('/api/langchain', langchainRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
