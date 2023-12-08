const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema(
    {
        patient_name: {
            type: String,
            required: true,
        },
        patient_email: {
            type: String,
            required: true,
        },
        patient_password: {
            type: String,
            required: true,
        }
    }
)

module.exports = mongoose.model("Patients", PatientSchema);