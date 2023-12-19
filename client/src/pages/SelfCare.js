import backg from './../assets/darkgreenbg.jpg'
import Button from '@mui/material/Button';
import { useEffect } from "react"
import balance from './../assets/balance.svg'
import calories from './../assets/calories.svg'
import nutrients from './../assets/nutrients.svg'
import moderate from './../assets/moderate.svg'
import health from './../assets/health.svg'
import varied from './../assets/varied.svg'
import SelfImprovementRoundedIcon from '@mui/icons-material/SelfImprovementRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import BentoRoundedIcon from '@mui/icons-material/BentoRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import { useSelector, useDispatch } from 'react-redux'
import { setIsMinimized, setShowTabs, setTabValue } from '../store/layout';
import { useNavigate } from "react-router-dom";

const SelfCare = () => {
    const isMinimized = useSelector(state => state.layout.isMinimized)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(setTabValue(4))
        dispatch(setIsMinimized(true))
        window.innerWidth < 1024 && dispatch(setShowTabs(false))
    }, [])

    return (
        <div className="w-full h-full flex flex-col gap-5 p-5">
            <div className="text-2xl min-h-[2rem] flex items-center">
                Self Care
                <div className="lg:hidden ms-auto cursor-pointer"><MenuRoundedIcon onClick={() => { dispatch(setShowTabs(true)) }} /></div>
            </div>
            <div className='w-full h-[0px] bg-black/50 '></div>
            <div className='h-full overflow-y-scroll p-5 bg-cover rounded-2xl text-[#E8EDDF] text-center' style={{
                backgroundImage: `url(${backg})`
            }}>
                <div className='font-medium text-2xl mb-1'>Welcome to your Self Care hub</div>
                <div className='font-normal text-lg mb-8'>Embrace a Holistic Wellness Journey Tailored Just for You</div>
                <div className={`flex gap-10 ${isMinimized ? 'flex-col items-center lg:items-stretch lg:flex-row px-5': 'flex-col items-center'}`}>
                    <div className={`w-full bg-[#FFF2F2]/[20%] backdrop-blur-[25rem] rounded-2xl p-5 flex flex-col items-center ${!isMinimized && 'max-w-[400px]'}`}>
                        <div className='self-stretch bg-[#E8EDDF] rounded-md text-black py-2 px-3 font-normal flex items-center justify-center'>
                            <BentoRoundedIcon className='me-2' />
                            Tailored diet planning
                        </div>
                        <div className='font-normal p-5'>Personalized dietary recommendations designed around your prakruti.<br /><br />Experience a balanced and nourishing diet crafted uniquely for your well-being.</div>
                        <Button variant='contained' sx={{ minWidth: '75%', marginTop: 'auto' }} disableElevation onClick={() => navigate('diet')}>
                            Explore diet planning
                        </Button>
                    </div>
                    <div className={`w-full bg-[#FFF2F2]/[20%] backdrop-blur-[25rem] rounded-2xl p-5 flex flex-col items-center ${!isMinimized && 'max-w-[400px]'}`}>
                        <div className='self-stretch bg-[#E8EDDF] rounded-md text-black py-2 px-3 font-normal flex items-center justify-center'>
                            <SelfImprovementRoundedIcon className='me-2' />
                            Curated workout routine
                        </div>
                        <div className='font-normal p-5'>Access specialized exercise regimes harmonized with your individual constitution.<br /><br />Elevate your fitness journey with routines tailored for your body's needs.</div>
                        <Button variant='contained' sx={{ minWidth: '75%', marginTop: 'auto' }} disableElevation onClick={() => navigate('workout')}>
                            Explore workouts
                        </Button>
                    </div>
                    <div className={`w-full bg-[#FFF2F2]/[20%] backdrop-blur-[25rem] rounded-2xl p-5 flex flex-col items-center ${!isMinimized && 'max-w-[400px]'}`}>
                        <div className='self-stretch bg-[#E8EDDF] rounded-md text-black py-2 px-3 font-normal flex items-center justify-center'>
                            <BentoRoundedIcon className='me-2' />
                            Lifestyle guidance
                        </div>
                        <div className='font-normal p-5'>Receive personalized lifestyle advice aligning with the essence of Ayurveda.<br /><br />Embrace a holistic approach to well-being, fostering vitality beyond the physical.</div>
                        <Button variant='contained' sx={{ minWidth: '75%', marginTop: 'auto' }} disableElevation onClick={() => navigate('lifestyle')}>
                            Explore lifestyle tips
                        </Button>
                    </div>
                </div>
                <div className='font-medium text-2xl mt-10'>Your journey starts here</div>
            </div>
        </div>
    )
}

export default SelfCare