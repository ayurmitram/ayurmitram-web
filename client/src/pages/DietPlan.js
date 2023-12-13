import dietBg1 from './../assets/dietBg1.png'
import dietBg2 from './../assets/dietBg2.png'
import dietBg3 from './../assets/dietBg3.png'
import doshalogo1 from './../assets/about1logo.svg'
import doshalogo2 from './../assets/about2logo.svg'
import doshalogo3 from './../assets/about3logo.svg'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Button from '@mui/material/Button'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setIsMinimized, setTabValue } from '../store/layout'

const DietPlan = () => {
    const [selectedDosha, setSelectedDosha] = useState('Vata')
    const beneficialRef = useRef(null)
    const avoidableRef = useRef(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const right = (parent) => {
        parent?.current?.scrollTo({
            left: parent?.current?.scrollLeft - parent?.current?.offsetWidth,
            behavior: 'smooth'
        })
    }
    const left = (parent) => {
        parent?.current?.scrollTo({
            left: parent?.current?.scrollLeft + parent?.current?.offsetWidth,
            behavior: 'smooth'
        })
    }

    const vataData = {
        title: 'Vata Prakruti',
        content1: "For those with a Vata constitution, the ideal diet is one that's nutritive, strengthening, calming, and grounding. This ensures a harmonious balance for your Vata nature.",
        content2: 'Gaining insight into tastes empowers us to make informed choices, irrespective of having an exhaustive list of Vata-pacifying foods readily available.',
        beneficialFoods : [
            {
                type: 'Sweet',
                tips: [
                    'Prioritize naturally sweet foods: fruits, grains, root vegetables, milk, ghee, fresh yogurt, eggs, nuts, seeds, oils, and lean meats.',
                    'The sweet taste forms the basis of a vata-pacifying diet, being predominant in many staple vata foods and serving as a primary source of nutrition.',
                    "Emphasizing sweetness doesn't mean excessive refined sugar or sugary foods, as this can worsen vata's tendency to over-exert and crash.",
                    'Naturally sweet foods provide grounding, nourishment, strength-building, and satisfaction in a vata-pacifying diet.'
                ]
            },
            {
                type: 'Sweet',
                tips: [
                    'Prioritize naturally sweet foods: fruits, grains, root vegetables, milk, ghee, fresh yogurt, eggs, nuts, seeds, oils, and lean meats.',
                    'The sweet taste forms the basis of a vata-pacifying diet, being predominant in many staple vata foods and serving as a primary source of nutrition.',
                    "Emphasizing sweetness doesn't mean excessive refined sugar or sugary foods, as this can worsen vata's tendency to over-exert and crash.",
                    'Naturally sweet foods provide grounding, nourishment, strength-building, and satisfaction in a vata-pacifying diet.'
                ]
            },
            {
                type: 'Sweet',
                tips: [
                    'Prioritize naturally sweet foods: fruits, grains, root vegetables, milk, ghee, fresh yogurt, eggs, nuts, seeds, oils, and lean meats.',
                    'The sweet taste forms the basis of a vata-pacifying diet, being predominant in many staple vata foods and serving as a primary source of nutrition.',
                    "Emphasizing sweetness doesn't mean excessive refined sugar or sugary foods, as this can worsen vata's tendency to over-exert and crash.",
                    'Naturally sweet foods provide grounding, nourishment, strength-building, and satisfaction in a vata-pacifying diet.'
                ]
            }
        ],
        foodsToAvoid: [
            {
                type: 'Pungent',
                tips: [
                    'Pungent, a spicy and hot flavor, is present in foods like chilies, radishes, turnips, raw onions, and various heating spices.',
                    'In moderation, mild spices are generally vata-pacifying. Refer to our resource on Vata-Pacifying Foods for a comprehensive list of herbs and spices to favor or reduce.',
                    'The pungent taste is characterized by being hot, dry, and light; excessive consumption can lead to extreme drying, aggravating the rough quality and potentially disturbing vata.'
                ]
            },
            {
                type: 'Pungent',
                tips: [
                    'Pungent, a spicy and hot flavor, is present in foods like chilies, radishes, turnips, raw onions, and various heating spices.',
                    'In moderation, mild spices are generally vata-pacifying. Refer to our resource on Vata-Pacifying Foods for a comprehensive list of herbs and spices to favor or reduce.',
                    'The pungent taste is characterized by being hot, dry, and light; excessive consumption can lead to extreme drying, aggravating the rough quality and potentially disturbing vata.'
                ]
            },
            {
                type: 'Pungent',
                tips: [
                    'Pungent, a spicy and hot flavor, is present in foods like chilies, radishes, turnips, raw onions, and various heating spices.',
                    'In moderation, mild spices are generally vata-pacifying. Refer to our resource on Vata-Pacifying Foods for a comprehensive list of herbs and spices to favor or reduce.',
                    'The pungent taste is characterized by being hot, dry, and light; excessive consumption can lead to extreme drying, aggravating the rough quality and potentially disturbing vata.'
                ]
            }
        ]
    }

    const pittaData = {
        title: 'Pitta Prakruti',
        content1: "For those with a Pitta constitution, the key to a harmonious diet lies in embracing a cooling, calming, cleansing, and nurturing approach. Picture your plate filled with cool, heavy, and slightly dry foods, creating a perfect balance for Pitta dosha.",
        content2: "Consider adding refreshing green juices to your anti-Pitta diet as a delightful twist. And here's a tip: establish a dedicated mealtime and stick to it religiously – this not only ensures regularity but also contributes to the overall well-being of your Pitta nature.",
        beneficialFoods: [
            {
                type: 'Sweet',
                tips: [
                    'Choose naturally sweet foods like ripe fruits, whole grains, sweet potatoes, honey, milk, and ghee to form the foundation of a pitta-pacifying diet.',
                    'The sweet taste plays a vital role in satisfying Pitta\'s nutritional needs and promoting overall balance.',
                    'It\'s crucial to avoid excessive refined sugars or overly sugary foods, as they can contribute to overheating in pitta dosha.',
                    'Embracing naturally sweet foods provides a cooling, calming, and nourishing effect, fostering equilibrium and satisfaction for individuals with a pitta constitution.'
                ]
            },
            {
                type: 'Bitter',
                tips: [
                    'Incorporate moderate amounts of bitter foods such as leafy greens (e.g., kale, arugula), bitter melon, asparagus, turmeric, and dark chocolate.',
                    'While not the primary focus of a meal, the bitter taste complements and balances other flavors in a pitta-pacifying diet.',
                    'Bitter foods possess cooling, light, and drying qualities, effectively counteracting the natural heat and intensity associated with pitta dosha.',
                    'Including these foods supports digestion, aids in detoxification, and helps alleviate excess heat, contributing to a more harmonious state for individuals with a pitta constitution.'
                ]
            },
            {
                type: 'Astringent',
                tips: [
                    'Include astringent flavors found in legumes (e.g., lentils, chickpeas), beans, pomegranate, apples, broccoli, and quinoa.',
                    'The astringent taste, characterized by dryness and mild contraction, helps offset pitta\'s tendency toward excess heat and inflammation.',
                    'While not the primary taste of a meal, incorporating astringent foods contributes to a well-rounded, pitta-pacifying diet, imparting a sense of balance and calm.',
                    'Astringent taste supports proper hydration, helps control excessive sweating, and promotes a cooling effect for individuals with pitta dosha.'
                ]
            },
            {
                type: 'Pungent',
                tips: [
                    'Incorporate pungent flavors in moderation, including mild spices like ginger, black pepper, and mustard.',
                    'While some mild spices are pitta-pacifying, excessive pungency can exacerbate pitta dosha.',
                    'It\'s essential to balance the pungent taste, as an overdose may contribute to heat and inflammation, disrupting the natural harmony of pitta.',
                    'Moderate pungency supports digestion, stimulates metabolism, and provides a subtle warmth for individuals with pitta constitution.'
                ]
            }
        ], 
        foodsToAvoid: [
            {
                type: 'Sour',
                tips: [
                    'Limit the intake of sour foods like citrus fruits, tomatoes, yogurt, and vinegar, as excess sourness can exacerbate pitta\'s heat.',
                    'While some sour tastes can be beneficial in moderation, an excess may contribute to acidity and inflammation in pitta dosha.',
                    'Restricting sour foods helps maintain a more balanced and cool internal environment, aligning with the specific needs of individuals with a pitta constitution.'
                ]
            },
            {
                type: 'Salty',
                tips: [
                    'Exercise moderation in salt intake, preferring high-quality sea salt or natural mineral salt over common table salt.',
                    'While salt enhances flavors, excessive intake may lead to increased heat and water retention, posing challenges for pitta dosha.',
                    'Striking a balance in salt consumption supports Pitta\'s digestive fire without causing unnecessary heat buildup or aggravation.'
                ]
            }
        ]
    }

    const kaphaData = {
        title: 'Kapha Prakruti',
        content1: "Tailored for Kapha individuals, an ideal diet leans towards being reducing, lightening, and stimulating.",
        content2: "Go for warm, light, and dry foods to strike the perfect balance for Kapha dosha. Consider this – setting a specific mealtime and adhering to it diligently not only promotes regularity but also aligns with the principles of a Kapha-pacifying diet.",
        beneficialFoods: [
            {
                type: 'Sweet',
                tips: [
                    'Choose naturally sweet foods like ripe fruits, whole grains, sweet potatoes, honey, milk, and ghee to form the foundation of a pitta-pacifying diet.',
                    'The sweet taste plays a vital role in satisfying Pitta\'s nutritional needs and promoting overall balance.',
                    'It\'s crucial to avoid excessive refined sugars or overly sugary foods, as they can contribute to overheating in pitta dosha.',
                    'Embracing naturally sweet foods provides a cooling, calming, and nourishing effect, fostering equilibrium and satisfaction for individuals with a pitta constitution.'
                ]
            },
            {
                type: 'Bitter',
                tips: [
                    'Incorporate moderate amounts of bitter foods such as leafy greens (e.g., kale, arugula), bitter melon, asparagus, turmeric, and dark chocolate.',
                    'While not the primary focus of a meal, the bitter taste complements and balances other flavors in a pitta-pacifying diet.',
                    'Bitter foods possess cooling, light, and drying qualities, effectively counteracting the natural heat and intensity associated with pitta dosha.',
                    'Including these foods supports digestion, aids in detoxification, and helps alleviate excess heat, contributing to a more harmonious state for individuals with a pitta constitution.'
                ]
            },
            {
                type: 'Astringent',
                tips: [
                    'Include astringent flavors found in legumes (e.g., lentils, chickpeas), beans, pomegranate, apples, broccoli, and quinoa.',
                    'The astringent taste, characterized by dryness and mild contraction, helps offset pitta\'s tendency toward excess heat and inflammation.',
                    'While not the primary taste of a meal, incorporating astringent foods contributes to a well-rounded, pitta-pacifying diet, imparting a sense of balance and calm.',
                    'Astringent taste supports proper hydration, helps control excessive sweating, and promotes a cooling effect for individuals with pitta dosha.'
                ]
            },
            {
                type: 'Pungent',
                tips: [
                    'Incorporate pungent flavors in moderation, including mild spices like ginger, black pepper, and mustard.',
                    'While some mild spices are pitta-pacifying, excessive pungency can exacerbate pitta dosha.',
                    'It\'s essential to balance the pungent taste, as an overdose may contribute to heat and inflammation, disrupting the natural harmony of pitta.',
                    'Moderate pungency supports digestion, stimulates metabolism, and provides a subtle warmth for individuals with pitta constitution.'
                ]
            }
        ], 
        foodsToAvoid: [
            {
                type: 'Sour',
                tips: [
                    'Limit the intake of sour foods like citrus fruits, tomatoes, yogurt, and vinegar, as excess sourness can exacerbate pitta\'s heat.',
                    'While some sour tastes can be beneficial in moderation, an excess may contribute to acidity and inflammation in pitta dosha.',
                    'Restricting sour foods helps maintain a more balanced and cool internal environment, aligning with the specific needs of individuals with a pitta constitution.'
                ]
            },
            {
                type: 'Salty',
                tips: [
                    'Exercise moderation in salt intake, preferring high-quality sea salt or natural mineral salt over common table salt.',
                    'While salt enhances flavors, excessive intake may lead to increased heat and water retention, posing challenges for pitta dosha.',
                    'Striking a balance in salt consumption supports Pitta\'s digestive fire without causing unnecessary heat buildup or aggravation.'
                ]
            }
        ]
    }

    const data = useMemo(() => {
        if (selectedDosha === 'Vata') return vataData
        else if (selectedDosha === 'Pitta') return pittaData
        else return kaphaData
    }, [selectedDosha])

    useEffect(() => {
        dispatch(setTabValue(4))
        dispatch(setIsMinimized(true))
    }, [])

    return (
        <div className='rounded-2xl h-full w-full p-5 flex flex-col gap-5' style={{
            backgroundImage: `url(${selectedDosha === 'Vata' ? dietBg1 : selectedDosha === 'Pitta' ? dietBg2 : dietBg3})`,
            backgroundSize: 'cover',
            backgroundPosition: selectedDosha === 'Vata' ? 'center' : 'bottom',
            backgroundRepeat: 'no-repeat',
        }}>
            <div className="text-2xl min-h-[2rem] max-h-[2rem] flex items-center">
                <Button variant="outlined" color='lightGray' disableElevation onClick={() => navigate('/selfcare')}>
                    <ArrowBackRoundedIcon color='secondary' className='mr-2' />
                </Button>
                Diet Plan
            </div>

            <div className='w-full h-[0px] bg-black/50 '></div>

            <div className='h-full overflow-y-scroll'>
                <div className='flex gap-2 justify-center mb-4'>
                    <div title='Vata Prakruti' className={`w-12 h-12 bg-[#7CC6FE] p-4 rounded-xl flex items-center justify-center cursor-pointer ${selectedDosha !== 'Vata' && "scale-75"} transition-all`} onClick={() => setSelectedDosha('Vata')}>
                        <img src={doshalogo1} alt="icon" className="" />
                    </div>
                    <div title='Pitta Prakruti' className={`w-12 h-12 bg-[#E87461] p-4 rounded-xl flex items-center justify-center cursor-pointer ${selectedDosha !== 'Pitta' && 'scale-75'} transition-all`} onClick={() => setSelectedDosha('Pitta')}>
                        <img src={doshalogo2} alt="icon" className="" />
                    </div>
                    <div title='Kapha Prakruti'className={`w-12 h-12 bg-[#F9C80E] p-4 rounded-xl flex items-center justify-center cursor-pointer ${selectedDosha !== 'Kapha' && 'scale-75'} transition-all`} onClick={() => setSelectedDosha('Kapha')}>
                        <img src={doshalogo3} alt="icon" className="" />
                    </div>
                </div>

                <div className='font-normal text-center mb-4'>{data?.content1}</div>
                <div className='font-normal text-center'>{data?.content2}</div>

                <div className='mb-4 mt-12 text-2xl font-medium'>Food beneficial to {selectedDosha} Dosha</div>
                <div className='flex gap-5 w-full overflow-x-scroll snap-x' ref={beneficialRef}>
                    {data?.beneficialFoods?.map((food, index) => (
                        <div key={index} className='min-w-full snap-center'>
                            <div className='flex items-center justify-between'>
                                <Button variant='outlined' color='lightGray' disableElevation size='small' onClick={() => right(beneficialRef)}>
                                    <ArrowBackIosNewRoundedIcon sx={{ color: '#000' }} />
                                </Button>
                                <div className='text-center text-2xl font-medium'>{food?.type}</div>
                                <Button variant='outlined' color='lightGray' disableElevation size='small' onClick={() => left(beneficialRef)}>
                                    <ArrowForwardIosRoundedIcon sx={{ color: '#000' }} />
                                </Button>
                            </div>
                            <div className='flex gap-3 mb-3 justify-center items-center'>
                                {data?.beneficialFoods.map((x, i) => (
                                    <div className={`w-[12px] h-[12px] rounded-full bg-[#D0E1EE] transition-all ${i === index && 'w-[20px] h-[20px]'}`}></div>
                                ))}
                            </div>
                            <div className='flex flex-col gap-2 mb-3'>
                                {food?.tips.map((tip, i) => (
                                    <div key={i} className='font-normal flex items-center gap-4'>
                                        <div className='w-[8px] h-[8px] aspect-square rounded-full bg-black' />
                                        {tip}
                                    </div>
                                ))}
                            </div>

                        </div>
                    ))}
                </div>
                <div className='mb-4 mt-12 text-2xl font-medium'>Food to avoid for {selectedDosha} Dosha</div>
                <div className='flex gap-5 w-full overflow-x-scroll snap-x' ref={avoidableRef}>
                    {data?.foodsToAvoid?.map((food, index) => (
                        <div key={index} className='min-w-full snap-center'>
                            <div className='flex items-center justify-between'>
                                <Button variant='outlined' color='lightGray' disableElevation size='small' onClick={() => right(avoidableRef)}>
                                    <ArrowBackIosNewRoundedIcon sx={{ color: '#000' }} />
                                </Button>
                                <div className='text-center text-2xl font-medium'>{food?.type}</div>
                                <Button variant='outlined' color='lightGray' disableElevation size='small' onClick={() => left(avoidableRef)}>
                                    <ArrowForwardIosRoundedIcon sx={{ color: '#000' }} />
                                </Button>
                            </div>
                            <div className='flex gap-3 mb-3 justify-center items-center'>
                                {data?.foodsToAvoid?.map((x, i) => (
                                    <div className={`w-[12px] h-[12px] rounded-full bg-[#D0E1EE] transition-all ${i === index && 'w-[20px] h-[20px]'}`}></div>
                                ))}
                            </div>
                            <div className='flex flex-col gap-2 mb-3'>
                                {food?.tips.map((tip, i) => (
                                    <div key={i} className='font-normal flex items-center gap-4'>
                                        <div className='w-[8px] h-[8px] aspect-square rounded-full bg-black' />
                                        {tip}
                                    </div>
                                ))}
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DietPlan