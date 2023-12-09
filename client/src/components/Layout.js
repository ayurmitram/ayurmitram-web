import React, { useState } from "react";
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import TroubleshootRoundedIcon from '@mui/icons-material/TroubleshootRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import KitchenRoundedIcon from '@mui/icons-material/KitchenRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import logo from './../assets/logo.svg'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ThemeWrapper from "../utils/ThemeWrapper";
import { useSelector, useDispatch } from 'react-redux'
import { setTabValue, setIsMinimized } from '../store/layout'
import Chatbot from "./Chatbot";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {

	const tabValue = useSelector(state => state.layout.tabValue)
	const isMinimized = useSelector(state => state.layout.isMinimized)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleTabValue = ({ event, newValue}) => {
		
	}

	const openChatbox = () => {
        if (localStorage.getItem('token')) {
            dispatch(setIsMinimized(false))
        } else {
            dispatch(setTabValue(10))
            navigate('/login')
        }
    }

	const redirectTo = (path) => {
		navigate(path)
	}

	return (
		<ThemeWrapper>
			{/* <div className="flex items-center justify-between bg-ayurgreen text-white p-3 font-bold">
				<div className="flex items-center">
					<span className="text-2xl font-semibold">AyurMitram</span>
				</div>
			</div> */}
			<div className="flex justify-start gap-5 h-screen p-5 font-['Poppins'] font-semibold bg-[#E8EDDF] overflow-hidden" >
				<div className="flex w-2/12 flex-col gap-5 rounded-xl overflow-auto h-full">
					<div className="flex gap-2 items-center text-2xl p-5 pb-0">
						AyurMitram
					</div>
					
					<div className='w-full h-[0px] bg-black/50 '></div>

					<Tabs value={tabValue} onChange={handleTabValue} orientation="vertical">
						<Tab label="Home" icon={<HomeRoundedIcon />} iconPosition="start" onClick={() => {redirectTo('/'); dispatch(setTabValue(0)); }} />
						<Tab label="Find Your Prakriti" icon={<TroubleshootRoundedIcon />} iconPosition="start" onClick={(e) => {redirectTo('/find-your-prakruti'); dispatch(setTabValue(1))}} />
						{localStorage.getItem('token') ? (
							<Tab label="Results" icon={<AssessmentRoundedIcon />} iconPosition="start" onClick={() => {redirectTo('/results'); dispatch(setTabValue(2))}} />
						) : (
							<div></div>
						)}
						<Tab label="Consultant (Doctor)" icon={<LocalHospitalRoundedIcon />} iconPosition="start" onClick={() => {redirectTo('/consultant'); dispatch(setTabValue(3))}} />
						<Tab label="Diet Plan" icon={<KitchenRoundedIcon />} iconPosition="start" onClick={() => {redirectTo('/dietplan'); dispatch(setTabValue(4))}} />
						<Tab label="About" icon={<InfoRoundedIcon />} iconPosition="start" onClick={() => {redirectTo('/about'); dispatch(setTabValue(5))}} />

						<div className='w-full h-[0.5px] bg-black/50 mt-5 mb-1'></div>

						{localStorage.getItem('token') ? (
							<Tab label="Profile" icon={<AccountCircleRoundedIcon />} iconPosition="start" onClick={() => {redirectTo('/profile'); dispatch(setTabValue(7))}} />
						) : (
							<div></div>
						)}
						{localStorage.getItem('token') ? (
							<Tab label="Logout" icon={<LogoutRoundedIcon />} iconPosition="start" onClick={() => {localStorage.removeItem('token'); redirectTo('/'); dispatch(setTabValue(0))}} />
						) : (
							<div></div>
						)}
						{!localStorage.getItem('token') ? (
							<Tab label="Signup" icon={<PersonAddRoundedIcon />} iconPosition="start" onClick={() => {redirectTo('/signup'); dispatch(setTabValue(9))}} />
						) : (
							<div></div>
						)}
						{!localStorage.getItem('token') ? (
							<Tab label="Login" icon={<LoginRoundedIcon />} iconPosition="start" onClick={() => {redirectTo('/login'); dispatch(setTabValue(10))}} />
						) : (
							<div></div>
						)}
					</Tabs>
				</div>
				<div className={` bg-white rounded-2xl p-5 ${isMinimized ? 'w-10/12' : 'w-5/12'}`}>
					{children}
				</div>
				{isMinimized ? (
					<div className="fixed bottom-8 right-8">
						<button
							className="bg-ayurgreen text-white p-4 rounded-full"
							onClick={openChatbox}
						>
							<ChatBubbleIcon />
						</button>
					</div>
				) : (
					<div className="flex w-5/12 bg-white border rounded-2xl  p-5">
						<Chatbot />
					</div>
				)}
				
			</div>
		</ThemeWrapper>
	)
}

export default Layout