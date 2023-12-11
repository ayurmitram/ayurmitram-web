const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const DoctorSchema = require("../models/doctorSchema");

router.post('/signup', async (req, res) => {
   try {
    const {doctor_name, doctor_email, doctor_password } = req.body;

    if(!doctor_name || !doctor_email || !doctor_password) {
        return res.status(400).json({message: 'Please fill all the required details'});
    }
    console.log(doctor_name, doctor_email, doctor_password)

    const existingUser = await DoctorSchema.findOne({doctor_email});
    if(existingUser){
        console.log(existingUser);
        return res.status(400).json({message: 'Email already exists. Please choose another email'});
    }

    const hashedPassword = await bcrypt.hash(doctor_password, 10);
    const newDoctor = new DoctorSchema({
        doctor_name,
        doctor_email,
        doctor_password: hashedPassword
    });

    await newDoctor.save();

    const token=jwt.sign({patientId: newDoctor._id}, process.env.SECRET_KEY, {expiresIn: '2h'});
    res.json({token});

   } catch (err) {
    console.log(err);
   }
})

router.post('/login', async (req, res) => {
    try {
        const {doctor_email, doctor_password} = req.body;

        if(!doctor_email || !doctor_password) {
            return res.status(400).json({message: 'Please fill all the required details'});
        }

        const doctor = await DoctorSchema.findOne({doctor_email});
        if(!doctor) {
            return res.status(400).json({message: 'Invalid Email or Password'});
        }

        const isPasswordValid = await bcrypt.compare(doctor_password, doctor.doctor_password);
        if(!isPasswordValid) {
            return res.status(400).json({message: 'Invalid Email or Password'});
        }

        const token=jwt.sign({doctorId: doctor._id}, process.env.SECRET_KEY, {expiresIn: '2h'});
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
      console.log(decoded);
      const userId = decoded.doctorId;
  
      const doctor = await DoctorSchema.findById(userId);
  
      if (!doctor) {
        return res.status(401).json({ error: 'Doctor not found' });
      }
  

      return res.json({ message: `Authenticated user: ${userId}`, tag: true });
    } catch (error) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
  });

router.get('/alldoctors', async (req, res) => {
  try {
    const doctors = await DoctorSchema.find();
    res.json(doctors);
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;
