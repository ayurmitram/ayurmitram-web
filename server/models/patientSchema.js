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
        },
        patient_age: {
            type: String,
        },
        patient_gender: {
            type: String,
        },
        patient_medical_history: {
            type: String,
        }
        
    }
)

module.exports = mongoose.model("Patients", PatientSchema);