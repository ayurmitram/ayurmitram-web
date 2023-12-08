const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv');
dotenv.config();


const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
try {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('Connected to MongoDB');
    });
} catch (err) {
    console.log(err);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/patient', patientRoutes);
app.use('/api/doctor', doctorRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})