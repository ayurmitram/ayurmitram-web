import TextField from '@mui/material/TextField';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Button from '@mui/material/Button';

import google from './../assets/google.svg'
import facebook from './../assets/facebook.svg'
import apple from './../assets/apple.svg'
import smiley from './../assets/logo-smiley.svg'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setIsMinimized, setTabValue } from '../store/layout';
import { signup_patient } from '../controllers/patientRoutes';
import { signup_doctor } from '../controllers/doctorRoutes';

const Signup = () => {

    const [typeOfUser, setTypeOfUser] = useState('')
    const [credentials, setCredentails] = useState(null)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmationPasswordVisible, setConfirmationPasswordVisible] = useState(false)
    const isMinimized = useSelector(state => state.layout.isMinimized)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSignup = async () => {
        if (typeOfUser === 'patient') {
            const res = await signup_patient({
                patient_name: credentials?.username,
                patient_email: credentials?.email,
                patient_password: credentials?.password
            })
            // console.log(res, 'signup')
            if (res?.token) {
                localStorage.setItem('token', res?.token)
                localStorage.setItem('typeOfUser', 'patient')
                navigate('/')
                dispatch(setTabValue(0))
            }
        } else if (typeOfUser === 'doctor') {
            const res = await signup_doctor({
                doctor_name: credentials?.username,
                doctor_email: credentials?.email,
                doctor_password: credentials?.password
            })
            // console.log(res, 'signup')
            if (res?.token) {
                localStorage.setItem('token', res?.token)
                localStorage.setItem('typeOfUser', 'doctor')
                navigate('/')
                dispatch(setTabValue(0))
            }
        }
    }

    useEffect(() => {
        if (typeOfUser === '') {
            dispatch(setIsMinimized(true))
        } else {
            dispatch(setIsMinimized(false))
        }
    }, [typeOfUser])

    return (
        typeOfUser !== '' ? (
            <div className="w-full h-full flex flex-col gap-5">
                <div className="text-2xl min-h-[2rem] max-h-[2rem] flex items-center">
                    <Button variant="outlined" className="" color='lightGray' disableElevation onClick={() => setTypeOfUser('')}>
                        <ArrowBackRoundedIcon color='secondary' className='mr-2' />
                    </Button>
                    Sign Up
                </div>
                <div className='w-full h-[0px] bg-black/50 '></div>

                <div className="px-10 flex flex-col overflow-y-auto">
                    <div className="text-xl mb-4">Welcome here</div>
                    <div className="text-[#9E9E9E] text-sm mb-3">please enter your email and password to sign up</div>
                    <TextField
                        label="Username"
                        type='text'
                        value={credentials?.username}
                        onChange={(e) => setCredentails({ ...(credentials ?? {}), username: e.target.value })}
                        variant="standard"
                        className="w-full"
                        sx={{ mb: 3 }}
                        color='secondary'
                    />
                    <TextField
                        label="Email"
                        type='email'
                        value={credentials?.email}
                        onChange={(e) => setCredentails({ ...(credentials ?? {}), email: e.target.value })}
                        variant="standard"
                        className="w-full"
                        sx={{ mb: 3 }}
                        color='secondary'
                        InputProps={{
                            endAdornment: <EmailOutlinedIcon sx={{ stroke: "#fff", strokeWidth: 1, color: '#CACACA' }} />
                        }}
                    />
                    <TextField
                        label="Password"
                        type={passwordVisible ? 'text' : 'password'}
                        value={credentials?.password}
                        onChange={(e) => setCredentails({ ...(credentials ?? {}), password: e.target.value })}
                        variant="standard"
                        className="w-full"
                        sx={{ mb: 3 }}
                        color='secondary'
                        InputProps={{
                            endAdornment: passwordVisible 
                                ? <VisibilityOutlinedIcon className='cursor-pointer' sx={{ stroke: "#fff", strokeWidth: 1, color: '#CACACA' }} onClick={() => setPasswordVisible(false)} /> 
                                : <VisibilityOffOutlinedIcon className='cursor-pointer' sx={{ stroke: "#fff", strokeWidth: 1, color: '#CACACA' }} onClick={() => setPasswordVisible(true)} />
                        }}
                    />
                    <TextField
                        label="Confirm Password"
                        type={confirmationPasswordVisible ? 'text' : 'password'}
                        value={credentials?.confirmationPassword}
                        onChange={(e) => setCredentails({ ...(credentials ?? {}), confirmationPassword: e.target.value })}
                        variant="standard"
                        className="w-full"
                        sx={{ mb: 3 }}
                        color='secondary'
                        InputProps={{
                            endAdornment: confirmationPasswordVisible
                                ? <VisibilityOutlinedIcon className='cursor-pointer' sx={{ stroke: "#fff", strokeWidth: 1, color: '#CACACA' }} onClick={() => setConfirmationPasswordVisible(false)} />
                                : <VisibilityOffOutlinedIcon className='cursor-pointer' sx={{ stroke: "#fff", strokeWidth: 1, color: '#CACACA' }} onClick={() => setConfirmationPasswordVisible(true)} />
                        }}
                    />
                    <Button variant="contained" className="w-full" color='secondary' sx={{ mb: 3 }} disableElevation disabled={!credentials?.username || !credentials?.email || !credentials?.password || !credentials?.confirmationPassword || credentials?.password !== credentials?.confirmationPassword} onClick={handleSignup}>
                        Sign Up
                    </Button>
                    <div className='text-center text-sm mb-8'>Already have a account? <span className='cursor-pointer text-[#539C52]' onClick={() => navigate('/login')}>Sign In</span></div>
                    <div className='flex items-center justify-center gap-2 mb-3'>
                        <div className='h-[0.5px] grow bg-[#9EAFB0]'></div>
                        <div className='text-xs text-[#9EAFB0]'>or continue with</div>
                        <div className='h-[0.5px] grow bg-[#9EAFB0]'></div>
                    </div>
                    <div className='flex items-center gap-4 justify-center'>
                        <Button variant="outlined" className="" color='lightGray' sx={{ mb: 3 }} disableElevation>
                            <img src={google} alt="google" className="w-5 h-5" />
                        </Button>
                        <Button variant="outlined" className="" color='lightGray' sx={{ mb: 3 }} disableElevation>
                            <img src={facebook} alt="facebook" className="w-5 h-5" />
                        </Button>
                        <Button variant="outlined" className="" color='lightGray' sx={{ mb: 3 }} disableElevation>
                            <img src={apple} alt="apple" className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        ) : (
            <div className="w-full h-full flex flex-col gap-5">
                <div className="text-2xl min-h-[2rem] max-h-[2rem] flex items-center">
                    Sign Up
                </div>
                <div className='w-full h-[0px] bg-black/50 '></div>

                <div className={`flex ${isMinimized ? 'flex-row overflow-hidden' : 'flex-col overflow-y-scroll'} grow gap-5  items-stretch`}>
                <div className={`bg-[#E8EDDF] ${isMinimized ? 'overflow-y-scroll' : ''} w-full flex flex-col rounded-2xl p-5 justify-center `}>
                        <div className='mb-5 flex justify-center'>
                            <img src={smiley} alt="smiley" className="w-[5rem] aspect-square" />
                        </div>
                        <div className='text-center text-3xl text-[#207B1F] mb-5'>For Doctors</div>
                        <div className='text-[#2A3F2E] font-normal mb-5 text-center leading-loose'>Join Ayurmitram to elevate your Ayurvedic expertise and encourage visitors to discover the ultimate in holistic health.</div>
                        <div className='text-center mt-10'>
                            <Button variant="contained" className="w-7/12" color='secondary' sx={{ mb: 2 }} disableElevation onClick={() => {setTypeOfUser('doctor'); }}>
                                Sign Up
                            </Button>
                        </div>
                        <div className='text-center text-sm'>Already have a account? <span className='cursor-pointer text-[#539C52]' onClick={() => navigate('/login')}>Sign In</span></div>                        
                    </div>
                    <div className={`bg-[#E8EDDF] ${isMinimized ? 'overflow-y-scroll' : ''} w-full flex flex-col rounded-2xl p-5 justify-center `}>
                        <div className='mb-5 flex justify-center'>
                            <img src={smiley} alt="smiley" className="w-[5rem] aspect-square" />
                        </div>
                        <div className='text-center text-3xl text-[#207B1F] mb-5'>For Patients</div>
                        <div className='text-[#2A3F2E] font-normal mb-5 text-center leading-loose'>Join Ayurmitram, where you can refine your Ayurvedic skills, prepare for holistic health consultations, and embark on a journey to thrive in the world of natural well-being.</div>
                        <div className='text-center mt-10'>
                            <Button variant="contained" className="w-7/12" color='secondary' sx={{ mb: 2 }} disableElevation onClick={() => {setTypeOfUser('patient'); }}>
                                Sign Up
                            </Button>
                        </div>
                        <div className='text-center text-sm'>Already have a account? <span className='cursor-pointer text-[#539C52]' onClick={() => navigate('/login')}>Sign In</span></div>
                    </div>
                </div>
            </div>
        )
    )
}

export default Signup