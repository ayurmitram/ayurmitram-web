import React, { useState } from "react";
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TroubleshootOutlinedIcon from '@mui/icons-material/TroubleshootOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import KitchenOutlinedIcon from '@mui/icons-material/KitchenOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import logo from './../assets/logo.svg'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ThemeWrapper from "../utils/ThemeWrapper";
import { useSelector, useDispatch } from 'react-redux'
import { setTabValue } from '../store/layout'

const Layout = () => {

	const tabValue = useSelector(state => state.layout.tabValue)

	const dispatch = useDispatch()

	const handleTabValue = (event, newValue) => {
		dispatch(setTabValue(newValue))
	}

	return (
		<ThemeWrapper>
			<div className="flex justify-between gap-5 h-screen p-5 font-['Inter'] bg-[#E8EDDF] overflow-hidden" >
				<div className="flex w-3/12 flex-col gap-5  rounded-xl overflow-auto h-full">
					<div className="flex gap-2 items-center text-2xl p-5">
						<img src={logo} alt="logo" className="w-10 h-10" />
						AyurMitram
					</div>
					<div className='w-full h-[0.5px] bg-black/50 '></div>

					<Tabs value={tabValue} onChange={handleTabValue} orientation="vertical">
						<Tab label="Home" icon={<HomeOutlinedIcon sx={{ stroke: "#E8EDDF", strokeWidth: 1 }} />} iconPosition="start" />
						<Tab label="Find Your Prakriti" icon={<TroubleshootOutlinedIcon sx={{ stroke: "#E8EDDF", strokeWidth: 1 }} />} iconPosition="start" />
						<Tab label="Results" icon={<AssessmentOutlinedIcon sx={{ stroke: "#E8EDDF", strokeWidth: 1 }} />} iconPosition="start" />
						<Tab label="Consultant (Doctor)" icon={<LocalHospitalOutlinedIcon sx={{ stroke: "#E8EDDF", strokeWidth: 1 }} />} iconPosition="start" />
						<Tab label="Diet Plan" icon={<KitchenOutlinedIcon sx={{ stroke: "#E8EDDF", strokeWidth: 1 }} />} iconPosition="start" />
						<Tab label="About" icon={<InfoOutlinedIcon sx={{ stroke: "#E8EDDF", strokeWidth: 1 }} />} iconPosition="start" />

						<div className='w-full h-[0.5px] bg-black/50 mt-5 mb-1'></div>

						<Tab label="Profile" icon={<AccountCircleOutlinedIcon sx={{ stroke: "#E8EDDF", strokeWidth: 1 }} />} iconPosition="start" />
						<Tab label="Logout" icon={<LogoutOutlinedIcon sx={{ stroke: "#E8EDDF", strokeWidth: 1 }} />} iconPosition="start" />
					</Tabs>

				</div>
				<div className="flex w-4/12 bg-white border rounded-2xl  p-5">
					{/* <div className="bg-white border-gray-300 rounded-lg overflow-y-auto p-4">
						<h3 className="text-2xl bg-white font-semibold  mb-6">
							Info Center
						</h3>
						<hr className="mb-4" />
					</div> */}
				</div>
				<div className="flex w-5/12 bg-white border rounded-2xl  p-5">
					{/* <div className="bg-white border-gray-300 rounded-lg overflow-y-auto p-4">
						<h3 className="text-2xl bg-white font-semibold  mb-6">
							AyurMitram Chatbot
						</h3>
						<hr className="mb-4" />
					</div> */}
				</div>
			</div>
		</ThemeWrapper>
	)
}

export default Layout