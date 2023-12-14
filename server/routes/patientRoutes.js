const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const PatientSchema = require("../models/patientSchema");

router.post('/signup', async (req, res) => {
   try {
    const {patient_name, patient_email, patient_password } = req.body;

    if(!patient_name || !patient_email || !patient_password) {
        return res.status(400).json({message: 'Please fill all the required details'});
    }
    console.log(patient_name, patient_email, patient_password)

    const existingUser = await PatientSchema.findOne({patient_email});
    if(existingUser){
        console.log(existingUser);
        return res.status(400).json({message: 'Email already exists. Please choose another email'});
    }

    const hashedPassword = await bcrypt.hash(patient_password, 10);
    const newPatient = new PatientSchema({
        patient_name,
        patient_email,
        patient_password: hashedPassword
    });

    await newPatient.save();

    const token=jwt.sign({patientId: newPatient._id}, process.env.SECRET_KEY, {expiresIn: '1h'});
    res.json({token});

   } catch (err) {
    console.log(err);
   }
})

router.post('/complete-profile', async (req, res) => {
  try {
    const {
      patientId,
      patient_age,
      patient_gender,
      patient_medical_history
    } = req.body;

    // Find the patient by ID
    const patient = await PatientSchema.findById(patientId);

    // If patient not found, return a 404 error
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Update patient details
    patient.patient_age = patient_age;
    patient.patient_gender = patient_gender;
    patient.patient_medical_history = patient_medical_history;

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
        const {patient_email, patient_password} = req.body;

        if(!patient_email || !patient_password) {
            return res.status(400).json({message: 'Please fill all the required details'});
        }

        const patient = await PatientSchema.findOne({patient_email});
        if(!patient) {
            return res.status(400).json({message: 'Invalid Email or Password'});
        }

        const isPasswordValid = await bcrypt.compare(patient_password, patient.patient_password);
        if(!isPasswordValid) {
            return res.status(400).json({message: 'Invalid Email or Password'});
        }

        const token=jwt.sign({patientId: patient._id}, process.env.SECRET_KEY, {expiresIn: '1h'});
        res.json({token});
    } catch(err) {
        console.log(err);
        res.status(500).json({message: 'Internal Server Error'});
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
