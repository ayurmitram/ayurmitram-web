import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
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
import { setIsMinimized, setTabValue } from '../store/layout';
import { login_common } from '../controllers/loginRoutes';

const OnboardingDoctor = () => {
    const [details, setDetails] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async () => {}

    useEffect(() => {
        dispatch(setTabValue(11))
        dispatch(setIsMinimized(false))
    }, [])

    return (
        <div className="w-full h-full flex flex-col gap-5 p-5">
            <div className="text-2xl min-h-[2rem] flex items-center">
                Onboarding
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
                
                <Button variant="contained" className="w-full" color='secondary' sx={{ mb: 3 }} disableElevation onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
        </div>    
    )
}

export default OnboardingDoctor