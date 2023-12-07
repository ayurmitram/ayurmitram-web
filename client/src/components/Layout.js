import React, { useState } from "react";
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TroubleshootOutlinedIcon from '@mui/icons-material/TroubleshootOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import KitchenOutlinedIcon from '@mui/icons-material/KitchenOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
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

	const toggleChatbot = () => {
		dispatch(setIsMinimized(!isMinimized))
	}

	const redirectTo = (path) => {
		navigate(path)
	}

	return (
		<ThemeWrapper>
			<div className="flex items-center justify-between bg-ayurgreen text-white p-3 font-bold">
				<div className="flex items-center">
					<span className="text-2xl font-semibold">AyurMitram</span>
				</div>
			</div>
			<div className="flex justify-start gap-5 h-screen p-5 font-['Inter']  font-semibold bg-[#E8EDDF] overflow-hidden" >
				<div className="flex w-3/12 flex-col gap-5 rounded-xl overflow-auto h-full">
					<div className="flex gap-2 items-center text-2xl p-5 pb-0">
						Info Center
					</div>
					
					<div className='w-full h-[0.5px] bg-black/50 '></div>

					<Tabs value={tabValue} onChange={handleTabValue} orientation="vertical">
						<Tab label="Home" icon={<HomeOutlinedIcon sx={{ stroke: "#E8EDDF", strokeWidth: 1 }} />} iconPosition="start" onClick={() => {redirectTo('/'); dispatch(setTabValue(0)); }} />
						<Tab label="Find Your Prakriti" icon={<TroubleshootOutlinedIcon sx={{ stroke: "#E8EDDF", strokeWidth: 1 }} />} iconPosition="start" onClick={(e) => {redirectTo('/find-your-prakruti'); dispatch(setTabValue(1))}} />
						<Tab label="Results" icon={<AssessmentOutlinedIcon sx={{ stroke: "#E8EDDF", strokeWidth: 1 }} />} iconPosition="start" onClick={() => {redirectTo('/results'); dispatch(setTabValue(2))}} />
						<Tab label="Consultant (Doctor)" icon={<LocalHospitalOutlinedIcon sx={{ stroke: "#E8EDDF", strokeWidth: 1 }} />} iconPosition="start" onClick={() => {redirectTo('/consultant'); dispatch(setTabValue(3))}} />
						<Tab label="Diet Plan" icon={<KitchenOutlinedIcon sx={{ stroke: "#E8EDDF", strokeWidth: 1 }} />} iconPosition="start" onClick={() => {redirectTo('/dietplan'); dispatch(setTabValue(4))}} />
						<Tab label="About" icon={<InfoOutlinedIcon sx={{ stroke: "#E8EDDF", strokeWidth: 1 }} />} iconPosition="start" onClick={() => {redirectTo('/about'); dispatch(setTabValue(5))}} />

						<div className='w-full h-[0.5px] bg-black/50 mt-5 mb-1'></div>

						<Tab label="Profile" icon={<AccountCircleOutlinedIcon sx={{ stroke: "#E8EDDF", strokeWidth: 1 }} />} iconPosition="start" onClick={() => {redirectTo('/profile'); dispatch(setTabValue(7))}} />
						<Tab label="Login" icon={<LogoutOutlinedIcon sx={{ stroke: "#E8EDDF", strokeWidth: 1 }} />} iconPosition="start" onClick={() => {redirectTo('/login'); dispatch(setTabValue(8))}} />
					</Tabs>
				</div>
				<div className={` bg-white rounded-2xl p-5 ${isMinimized ? 'w-9/12' : 'w-4/12'}`}>
					{children}
				</div>
				{isMinimized ? (
					<div className="fixed bottom-8 right-8">
						<button
							className="bg-ayurgreen text-white p-4 rounded-full"
							onClick={toggleChatbot}
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