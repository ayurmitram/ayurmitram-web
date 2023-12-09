import React, { useEffect } from 'react';
import botlogo from "../assets/botlogo.svg"
import BoltIcon from '@mui/icons-material/Bolt';
import ListIcon from '@mui/icons-material/List';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux'
import { setIsMinimized } from '../store/layout';

export default function Home() {  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setIsMinimized(false))
  }, [])
  
  return (
    <>
    <div className="text-center overflow-y-scroll h-full">
      <h1 className="text-3xl text-[#2A3F2E]">
        Decode your <br /> Prakriti with AI
      </h1>
      <img src={botlogo} className="mx-auto block" alt="Bot Logo" />
      <br />
      <br />
      <br />
      <h3 className="text-lg  text-gray-600 font-normal mx-auto block">
        Select a mode to initiate the assessment
      </h3>

      
      <div className="mt-4 flex flex-col items-center mb-5 px-8">
        <Button variant="contained" className="w-full" color='primary' sx={{ mb: 1, mx: 4 }} disableElevation>
          Quick
          <BoltIcon style={{ fontSize: 16, marginLeft: '4px' }} />
        </Button>
        <Button variant="contained" className="w-full" color='primary' sx={{ mb: 0, mx: 4 }} disableElevation>
        Comprehensive
          <ListIcon style={{ fontSize: 20, marginLeft: '4px' }} />
        </Button>
        {/* <button className="bg-yellowapp hover:bg-yellow-500 font-normal text-xl md:text-2xl lg:text-3xl py-2 px-4 rounded-2xl mb-2 w-80 md:w-30 lg:w-30">
          Quick
          <BoltIcon style={{ fontSize: 30, marginLeft: '4px' }} />
        </button>
        <button className="bg-yellowapp hover:bg-yellow-500 font-normal text-xl md:text-2xl lg:text-3xl py-2 px-4 rounded-2xl w-80 md:w-30 lg:w-30">
          Comprehensive
          <ListIcon style={{ fontSize: 40, marginLeft: '4px' }} />
        </button> */}
      </div>

      <h3 className="text-sm  text-gray-600 font-normal mx-auto block">
        Don’t know about Prakruti? <span className="text-ayurgreen">Learn More...</span>
      </h3>

    </div>
    </>
  );
}
