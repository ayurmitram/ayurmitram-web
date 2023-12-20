const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

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

function decryptArray(encryptedArray) {
  if (!encryptedArray || !Array.isArray(encryptedArray)) {
      return encryptedArray;
  }

  return encryptedArray.map(item => decryptData(item));
}



router.post('/signup', async (req, res) => {
   try {
    let {doctor_name, doctor_email, doctor_password } = req.body;

    if(!doctor_name || !doctor_email || !doctor_password) {
        return res.status(400).json({message: 'Please fill all the required details'});
    }

    doctor_name = encryptData(doctor_name);
    doctor_email = encryptData(doctor_email);

    
    // console.log(doctor_name, doctor_email, doctor_password)

    const existingUser = await DoctorSchema.findOne({doctor_email}) || await DoctorSchema.findOne({patient_email: doctor_email})
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

    const token=jwt.sign({doctorId: newDoctor._id}, process.env.SECRET_KEY, {expiresIn: '2h'});
    res.json({token, doctor: newDoctor});

   } catch (err) {
    console.log(err);
   }
})

router.post('/complete-profile', async (req, res) => {
  try {
      const {
          doctorId,
          doctor_consultant_type,
          doctor_specialization,
          doctor_experience,
          doctor_description,
          doctor_education,
          doctor_clinic_name,
          doctor_clinic_address,
          doctor_contact_number,
          doctor_languages_spoken,
          doctor_availability,
          doctor_preferred_comm,
          doctor_area_of_expertise,
          doctor_website
      } = req.body;

      const doctor = await DoctorSchema.findById(doctorId);
      if (!doctor) {
          return res.status(404).json({ message: 'Doctor not found' });
      }

      doctor.doctor_consultant_type = encryptData(doctor_consultant_type);
      doctor.doctor_specialization = encryptData(doctor_specialization);
      doctor.doctor_experience = encryptData(doctor_experience);
      doctor.doctor_description = encryptData(doctor_description);
      doctor.doctor_education = encryptData(doctor_education);
      doctor.doctor_clinic_name = encryptData(doctor_clinic_name);
      doctor.doctor_clinic_address = encryptData(doctor_clinic_address);
      doctor.doctor_contact_number = encryptData(doctor_contact_number);
      doctor.doctor_languages_spoken = encryptData(doctor_languages_spoken);
      doctor.doctor_availability = encryptData(doctor_availability);
      doctor.doctor_preferred_comm = encryptData(doctor_preferred_comm);
      doctor.doctor_area_of_expertise = encryptData(doctor_area_of_expertise);
      doctor.doctor_website = encryptData(doctor_website);

      await doctor.save();

      res.json({ message: 'Profile completed successfully' });

  } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
    try {
        const {doctor_email, doctor_password} = req.body;

        if(!doctor_email || !doctor_password) {
            return res.status(400).json({message: 'Please fill all the required details'});
        }

        doctor_email = encryptData(doctor_email)

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
    const decryptedDoctors = doctors.map(doc => {
      return {
        doctor_consultant_type: decryptData(doc.doctor_consultant_type),
        doctor_specialization: decryptData(doc.doctor_specialization),
        doctor_experience: decryptData(doc.doctor_experience),
        doctor_description: decryptData(doc.doctor_description),
        doctor_education: decryptData(doc.doctor_education),
        doctor_clinic_name: decryptData(doc.doctor_clinic_name, ),
        doctor_clinic_address: decryptData(doc.doctor_clinic_address),
        doctor_contact_number: decryptData(doc.doctor_contact_number ),
        doctor_languages_spoken: decryptArray(doc.doctor_languages_spoken),
        doctor_availability: decryptData(doc.doctor_availability),
        doctor_preferred_comm: decryptArray(doc.doctor_preferred_comm),
        doctor_area_of_expertise: decryptArray(doc.doctor_area_of_expertise),
        doctor_website: decryptData(doc.doctor_website),
      }
    });
    
    
    res.json(decryptedDoctors);
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;
