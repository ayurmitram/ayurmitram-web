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
        },
        doctor_consultant_type:{
            type: String
        },
        doctor_specialization: {
            type: String
        },
        doctor_experience: {
            type: String
        },
        doctor_description: {
            type: String
        },
        doctor_education: {
            type: String
        },
        doctor_clinic_name: {
            type: String
        },
        doctor_clinic_address: {
            type: String
        },
        doctor_contact_number: {
            type: String
        },
        doctor_languages_spoken: {
            type: [String]
        },
        doctor_availability: {
            type: String
        },
        doctor_preferred_comm: {
            type: [String]
        },
        doctor_area_of_expertise: {
            type: [String]
        },
        doctor_website: {
            type: String
        },
        prakriti_type: {
            type: String
        }

    }
)

DoctorSchema.index({ createdAt: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 });

module.exports = mongoose.model("Doctors", DoctorSchema);