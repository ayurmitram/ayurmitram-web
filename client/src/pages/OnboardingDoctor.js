import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';

import google from './../assets/google.svg'
import facebook from './../assets/facebook.svg'
import apple from './../assets/apple.svg'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setIsMinimized, setShowTabs, setTabValue } from '../store/layout';
import { doctor_profile_completion } from '../controllers/doctorRoutes';
import { login_common } from '../controllers/commonRoutes';

export const languages = [
    'English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Urdu', 'Gujarati', 'Kannada', 'Odia', 'Malayalam', 'Punjabi', 'Assamese', 'Maithili', 'Sanskrit', 'Santali', 'Kashmiri', 'Nepali', 'Sindhi', 'Konkani', 'Dogri', 'Manipuri', 'Bodo', 'Santhali', 'Other'
]
export const mode_of_communications = [
    'Video Call', 'Audio Call', 'Chat', 'Email', 'In Person', 'Other'
]
export const area_of_expertise = [
    'Allergy & Immunology', 'Anesthesiology', 'Dermatology', 'Diagnostic Radiology', 'Emergency Medicine', 'Family Medicine', 'Internal Medicine', 'Medical Genetics', 'Neurology', 'Nuclear Medicine', 'Obstetrics & Gynecology', 'Ophthalmology', 'Pathology', 'Pediatrics', 'Physical Medicine & Rehabilitation', 'Preventive Medicine', 'Psychiatry', 'Radiation Oncology', 'Surgery', 'Urology', 'Other'
]

