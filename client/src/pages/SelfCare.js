import Button from '@mui/material/Button';
import { useEffect } from "react"
import balance from './../assets/balance.svg'
import calories from './../assets/calories.svg'
import nutrients from './../assets/nutrients.svg'
import moderate from './../assets/moderate.svg'
import health from './../assets/health.svg'
import varied from './../assets/varied.svg'
import SelfImprovementRoundedIcon from '@mui/icons-material/SelfImprovementRounded';
import BentoRoundedIcon from '@mui/icons-material/BentoRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import { useSelector, useDispatch } from 'react-redux'
import { setIsMinimized, setTabValue } from '../store/layout';
import { useNavigate } from "react-router-dom";

const SelfCarePoint = ({ body, img }) => {
    return (
        <div className='rounded-full aspect-square flex flex-col items-center text-center justify-center  gap-5 font-medium relative'>
            <img src={img} alt="balance" className='w-[80px]' />
            <div className='relative'>
                <div className='absolute flex justify-start items-center h-full w-full'>
                    <div className='w-6/12 aspect-square bg-[#E8EDDF] mix-blend-multiply rounded-full'></div>
                </div>
                <div className='ps-4'>
                    {body}
                </div>
            </div>
        </div>
    )
}

const SelfCare = () => {
    const isMinimized = useSelector(state => state.layout.isMinimized)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const selfcarePoints = [
        {
            body: 'Balancing different food groups, and consuming foods in the right proportion',
            img: balance 
        },
        {
            body: 'Consuming the appropriate number of calories to maintain a healthy weight depending on your metabolism',
            img: calories 
        },
        {
            body: 'Focussing on creating a diet that is nutrient dense without being high in calories',
            img: nutrients 
        },
        {
            body: 'Learning how to be moderate with foods that are higher in fat or sugar',
            img: moderate 
        },
        {
            body: 'Maintaining adequate levels of energy, nutrients, movement and rest for optimal health',
            img: health 
        },
        {
            body: 'Exploring a varied diet that provides all the nutrients necessary for good health',
            img: varied 
        },

    ]

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
        <div className="w-full h-full flex flex-col gap-5 p-5">
            <div className="text-2xl min-h-[2rem] flex items-center">
                Self Care
            </div>
            <div className='w-full h-[0px] bg-black/50 '></div>
    
            <div className={`grid ${isMinimized ? 'grid-cols-4' : 'grid-cols-2'} items-center justify-center gap-5 overflow-y-auto grow place-items-center`}>
                {selfcarePoints?.slice(0,5)?.map((point, index) => (
                    <SelfCarePoint body={point.body} img={point.img} key={index} />
                ))}
                <div className={`col-span-2 ${isMinimized ? '' : 'order-last'} p-5 max-w-[400px] flex flex-col items-center justify-center gap-5 w-full h-full self-stretch`}>
                    <Button variant="contained" fullWidth color='primary' disableElevation onClick={() => navigate('diet')}>
                        Know your food
                        <BentoRoundedIcon className='ms-2' />
                    </Button>
                    <Button variant="contained" fullWidth color='primary' disableElevation onClick={() => navigate('yoga')}>
                        Yoga for you
                        <SelfImprovementRoundedIcon className='ms-2' />
                    </Button>
                    <Button variant="contained" fullWidth color='primary' disableElevation onClick={() => navigate('lifestyle')}>
                        Good Lifestyle
                        <WbSunnyRoundedIcon className='ms-2' />
                    </Button>
                    
                </div>
                {selfcarePoints?.slice(5,6)?.map((point, index) => (
                    <SelfCarePoint body={point.body} img={point.img} key={index} />
                ))}
            </div>
        </div>
    )
}

export default SelfCare