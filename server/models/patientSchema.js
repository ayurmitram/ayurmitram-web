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
        patient_medical_history: [{
            blood_pressure: {
                high: String,
                low: String,
            },
            sugar_level: {
                before_food: String,
                after_food: String,
            },
            pulse_rate: String,
            temperature: String,
            sleep_hours: String,
            timestamp: {
                type: Date,
                default: Date.now,
            }
        }],
        prakriti_type: {
            type: String,
        }
        
    }
)

PatientSchema.index({ createdAt: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 });

module.exports = mongoose.model("Patients", PatientSchema);