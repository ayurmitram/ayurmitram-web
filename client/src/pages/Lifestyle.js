import doshalogo1 from "./../assets/about1logo.svg";
import doshalogo2 from "./../assets/about2logo.svg";
import doshalogo3 from "./../assets/about3logo.svg";
import lifestyle1 from "./../assets/lifestyle1.svg";
import lifestyle2 from "./../assets/lifestyle2.svg";
import lifestyle3 from "./../assets/lifestyle3.svg";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Button from "@mui/material/Button";
import { useEffect, useMemo, useRef, useState } from "react";
import { setIsMinimized, setTabValue } from "../store/layout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Lifestyle = () => {
  const [selectedDosha, setSelectedDosha] = useState("Vata");
  const isMinimized = useSelector((state) => state.layout.isMinimized);

  const car = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const vataData = {
    color: '#E6F5FF',
    img: lifestyle1,
    cards: [
      {
        title: 'Grounding',
        pts: [
          'Optimal exercise occurs during the Kapha time, from 6 am to 10 am, minimizing Vata aggravation.',
          'Cap off your resistance training with a grounding session. This final touch enhances the overall effectiveness of your workout.',
          'Consider barefoot workouts for a deeper connection to the earth, especially with body weight or resistance bands.',
          'Maintain a deliberate and slow tempo for muscle building, strength improvement, and mindfulness.'
        ]
      },
      {
        title: 'Smooth',
        pts: [
          'Begin with a warm-up session to prepare your body, open your joints, and connect your mind to the muscles you\'ll be training.',
          'Include a grounding session at the end, incorporating yoga asanas.',
          'Remember to breathe deeply throughout every exercise to maintain a smooth and effective fitness regimen.'
        ]
      },
      {
        title: 'Balancing',
        pts: [
          'Be mindful of the tempo, opting for a slow eccentric and concentric pace.',
          'Embrace outdoor exercise to calm your nervous system and bring balance to your body.',
          'Incorporate unilateral exercises, like standing on one leg or using one arm, for aesthetic harmony and to enhance balance and core stability.',
          'Prioritize core workouts to prevent chronic lower back pain, injuries, and maintain overall balance.'
        ]
      },
      {
        title: 'Oily',
        pts: [
          'For a Vata imbalance, apply small amounts of sesame or almond oil to your body, focusing on the legs, arms, and torso just before your workout.',
          'Prioritize self-care by massaging your feet and scalp with oil before bedtime, or indulge in the loving routine of abhyanga before a warm shower.',
          'Explore the practice of Nasya, applying herbal oil to the nasal passages.'
        ]
      },
      {
        title: 'Gross',
        pts: [
          'Incorporate weights into your strength training to enhance the heavy and gross characteristics that Vata dosha may lack.',
          'Embrace progressive overload.',
          'Steer clear of HIIT, plyometrics, and fast-paced cardio, as they may deplete your Prana and accelerate tissue waste, being light, clear, and mobile in nature.'
        ]
      }
    ]
  }

  const pittaData = {
    color: '#FBE3E1',
    img: lifestyle2,
    cards: [
      {
        title: 'Grounding',
        pts: [
          'Optimal exercise time is during the Kapha period, from 6 am to 10 am, minimizing Pitta aggravation.',
          'Try barefoot workouts for a grounded connection to the earth.',
          'Conclude your resistance training with a grounding session.',
          'Embrace a gradual, intentionally slow tempo in your movements, promoting muscle building, strength, recovery, and mindfulness, while fostering groundedness and coolness.'
        ]
      },
      {
        title: 'Smooth',
        pts: [
          'Begin with an activating session to engage your body, open joints, and connect mind to muscles for improved range of motion and smooth movements.',
          'Conclude with a grounding yoga session, stretching target muscles and promoting softness and equilibrium in the body.',
          'Ensure deep, consistent breathing throughout your entire workout for a smooth and effective fitness regimen.'
        ]
      },
      {
        title: 'Balancing',
        pts: [
          'Mind the tempo; a deliberate, slow pace aids fitness while keeping Pitta dosha cool and calm.',
          'Incorporate unilateral exercises for aesthetic harmony and improved balance and core stability.',
          'Prioritize core work to prevent lower back pain and injuries, maintaining balance and stability.'
        ]
      },
      {
        title: 'Cooling',
        pts: [
          'Take frequent rests throughout your workout.',
          'Drink room temperature water infused with lime or cucumbers. Avoid cold water, as it can disrupt digestion.',
          'Breathe deeply throughout each movement to minimize exposure to heat and other pitta-aggravating qualities.',
          'For Pitta dosha is essential to avoid working out later in the day.'
        ]
      },
    ]
  }

  const kaphaData = {
    color: '#FEF6D2',
    img: lifestyle3,
    cards: [
      {
        title: 'Sharpness',
        pts: [
          'Embrace the Kapha time for exercise, from 6 am to 10 am, to maximize its heavy and gross qualities.',
          'Maintain a swift and intentionally fast tempo in your movements.',
          'Incorporate plyometric exercises for overall body toning, efficient calorie burning, improved cardiovascular health, and a boosted metabolism.'
        ]
      },
      {
        title: 'Hotness',
        pts: [
          'Ensure to take short breaks during your workout to maintain optimal energy levels.',
          'Hydrate with room temperature water infused with pomegranate seeds.',
          'Deepen your breath during each movement.',
          'Leverage your Kapha endurance by increasing repetitions or time under tension in your exercises.'
        ]
      },
      {
        title: 'Mobility',
        pts: [
          'Prioritize a starting session to activate muscles and enhance your range of motion.',
          'Opt for low-impact, steady-state cardio to leverage your inherent Kapha endurance and strength.',
          'Experience muscle relief with post-workout foam rolling, breaking up scar tissue and enhancing circulation.'
        ]
      },
      {
        title: 'Fun and engaging workouts',
        pts: [
          'It\'s normal to feel lack of motivation after you have already started a fitness program.',
          'Select a diverse and challenging fitness routine that keeps you engaged.',
          'Vary your workout locations—home, gym, park - for a refreshing experience.'
        ]
      }
    ]
  }

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


  const data = useMemo(() => {
    if (selectedDosha === "Vata") return vataData;
    else if (selectedDosha === "Pitta") return pittaData;
    else return kaphaData;
  }, [selectedDosha]);

  useEffect(() => {
    dispatch(setTabValue(4));
    dispatch(setIsMinimized(true));
  }, []);

  return (
    // <div className="rounded-2xl h-full w-full p-5 flex flex-col gap-5">
    //   <div className="text-2xl min-h-[2rem] max-h-[2rem] flex items-center">
    //     <Button
    //       variant="outlined"
    //       color="lightGray"
    //       disableElevation
    //       onClick={() => navigate("/selfcare")}
    //     >
    //       <ArrowBackRoundedIcon color="secondary" className="mr-2" />
    //     </Button>
    //     Lifestyle Routine
    //   </div>

    //   <div className="w-full h-[0px] bg-black/50 "></div>

    //   <div className="h-full overflow-y-scroll w-full">
    //     <div className='flex gap-2 justify-center mb-4'>
    //         <div title='Vata Prakruti' className={`w-12 h-12 bg-[#7CC6FE] p-4 rounded-xl flex items-center justify-center cursor-pointer ${selectedDosha !== 'Vata' && "scale-75"} transition-all`} onClick={() => setSelectedDosha('Vata')}>
    //             <img src={doshalogo1} alt="icon" className="" />
    //         </div>
    //         <div title='Pitta Prakruti' className={`w-12 h-12 bg-[#E87461] p-4 rounded-xl flex items-center justify-center cursor-pointer ${selectedDosha !== 'Pitta' && 'scale-75'} transition-all`} onClick={() => setSelectedDosha('Pitta')}>
    //             <img src={doshalogo2} alt="icon" className="" />
    //         </div>
    //         <div title='Kapha Prakruti'className={`w-12 h-12 bg-[#F9C80E] p-4 rounded-xl flex items-center justify-center cursor-pointer ${selectedDosha !== 'Kapha' && 'scale-75'} transition-all`} onClick={() => setSelectedDosha('Kapha')}>
    //             <img src={doshalogo3} alt="icon" className="" />
    //         </div>
    //     </div>



    //     <div className='flex mt-10 gap-5 items-center w-full'>
    //       <div className={`flex-col flex ${isMinimized ? 'items-end' : 'items-center gap-5'} relative`}>
    //           <div className={`${isMinimized ? 'w-8/12 px-5' : 'w-full'} font-medium text-2xl pb-5 text-start`}>Lifestyle tips</div>
    //           <div className={`${isMinimized ? 'absolute w-4/12' : 'static w-full '} left-0 flex flex-col gap-5 justify-center items-center`}>
    //             <div className={`rounded-2xl p-10 max-w-[400px] aspect-square flex justify-center items-center`} style={{
    //                 backgroundColor: data?.color,
    //             }}>
    //                 <img src={data?.img} alt="icon" className='w-full aspect-square' />
    //             </div>
    //             <div className={`flex gap-4 w-10/12 justify-center items-center self-start ${isMinimized ? 'block': 'hidden'}`}>
    //                 <Button variant="outlined" color="lightGray" disableElevation onClick={() => right(car)}>
    //                   <ArrowBackIosNewRoundedIcon color="black" />
    //                 </Button>
    //                 <Button variant="outlined" color="lightGray" disableElevation onClick={() => left(car)}>
    //                   <ArrowForwardIosRoundedIcon color="black" />
    //                 </Button>
    //             </div>
    //           </div>
    //           <div ref={car} className={`${isMinimized ? 'w-9/12 ps-10 pt-10 pe-5 pb-10 gap-10 bg-white' : 'w-full p-5 flex-col gap-5'} rounded-3xl overflow-y-scroll flex z-10 snap-x`}>
    //             {data?.cards?.map((item, index) => (
    //               <div key={index} className={` min-w-[calc((100%_-_2rem)_/_2)] snap-block bg-[#243227] text-black p-5 w-full rounded-2xl`} style={{
    //                 backgroundColor: data?.color,
    //               }}>
    //                   <div className='mb-5 text-xl font-medium text-center'>{item?.title}</div>
    //                   {item?.pts?.map((it, i) => (
    //                       <div className='flex items-center gap-5 mb-5' key={i}>
    //                           <div className='w-[8px] h-[8px] aspect-square rounded-full bg-black'></div>
    //                           <div className='font-normal'>{it}</div>
    //                       </div>
    //                   ))}
    //               </div>
    //             ))}
    //           </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div>qwertyuiop</div>
  )
};

export default Lifestyle;
