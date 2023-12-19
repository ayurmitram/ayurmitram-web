import React, { useEffect } from 'react';
import ElectricBoltRoundedIcon from '@mui/icons-material/ElectricBoltRounded';
import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded';
import Button from '@mui/material/Button';
import backg from './../assets/darkgreenbg.jpg'

import { useDispatch, useSelector } from 'react-redux'
import { setIsMinimized, setShowTabs, setTabValue } from '../store/layout';
import { useNavigate } from 'react-router-dom';
import { LineChart } from '../components/Chart';

export default function Home() {
  const newMessageFunction = useSelector(state => state.layout.newMessageFunction)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleGoToAbout = () => {
    dispatch(setTabValue(5))
    navigate('/about')
  }

  useEffect(() => {
    dispatch(setTabValue(0))
    window.innerWidth < 1024 && dispatch(setShowTabs(false))
    if (localStorage.getItem('token') && window.innerWidth >= 1024)
      dispatch(setIsMinimized(false))
  }, [])

  return (
    <div className="text-center overflow-y-scroll min-h-[calc(100vh_-_2rem)] lg:min-h-0 h-full p-8 xl:p-12 bg-cover lg:rounded-2xl flex flex-col justify-start items-center gap-10" style={{
      backgroundImage: `url(${backg})`
    }}>
      <div className='h-[35%] flex flex-col justify-center gap-2 text-[#E8EDDF]'>
        <div className='text-2xl font-normal'>Welcome to</div>
        <div className='text-5xl xl:text-6xl 2xl:text-7xl font-medium'>AyurMitram</div>
      </div>
      <div className='h-[65%] bg-[#FFF2F2]/[15%] backdrop-blur-2xl rounded-2xl max-w-[500px] w-full p-8 xl:p-12 text-[#E8EDDF] flex flex-col justify-start items-center overflow-y-scroll gap-2'>
        <div className='text-xl font-medium mb-auto'>Decode your Prakriti with AI<br />and much more...</div>
        <div className='text-sm font-normal mb-2'>Select a mode to initiate the assessment</div>
        <Button variant="contained" sx={{ mb: 2, width: '80%', maxWidth: '400px' }} onClick={() => {
          dispatch(setIsMinimized(false))
          if (newMessageFunction) {
            newMessageFunction({ msg: 'find my prakriti' })
          }
        }}>
          Take a test now
          <ElectricBoltRoundedIcon className='ml-2' />
        </Button>

        <div className='font-normal text-xs'>don't know about prakruti <span className='text-[#539C52] cursor-pointer' onClick={handleGoToAbout}>learn more...</span></div>
      </div>
    </div>
  );
}
