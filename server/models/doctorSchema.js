const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema(
    {
        doctor_name: {
            type: String,
            required: true,
        },
        doctor_email: {
            type: String,
            required: true,
        },
        doctor_password: {
            type: String,
            required: true,
        }
    }
)

module.exports = mongoose.model("Doctors", DoctorSchema);