const OnboardingDoctor = () => {
    const [details, setDetails] = useState({})
    const [snackbarDets, setSnackbarDets] = useState({ open: false, message: '', severity: 'success' })

    const user = useSelector(state => state.user.details)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleMultiSelect = (field, value) => {
        setDetails({
            ...details,
            [field]: typeof value === 'string' ? value.split(',') : value,
        })
    }
    
    const handleSubmit = async () => {
        if (!details) return
        if (user?._id) {
            const ans = await doctor_profile_completion({
                doctorId: user?._id,
                doctor_consultant_type: details?.consultant_type,
                doctor_specialization: details?.specialization,
                doctor_experience: details?.experience,
                doctor_description: details?.description,
                doctor_education: details?.education,
                doctor_clinic_name: details?.clinic_name,
                doctor_clinic_address: details?.clinic_address,
                doctor_contact_number: details?.contact_number,
                doctor_languages_spoken: details?.languages ?? [],
                doctor_availability: details?.availability,
                doctor_preferred_comm: details?.communication ?? [],
                doctor_area_of_expertise: details?.expertise ?? [],
                doctor_website: details?.website,
            })
            if (ans) {
                navigate('/')
                return 
            }
        }
        setSnackbarDets({ open: true, message: 'Something went wrong', severity: 'error' })
    }

    useEffect(() => {
        dispatch(setTabValue(11))
        window.innerWidth < 1024 && dispatch(setShowTabs(false))
        dispatch(setIsMinimized(false))
    }, [])

    return (
        <div className="w-full h-full flex flex-col gap-5 p-5">
            <Snackbar open={snackbarDets?.open} autoHideDuration={6000} onClose={() => setSnackbarDets({ ...snackbarDets, open: false })}>
                <MuiAlert onClose={() => setSnackbarDets({ ...snackbarDets, open: false })} severity={snackbarDets?.severity} sx={{ width: '100%' }}>
                    {snackbarDets?.message}
                </MuiAlert>
            </Snackbar>

            <div className="text-2xl min-h-[2rem] flex items-center">
                Onboarding
                <div className="lg:hidden ms-auto cursor-pointer"><MenuRoundedIcon onClick={() => { dispatch(setShowTabs(true)) }} /></div>
            </div>
            <div className='w-full h-[0px] bg-black/50 '></div>

            <div className="px-10 flex flex-col overflow-y-auto">
                <div className="text-xl mb-4">We need a few details</div>
                <div className="text-[#9E9E9E] text-sm mb-3">please fill in best to your knowledge</div>
                <TextField
                    label="Description"
                    type='text'
                    value={details?.description}
                    onChange={(e) => setDetails({ ...(details ?? {}), description: e.target.value })}
                    variant="standard"
                    className="w-full"
                    sx={{ mb: 3 }}
                    color='secondary'
                />
                <TextField
                    label="Specialization"
                    type='text'
                    value={details?.specialization}
                    onChange={(e) => setDetails({ ...(details ?? {}), specialization: e.target.value })}
                    variant="standard"
                    className="w-full"
                    sx={{ mb: 3 }}
                    color='secondary'
                />
                <TextField
                    label="Consultant Type"
                    type='text'
                    value={details?.consultant_type}
                    onChange={(e) => setDetails({ ...(details ?? {}), consultant_type: e.target.value })}
                    variant="standard"
                    className="w-full"
                    sx={{ mb: 3 }}
                    color='secondary'
                />
                <TextField
                    label='Experience'
                    type='number'
                    value={details?.experience}
                    onChange={(e) => setDetails({ ...(details ?? {}), experience: e.target.value })}
                    variant='standard'
                    className='w-full'
                    sx={{ mb: 3 }}
                    color='secondary'
                    inputProps={{
                        min: 0, max: 100, step: 0.1
                    }}
                    InputProps={{
                        endAdornment: 'years'
                    }}
                />
                <TextField
                    label="Education"
                    type='text'
                    value={details?.education}
                    onChange={(e) => setDetails({ ...(details ?? {}), education: (e.target.value >= 0 && e.target.value <= 100) ? e.target.value : details?.education })}
                    variant="standard"
                    className="w-full"
                    sx={{ mb: 3 }}
                    color='secondary'
                />
                <TextField
                    label="Clinic Name"
                    type='text'
                    value={details?.clinic_name}
                    onChange={(e) => setDetails({ ...(details ?? {}), clinic_name: e.target.value })}
                    variant="standard"
                    className="w-full"
                    sx={{ mb: 3 }}
                    color='secondary'
                />
                <TextField
                    label="Clinic Address"
                    type='text'
                    value={details?.clinic_address}
                    onChange={(e) => setDetails({ ...(details ?? {}), clinic_address: e.target.value })}
                    variant="standard"
                    className="w-full"
                    sx={{ mb: 3 }}
                    color='secondary'
                />
                <TextField
                    label="Contact Number"
                    type='number'
                    value={details?.contact_number}
                    onChange={(e) => setDetails({ ...(details ?? {}), contact_number: e.target.value < 10000000000 ? e.target.value : details?.contact_number })}
                    variant="standard"
                    className="w-full"
                    sx={{ mb: 3 }}
                    color='secondary'
                    InputProps={{
                        startAdornment: <div>+91&nbsp;</div>
                    }}
                />
                <FormControl variant='standard' color='secondary' fullWidth sx={{ mb: 3 }}>
                    <InputLabel id="languages" color='secondary'>Languages Spoken</InputLabel>
                    <Select
                        labelId="languages"
                        id="languages"
                        fullWidth
                        multiple
                        value={details?.languages || []}
                        onChange={(e) => handleMultiSelect('languages', e.target.value)}
                        color='secondary'
                    >
                        {languages.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Availability"
                    type='text'
                    value={details?.availability}
                    onChange={(e) => setDetails({ ...(details ?? {}), availability: e.target.value })}
                    variant="standard"
                    className="w-full"
                    sx={{ mb: 3 }}
                    color='secondary'
                />
                <FormControl variant='standard' color='secondary' fullWidth sx={{ mb: 3 }}>
                    <InputLabel id="mode_of_communication" color='secondary'>Preferred Mode of Communication</InputLabel>
                    <Select
                        labelId="mode_of_communication"
                        id="mode_of_communication"
                        fullWidth
                        multiple
                        value={details?.communication || []}
                        onChange={(e) => handleMultiSelect('communication', e.target.value)}
                        color='secondary'
                    >
                        {mode_of_communications.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant='standard' color='secondary' fullWidth sx={{ mb: 3 }}>
                    <InputLabel id="area_of_expertise" color='secondary'>Area of Expertise</InputLabel>
                    <Select
                        labelId="area_of_expertise"
                        id="area_of_expertise"
                        fullWidth
                        multiple
                        value={details?.expertise || []}
                        onChange={(e) => handleMultiSelect('expertise', e.target.value)}
                        color='secondary'
                    >
                        {area_of_expertise.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Website"
                    type='text'
                    value={details?.website}
                    onChange={(e) => setDetails({ ...(details ?? {}), website: e.target.value })}
                    variant="standard"
                    className="w-full"
                    sx={{ mb: 3 }}
                    color='secondary'
                />

                <Button variant="contained" className="w-full" color='secondary' disableElevation onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
        </div>    
    )
}

export default OnboardingDoctor