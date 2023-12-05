import TextField from '@mui/material/TextField';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Button from '@mui/material/Button';

import google from './../assets/google.svg'
import facebook from './../assets/facebook.svg'
import apple from './../assets/apple.svg'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const [credentials, setCredentails] = useState(null)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmationPasswordVisible, setConfirmationPasswordVisible] = useState(false)

    const navigate = useNavigate()

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="text-2xl h-10 min-h-[2.5rem] flex items-center">
                Sign Up
            </div>
            <div className='w-full h-[0.5px] bg-black/50 '></div>

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
                <Button variant="contained" className="w-full" color='secondary' sx={{ mb: 3 }} disableElevation>
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
    )
}

export default Signup