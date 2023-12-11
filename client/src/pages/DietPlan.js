import Button from '@mui/material/Button';
import { useEffect } from "react"
import balance from './../assets/balance.svg'
import calories from './../assets/calories.svg'
import nutrients from './../assets/nutrients.svg'
import moderate from './../assets/moderate.svg'
import health from './../assets/health.svg'
import varied from './../assets/varied.svg'
import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded';
import BentoRoundedIcon from '@mui/icons-material/BentoRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import { useSelector, useDispatch } from 'react-redux'
import { setIsMinimized, setTabValue } from '../store/layout';
import { useNavigate } from "react-router-dom";


const DietPlan = () => {
    const isMinimized = useSelector(state => state.layout.isMinimized)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const openChatbox = () => {
        if (localStorage.getItem('token')) {
            dispatch(setIsMinimized(false))
        } else {
            dispatch(setTabValue(10))
            navigate('/login')
        }
    }

    useEffect(() => {
        dispatch(setIsMinimized(true))
    }, [])

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="text-2xl min-h-[2rem] flex items-center">
                Diet Plan
            </div>
            <div className='w-full h-[0px] bg-black/50 '></div>
    
            <div className={`grid ${isMinimized ? 'grid-cols-4' : 'grid-cols-2'} items-center justify-center gap-5 overflow-y-auto grow place-items-center`}>
                <div className='rounded-full flex flex-col items-center text-center justify-center  gap-5 font-medium relative'>
                    <img src={balance} alt="balance" className='w-[80px]' />
                    <div className='relative'>
                        <div className='absolute flex justify-start items-center h-full w-full'>
                            <div className='w-6/12 aspect-square bg-[#E8EDDF] mix-blend-multiply rounded-full'></div>
                        </div>
                        <div className='ps-4'>
                            Balancing different food groups, and consuming foods in the right proportion
                        </div>
                    </div>
                </div>
                <div className='rounded-full aspect-square flex flex-col items-center text-center justify-center  gap-5 font-medium relative'>
                    <img src={calories} alt="balance" className='w-[80px]' />
                    <div className='relative'>
                        <div className='absolute flex justify-start items-center h-full w-full'>
                            <div className='w-6/12 aspect-square bg-[#E8EDDF] mix-blend-multiply rounded-full'></div>
                        </div>
                        <div className='ps-4'>
                            Consuming the appropriate number of calories to maintain a healthy weight depending on your metabolism 
                        </div>
                    </div>
                </div>
                <div className='rounded-full aspect-square flex flex-col items-center text-center justify-center  gap-5 font-medium relative'>
                    <img src={nutrients} alt="balance" className='w-[80px]' />
                    <div className='relative'>
                        <div className='absolute flex justify-start items-center h-full w-full'>
                            <div className='w-6/12 aspect-square bg-[#E8EDDF] mix-blend-multiply rounded-full'></div>
                        </div>
                        <div className='ps-4'>
                            Focussing on creating a diet that is nutrient dense without being high in calories
                        </div>
                    </div>
                </div>
                <div className='rounded-full aspect-square flex flex-col items-center text-center justify-center  gap-5 font-medium relative'>
                    <img src={moderate} alt="balance" className='w-[80px]' />
                    <div className='relative'>
                        <div className='absolute flex justify-start items-center h-full w-full'>
                            <div className='w-6/12 aspect-square bg-[#E8EDDF] mix-blend-multiply rounded-full'></div>
                        </div>
                        <div className='ps-4'>
                            Learning how to be moderate with foods that are higher in fat or sugar
                        </div>
                    </div>
                </div>
                <div className='rounded-full aspect-square flex flex-col items-center text-center justify-center  gap-5 font-medium relative'>
                    <img src={health} alt="balance" className='w-[80px]' />
                    <div className='relative'>
                        <div className='absolute flex justify-start items-center h-full w-full'>
                            <div className='w-6/12 aspect-square bg-[#E8EDDF] mix-blend-multiply rounded-full'></div>
                        </div>
                        <div className='ps-4'>
                            Maintaining adequate levels of energy, nutrients, movement and rest for optimal health
                        </div>
                    </div>
                </div>
                <div className={`col-span-2 ${isMinimized ? '' : 'order-last'} p-5 max-w-[400px] flex flex-col items-center justify-center gap-5 w-full h-full self-stretch`}>
                    <Button variant="contained" fullWidth color='primary' disableElevation onClick={openChatbox}>
                        Discover your prakruti diet
                        <BentoRoundedIcon className='ms-2' />
                    </Button>
                    <Button variant="contained" fullWidth color='primary' disableElevation onClick={openChatbox}>
                        Your day begins
                        <HourglassTopRoundedIcon className='ms-2' />
                    </Button>
                    <Button variant="contained" fullWidth color='primary' disableElevation onClick={openChatbox}>
                        Perfect weather diet
                        <WbSunnyRoundedIcon className='ms-2' />
                    </Button>
                    
                </div>
                <div className='rounded-full aspect-square flex flex-col items-center text-center justify-center  gap-5 font-medium relative'>
                    <img src={varied} alt="balance" className='w-[80px]' />
                    <div className='relative'>
                        <div className='absolute flex justify-start items-center h-full w-full'>
                            <div className='w-6/12 aspect-square bg-[#E8EDDF] mix-blend-multiply rounded-full'></div>
                        </div>
                        <div className='ps-4'>
                            Exploring a varied diet that provides all the nutrients necessary for good health
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DietPlan