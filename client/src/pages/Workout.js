import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import doshalogo1 from './../assets/about1logo.svg'
import doshalogo2 from './../assets/about2logo.svg'
import doshalogo3 from './../assets/about3logo.svg'
import rejuvenation1 from './../assets/rejuvenation1.svg'
import rejuvenation2 from './../assets/rejuvenation2.svg'
import rejuvenation3 from './../assets/rejuvenation3.svg'
import workout from './../assets/workout.svg'
import asanas from './../assets/asanas.svg'
import rejuvenation from './../assets/rejuvenation.svg'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Button from '@mui/material/Button'
import { useEffect, useMemo, useState } from "react"
import { setIsMinimized, setShowTabs, setTabValue } from '../store/layout';
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';

const Workout = () => {
    const [prakriti] = useSearchParams()
    const [selectedDosha, setSelectedDosha] = useState(prakriti.get('prakriti') || 'vata')
    const isMinimized = useSelector(state => state.layout.isMinimized)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const vataData = {
        desc: [
            'As you possess a Vata body type, finding the right workout routine plays a crucial role in maintaining a healthy lifestyle, but it can be a bit confusing and challenging.',
            'Balancing the requirement for light exercises like walking or Yin Yoga, perfect for calming the airy Vata constitution, with the aspiration for a fit appearance and strong bones introduces unique challenges. Addressing these valid concerns becomes essential as you navigate your fitness journey, tailored to the delicate Vata frame.',
            'The key word is moderation.'
        ],
        compactPts: [
            {
                color: '#E6F5FF',
                title: 'Ideal Workout Session',
                data: 'Optimize workouts with gentle strength training, deep breathing, gradual tempo, and grounding asanas'
            },
            {
                color: '#E6F5FF',
                title: 'Asansas',
                data: 'Experience the depth of knowledge from experts across all areas of yoga.'
            },
            {
                color: '#E6F5FF',
                title: 'Rejuvenation',
                data: 'An essential aspect of a comprehensive Ayurveda fitness routine for Vata dosha involves prioritizing rejuvenation.'
            }
        ],
        asanas: [
            {
                title: 'Paschimottanasana',
                img: ''
            }, {
                title: 'Vrikshasana',
                img: ''
            }, {
                title: 'Tadasana',
                img: ''
            }
        ],
        workout: [
            {
                title: 'Warm-up Phase',
                data: 'Begin with a brief activation circuit (2-5 minutes) to engage targeted muscles, fostering a connection between mind and body for full presence.'
            }, {
                title: 'Training Phase',
                data: 'Commence your workout routine, focusing on the tempo of each exercise. Execute movements with controlled precision, emphasizing mindful repetition.'
            }, {
                title: 'Cool-down Phase',
                data: 'Conclude with grounding movements, including stretching, self-massage, and deep breathing. Feel your body, promote relaxation, and culminate with Savasana for a holistic conclusion.'
            }
        ],
        rejuvenation: {
            img: rejuvenation1,
            color: '#E6F5FF',
            desc: 'Focusing on increasing Ojas and achieving mind-body balance is crucial. Follow these Ayurvedic tips to enhance fitness without aggravating Vata:',
            ptsList1: [
                'Exercise 3-5 times weekly, allowing ample rest for muscle recovery.',
                'Opt for 20-45 minutes of low-intensity workouts.',
                'Prioritize joint care with warm oil massages.',
                'Consume milk decoctions with nourishing spices like Ashwagandha.'
            ],
            ptsList2: [
                'Aid tissue recovery with Epsom salt baths.',
                'Practice lunar alternate nostril breathing pre and post-exercise.',
                'Add yoga asanas at the end of your workout that purposefully stretch the target muscles and bring softness to the body.',
            ]
        }
    }

    const pittaData = {
        desc: [
            'For you, with a Pitta constitution, achieving a fit appearance, preventing muscle loss, and keeping strong bones are key priorities that deserve your attention and care.',
            'As you engage in workouts, bring mindfulness and intentionality, specifically targeting the reduction of excessive fire and oily qualities that may already exist in your Pitta constitution.',
            'Through the inclusion of strength training and progressive overload, you\'ll fortify your legs, arms, glutes, and core, preventing potential back issues. Embrace calming and grounding asanas to boost flexibility, ward off tightness, and cool your body—maximizing the benefits for your Pitta constitution.',
            'Pitta aligns closely with physical activity. Be in moderation.'
        ],
        compactPts: [
            {
                color: '#FBE3E1',
                title: 'Ideal Workout Session',
                data: 'Gentle strength training, deep breathing, gradual tempo, and grounding asanas optimize workout benefits'
            },
            {
                color: '#FBE3E1',
                title: 'Asansas',
                data: 'Experience the depth of knowledge from experts across all areas of yoga via videos'
            },
            {
                color: '#FBE3E1',
                title: 'Rejuvenation',
                data: 'Rejuvenation should be a special component of an adequate Ayurvedic fitness routine for Pitta dosha.'
            }
        ],
        asanas: [
            {
                title: 'Chandra Namaskar',
                img: ''
            }, {
                title: 'Baddha Konasana',
                img: ''
            }, {
                title: 'Virasana',
                img: ''
            }
        ],
        workout: [
            {
                title: 'Warm-up Phase',
                data: 'Commence your session with a brief activation circuit (2-5 minutes) to engage the muscles targeted in your training. This phase serves as an opportune moment to establish a connection between mind and muscles, fostering full presence.'
            }, {
                title: 'Training Phase',
                data: 'Initiate your workout routine, giving thoughtful consideration to the tempo of each exercise. Focus on the speed at which you execute each repetition, emphasizing controlled and precise movements throughout.'
            }, {
                title: 'Cool-down Phase',
                data: 'Conclude your session with grounding movements, incorporating stretches, self-massage, and deep breathing exercises. Take the time to attune to your body, breathe deeply, and induce a state of relaxation. Complete your practice with the restorative Savasana pose for a holistic conclusion.'
            }
        ],
        rejuvenation: {
            img: rejuvenation2,
            color: '#FBE3E1',
            desc: 'Rejuvenation holds a distinct place in a well-rounded Ayurvedic fitness regimen tailored for Pitta dosha.',
            ptsList1: [
                'Engage in workouts 4 to 5 days a week, ensuring sufficient rest periods for muscle recovery and growth',
                'Exercise for 35-45 minutes with a moderate intensity level to strike the right balance.',
                'Practice "green therapy" by spending time in nature for a calming and balancing effect.',
            ],
            ptsList2: [
                'Prioritize joint health by incorporating coconut oil massages for protection and nourishment.',
                'Consume milk decoctions with nourishing and cooling spices like Shatavari.',
                'Integrate lunar alternate nostril breathing before and after workouts.',
            ]
        }
    }

    const kaphaData = {
        desc: [
            'As you have a Kapha dosha, opt for stimulating exercises such as brisk walking, running, or hiking - they work wonders for your body type.',
            'By incorporating strength training, progressive overload, plyometrics, and steady forms of cardio, you can achieve beautifully sculpted legs, arms, and glutes, along with a solid core to prevent potential back problems in the future.',
            'Additionally, integrating calming and grounding asanas into your routine can prevent tightness, enhance both inner and outer flexibility, and expand your range of motion.',
            'The keywords are intensity and potency.'
        ],
        compactPts: [
            {
                color: '#FEF6D2',
                title: 'Ideal Workout Session',
                data: 'Kaphas, often sluggish, benefit from consistent, energetic workouts, melting excess fat, promoting a lighter body, and enhancing endurance.'
            },
            {
                color: '#FEF6D2',
                title: 'Asansas',
                data: 'Experience the depth of knowledge from experts across all areas of yoga via videos'
            },
            {
                color: '#FEF6D2',
                title: 'Rejuvenation',
                data: 'Incorporating rejuvenation is a crucial element of a well-rounded Ayurvedic fitness regimen tailored for Kapha dosha.'
            }
        ],
        asanas: [
            {
                title: 'Surya Namaskar',
                img: ''
            }, {
                title: 'Ustrasana',
                img: ''
            }, {
                title: 'Urdhva Mukha Svanasana',
                img: ''
            }
        ],
        workout: [
            {
                title: 'Warm-up Phase',
                data: 'Embark on a brief activation circuit (2-5 minutes) to engage target muscles, fostering a connection between mind and body for full presence.'
            }, {
                title: 'Training Phase',
                data: 'Initiate your workout routine, focusing on the tempo of each exercise—the speed at which you perform each repetition. Execute each movement in an invigorating and controlled manner.'
            }, {
                title: 'Cool-down Phase',
                data: 'Conclude with grounding movements, including stretching, self-massage, and deep breathing. Immerse yourself in the sensory experience, taking deep breaths and relaxing. Finish with a plank for a final moment of strength and stability.'
            }
        ],
        rejuvenation: {
            img: rejuvenation3,
            color: '#FEF6D2',
            desc: 'Here are Ayurvedic strategies for you to get in the best shape of your life while avoiding the exacerbation of Kapha.',
            ptsList1: [
                'Engage in workouts 5 to 6 days a week, ensuring at least one day of rest.',
                'Prioritize joint care with Mustard oil massages.',
                'Incorporate milk decoctions with nourishing spices like Ashwagandha.',
            ],
            ptsList2: [
                'Aim for 45-60 minutes of exercise with a fast intensity to maximize your fitness routine.',
                'Immerse yourself in nature as part of your green therapy for a refreshing and balancing effect.',
                'Conclude your exercise session with planks, adding a final touch of strength and stability.',
            ]
        }
    }

    const data = useMemo(() => {
        if (selectedDosha === 'vata') return vataData
        else if (selectedDosha === 'pitta') return pittaData
        else return kaphaData
    }, [selectedDosha])

    useEffect(() => {
        dispatch(setTabValue(4))
        dispatch(setIsMinimized(true))
        window.innerWidth < 1024 && dispatch(setShowTabs(false))
    }, [])

    return (
        <div className='rounded-2xl h-full w-full p-5 flex flex-col gap-5'>
            <div className="text-2xl min-h-[2rem] max-h-[2rem] flex items-center">
                <Button variant="outlined" color='lightGray' disableElevation onClick={() => navigate('/selfcare' + (prakriti.get('prakriti') ? '?prakriti=' + prakriti.get('prakriti') : ''))}>
                    <ArrowBackRoundedIcon color='secondary' className='mr-2' />
                </Button>
                Workout Routine
                <div className="lg:hidden ms-auto cursor-pointer"><MenuRoundedIcon onClick={() => { dispatch(setShowTabs(true)) }} /></div>
            </div>

            <div className='w-full h-[0px] bg-black/50 '></div>

            <div className='h-full overflow-y-scroll'>
                <div className='flex gap-2 justify-center mb-4'>
                    <div title='Vata Prakruti' className={`w-12 h-12 bg-[#7CC6FE] p-4 rounded-xl flex items-center justify-center cursor-pointer ${selectedDosha !== 'vata' && "scale-75"} transition-all`} onClick={() => setSelectedDosha('vata')}>
                        <img src={doshalogo1} alt="icon" className="" />
                    </div>
                    <div title='Pitta Prakruti' className={`w-12 h-12 bg-[#E87461] p-4 rounded-xl flex items-center justify-center cursor-pointer ${selectedDosha !== 'pitta' && 'scale-75'} transition-all`} onClick={() => setSelectedDosha('pitta')}>
                        <img src={doshalogo2} alt="icon" className="" />
                    </div>
                    <div title='Kapha Prakruti'className={`w-12 h-12 bg-[#F9C80E] p-4 rounded-xl flex items-center justify-center cursor-pointer ${selectedDosha !== 'kapha' && 'scale-75'} transition-all`} onClick={() => setSelectedDosha('kapha')}>
                        <img src={doshalogo3} alt="icon" className="" />
                    </div>
                </div>

                <div className='text-center font-normal'>
                    {data?.desc?.map((item, index) => (
                        <div key={index} className={`text-lg mb-5 ${index === data?.desc?.length - 1 && 'font-medium'}`}>{item}</div>
                    ))}
                </div>

                <div className={`text-center flex ${isMinimized ? 'flex-col lg:flex-row' : 'flex-col items-center'} gap-5 my-3 justify-center`}>
                    {data?.compactPts?.map((item, index) => (
                        <div key={index} className={`flex flex-col gap-5 justify-start px-5 py-20 rounded-2xl w-full max-w-[400px]`} style={{ backgroundColor: item?.color}}>
                            {index === 0 && <img src={workout} alt="icon" className='w-16 h-16 mx-auto' />}
                            {index === 1 && <img src={asanas} alt="icon" className='w-16 h-16 mx-auto' />}
                            {index === 2 && <img src={rejuvenation} alt="icon" className='w-16 h-16 mx-auto' />}
                            <div className='text-2xl font-medium'>{item?.title}</div>
                            <div className='font-normal'>{item?.data}</div>
                        </div>
                    ))}
                </div>

                <div className='my-10 text-2xl font-medium text-center'>Asanas</div>
                <div className={`flex text-center ${isMinimized ? 'flex-col lg:flex-row' : 'flex-col items-center'} gap-10 my-5 justify-center mx-5`}>
                    {data?.asanas?.map((item, index) => (
                        <div className='w-full max-w-[400px] py-10 px-5 bg-slate-700 h-[450px] rounded-2xl text-white flex flex-col justify-end'>
                            <div className='text-xl font-medium'>{item.title}</div>
                        </div>
                    ))}
                </div>

                <div className='p-5 bg-[#E8EDDF] mt-10 rounded-2xl'>
                    <div className=' text-2xl font-medium text-center mb-5 mt-5'>Ideal Workout Session</div>                    
                    {data?.workout?.map((item, index) => (
                        <div className='mb-5'>
                            <div className='text-xl font-medium mb-1'>{item.title}</div>
                            <div className='font-normal ms-5'>{item.data}</div>
                        </div>
                    ))}
                </div>

                <div className='flex my-10 gap-5 items-center'>
                    <div className='w-[5rem] h-[1px] bg-black/50'></div>
                    <div className=' text-2xl font-medium'>Rejuvenation</div>
                </div>
                <div className={`flex-col flex ${isMinimized ? 'items-center lg:items-end gap-5 lg:gap-0' : 'items-center gap-5'} relative`}>
                    <div className={`${isMinimized ? 'w-full lg:w-8/12 px-0 lg:px-5' : 'w-full'} font-normal text-center`}>{data?.rejuvenation?.desc}</div>
                    <div className={`${isMinimized ? 'static lg:absolute w-full lg:w-4/12' : 'static w-full '} rounded-2xl p-10 max-w-[400px] aspect-square left-0 flex justify-center items-center`} style={{
                        backgroundColor: data?.rejuvenation?.color,
                    }}>
                        <img src={data?.rejuvenation?.img} alt="icon" className='w-full aspect-square' />
                    </div>
                    <div className={`${isMinimized ? 'w-full lg:w-9/12 p-0 lg:ps-10 lg:pt-10 lg:pe-5 lg:pb-10 gap-0 lg:gap-10 flex-col lg:flex-row rounded-2xl lg:rounded-none bg-white' : 'w-full flex-col gap-0 rounded-2xl'} flex z-10`}>
                        <div className={`bg-[#243227] text-white p-5 w-full ${isMinimized ? 'rounded-t-2xl lg:rounded-t-none pb-0 lg:pb-5' : 'rounded-t-2xl pb-0'}`}>
                            {data?.rejuvenation?.ptsList1?.map((item, index) => (
                                <div className='flex items-center gap-5 mb-5'>
                                    <div className='w-[8px] h-[8px] aspect-square rounded-full bg-white'></div>
                                    <div className='font-normal'>{item}</div>
                                </div>
                            ))}
                        </div>
                        <div className={`bg-[#243227] text-white p-5 w-full ${isMinimized ? 'rounded-b-2xl lg:rounded-b-none pt-0 lg:pt-5' : 'rounded-b-2xl pt-0'}`}>
                            {data?.rejuvenation?.ptsList2?.map((item, index) => (
                                <div className='flex items-center gap-4 mb-5'>
                                    <div className='w-[8px] h-[8px] aspect-square rounded-full bg-white'></div>
                                    <div className='font-normal'>{item}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Workout