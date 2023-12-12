import dietBg1 from './../assets/dietBg1.png'
import dietBg2 from './../assets/dietBg2.png'
import dietBg3 from './../assets/dietBg3.png'
import doshalogo1 from './../assets/about1logo.svg'
import doshalogo2 from './../assets/about2logo.svg'
import doshalogo3 from './../assets/about3logo.svg'
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import { useMemo, useState } from 'react'

const DietPlan = () => {
    const [selectedDosha, setSelectedDosha] = useState('Vata')

    const vataData = {
        title: 'Vata Prakruti',
        content1: "For those with a Vata constitution, the ideal diet is one that's nutritive, strengthening, calming, and grounding. This ensures a harmonious balance for your Vata nature.",
        content2: 'Gaining insight into tastes empowers us to make informed choices, irrespective of having an exhaustive list of Vata-pacifying foods readily available.',
        beneficialFoods : {
            type: 'Sweet',
            tips: [
                'Prioritize naturally sweet foods: fruits, grains, root vegetables, milk, ghee, fresh yogurt, eggs, nuts, seeds, oils, and lean meats.',
                'The sweet taste forms the basis of a vata-pacifying diet, being predominant in many staple vata foods and serving as a primary source of nutrition.',
                "Emphasizing sweetness doesn't mean excessive refined sugar or sugary foods, as this can worsen vata's tendency to over-exert and crash.",
                'Naturally sweet foods provide grounding, nourishment, strength-building, and satisfaction in a vata-pacifying diet.'
            ]
        },
        foodsToAvoid: {
            type: 'Pungent',
            tips: [
                'Pungent, a spicy and hot flavor, is present in foods like chilies, radishes, turnips, raw onions, and various heating spices.',
                'In moderation, mild spices are generally vata-pacifying. Refer to our resource on Vata-Pacifying Foods for a comprehensive list of herbs and spices to favor or reduce.',
                'The pungent taste is characterized by being hot, dry, and light; excessive consumption can lead to extreme drying, aggravating the rough quality and potentially disturbing vata.'
            ]
        }
    }

    const pittaData = {
        title: 'Pitta Prakruti',
        content1: "For those with a Pitta constitution, the key to a harmonious diet lies in embracing a cooling, calming, cleansing, and nurturing approach. Picture your plate filled with cool, heavy, and slightly dry foods, creating a perfect balance for Pitta dosha.",
        content2: "Consider adding refreshing green juices to your anti-Pitta diet as a delightful twist. And here's a tip: establish a dedicated mealtime and stick to it religiously – this not only ensures regularity but also contributes to the overall well-being of your Pitta nature.",
        beneficialFoods: {
            type: 'Sweet',
            tips: [
                'Prioritize naturally sweet foods: sweet fruits, most grains, squashes, root vegetables, milk, ghee, and fresh yogurt',
                'The sweet taste, being cooling and heavy, offers various benefits, including pacifying heat, satisfying thirst, benefiting the skin and hair, and providing grounding, nourishment, strength building, and satisfaction.',
                "It's important to note that emphasizing the sweet taste doesn't mean consuming large amounts of refined sugar or sugary sweets; the focus should be on naturally sweet foods for optimal balance."
            ]
        }, 
        foodsToAvoid: {
            type: 'Pungent',
            tips: [
                'Pungent, a spicy and hot flavor, is present in foods like chilies, radishes, turnips, raw onions, and various heating spices.',
                'In moderation, mild spices are generally pitta-pacifying. Refer to our resource on Pitta-Pacifying Foods for a comprehensive list of herbs and spices to favor or reduce.',
                'The pungent taste is characterized by being hot, dry, and light; excessive consumption can lead to extreme drying, aggravating the rough quality and potentially disturbing pitta.'
            ]
        }
    }

    const kaphaData = {
        title: 'Kapha Prakruti',
        content1: "Tailored for Kapha individuals, an ideal diet leans towards being reducing, lightening, and stimulating.",
        content2: "Go for warm, light, and dry foods to strike the perfect balance for Kapha dosha. Consider this – setting a specific mealtime and adhering to it diligently not only promotes regularity but also aligns with the principles of a Kapha-pacifying diet.",
        beneficialFoods: {
            type: 'Pungent',
            tips: [
                'Pungent taste, found in spices like chilies, radishes, and onions, is highly Kapha-pacifying.',
                'Embrace a variety of mild spices such as cardamom, cinnamon, and turmeric for Kapha balance.',
                'Pungency, with its light, hot, rough, and dry qualities, stimulates digestion, clears bodily channels, and thins the blood in Kapha individuals.'
            ]
        },
        foodsToAvoid: {
            type: 'Sweet',
            tips: [
                'The sweet taste, being heavy, moist, and cooling, is generally Kapha-aggravating.',
                'Favor naturally sweet foods like fruits, grains, root vegetables, milk, ghee, and fresh yogurt.',
                "Avoid refined sugar and sugary foods, as these can worsen Kapha's tendency to become overweight and congested."
            ]
        }
    }

    const data = useMemo(() => {
        if (selectedDosha === 'Vata') return vataData
        else if (selectedDosha === 'Pitta') return pittaData
        else return kaphaData
    }, [selectedDosha])

    return (
        <div className='rounded-2xl h-full w-full p-5 flex flex-col gap-5' style={{
            backgroundImage: `url(${selectedDosha === 'Vata' ? dietBg1 : selectedDosha === 'Pitta' ? dietBg2 : dietBg3})`,
            backgroundSize: 'cover',
            backgroundPosition: selectedDosha === 'Vata' ? 'center' : 'bottom',
            backgroundRepeat: 'no-repeat',
        }}>
            <div className="text-2xl min-h-[2rem] flex items-center">
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

                <div className='mb-4 mt-12 text-xl font-medium'>Food beneficial to {selectedDosha} Dosha</div>
                <div className='text-center text-xl font-medium mb-3'>{data?.beneficialFoods?.type}</div>
                <div className='flex flex-col gap-2'>
                    {data?.beneficialFoods?.tips.map((tip, index) => (
                        <div key={index} className='font-normal flex items-center gap-4'>
                            <div className='w-[8px] h-[8px] aspect-square rounded-full bg-black' />
                            {tip}
                        </div>
                    ))}
                </div>
                <div className='mb-4 mt-12 text-xl font-medium'>Food to avoid for {selectedDosha} Dosha</div>
                <div className='text-center text-xl font-medium mb-3'>{data?.foodsToAvoid?.type}</div>
                <div className='flex flex-col gap-2'>
                    {data?.foodsToAvoid?.tips.map((tip, index) => (
                        <div key={index} className='font-normal flex items-center gap-4'>
                            <div className='w-[8px] h-[8px] aspect-square rounded-full bg-black' />
                            {tip}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DietPlan