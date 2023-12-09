import prakruti from './../assets/find-prakruti.svg'
import Button from '@mui/material/Button';
import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";

import { setIsMinimized, setTabValue } from '../store/layout';

const FindPrakruti = () => {

    const isMinimized = useSelector(state => state.layout.isMinimized)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleFindPrakruti = () => {
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
            <div className={`text-2xl min-h-[2rem] max-h-[2rem] flex items-center ${isMinimized && 'justify-center'}`}>
                Find Your Prakruti
            </div>
            <div className='w-full h-[0px] bg-black/50 '></div>

            <div className='flex flex-col overflow-y-auto items-center gap-3'>
                <div className='text-[#366736] text-2xl'>Know Your Bio Energy: Are You Vata, Pitta or Kapha?</div>
                <img src={prakruti} alt="prakruti" className={`${isMinimized ? 'w-8/12' : 'w-full'}`} />
                <div className='text-center text-[#2A3F2E]'>Prakriti is Primal creative or natural force of the individual. The term is derived from the Sanskrit pra, meaning “beginning,” and kriti, meaning “creation.”</div>
                <div className='text-center text-[#2A3F2E]'>Prakriti is unique in every individual. Prakriti Analysis is done using a questionnaire related to your lifestyle, physical traits, physiological functioning such as digestion, likes, dislikes, excretion, mood, nature etc. By knowing one’s prakriti, it can help in maintaining health, understanding disease and its management. Prakriti Assessment is the key to understand your body and how to keep it healthy through diet and nutrition.</div>
                <div>
                    <Button variant="contained" color='darkGreen' disableElevation onClick={handleFindPrakruti}>
                        Find Your Prakruti
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FindPrakruti