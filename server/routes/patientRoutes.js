const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const PatientSchema = require("../models/patientSchema");
const DoctorSchema = require("../models/doctorSchema");


function encryptData(data) {
  if(data == undefined || data == null){
      return null;
  }
  const cipher = crypto.createCipher("aes-256-cbc", 'tempkey');
  let encrypted = cipher.update(String(data), "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

function decryptData(encryptedData) {
  const decipher = crypto.createDecipher('aes-256-cbc', 'tempkey');
  let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}


router.post('/signup', async (req, res) => {
  try {
    const { patient_name, patient_email, patient_password } = req.body;

    if (!patient_name || !patient_email || !patient_password) {
      return res.status(400).json({ message: 'Please fill all the required details' });
    }
    console.log(patient_name, patient_email, patient_password)

    const existingUser = await PatientSchema.findOne({ patient_email }) || await DoctorSchema.findOne({ doctor_email: patient_email });
    if (existingUser) {
      console.log(existingUser);
      return res.status(400).json({ message: 'Email already exists. Please choose another email' });
    }

    const hashedPassword = await bcrypt.hash(patient_password, 10);

    const encryptedName = encryptData(patient_name);
    const encryptedEmail = encryptData(patient_email);

    const newPatient = new PatientSchema({
      patient_name: encryptedName,
      patient_email: encryptedEmail,
      patient_password: hashedPassword,
    });

    await newPatient.save();

    const token = jwt.sign({ patientId: newPatient._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });

  } catch (err) {
    console.log(err);
  }
})


router.post('/getpatient', async (req, res) => {
  try {
    const { patientId } = req.body;

    // Find the patient by ID
    const patient = await PatientSchema.findById(patientId);

    // If patient not found, return a 404 error
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Send the patient details as the response
    res.json({ patient });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

router.post('/complete-profile', async (req, res) => {
  try {
    const {
      patientId,
      patient_age,
      patient_gender,
      patient_medical_history,
      prakriti_type
    } = req.body;

    // Find the patient by ID
    const patient = await PatientSchema.findById(patientId);

    // If patient not found, return a 404 error
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const encryptedAge = encryptData(patient_age);
        const encryptedGender = encryptData(patient_gender);
        // const encryptedMedicalHistory = encryptData(patient_medical_history);
        const encryptedPrakritiType = encryptData(prakriti_type);


    // Update patient details
    patient.patient_age = encryptedAge;
    patient.patient_gender = encryptedGender;
    if (Array.isArray(patient_medical_history)) {
      // Assuming you want to add the new medical history to the existing array
      patient.patient_medical_history = [...patient.patient_medical_history, ...patient_medical_history];
    }
    patient.prakriti_type = encryptedPrakritiType

    // Save the updated patient profile
    await patient.save();

    // Send a success message
    res.json({ message: 'Profile completed successfully' });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    let { patient_email, patient_password } = req.body;

    if (!patient_email || !patient_password) {
      return res.status(400).json({ message: 'Please fill all the required details' });
    }
    patient_email = encryptData(patient_email)

    const patient = await PatientSchema.findOne({ patient_email });
    if (!patient) {
      return res.status(400).json({ message: 'Invalid Email or Password' });
    }

    const isPasswordValid = await bcrypt.compare(patient_password, patient.patient_password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid Email or Password' });
    }

    const token = jwt.sign({ patientId: patient._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

router.post('/auth', async (req, res) => {
  const token = req.body.token;

  try {
    if (!token) {
      return res.status(401).json({ error: 'Token not provided' });
    }
    //   console.log(token);

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.patientId;

    const patient = await PatientSchema.findById(userId);
    console.log(patient);

    if (!patient) {
      return res.status(401).json({ error: 'Patient not found' });
    }


    return res.json({ message: `Authenticated user: ${userId}`, tag: true, patient });
  } catch (error) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
});



module.exports = router;
