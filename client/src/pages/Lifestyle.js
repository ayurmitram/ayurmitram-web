import doshalogo1 from "./../assets/about1logo.svg";
import doshalogo2 from "./../assets/about2logo.svg";
import doshalogo3 from "./../assets/about3logo.svg";
import lifestyle1 from "./../assets/lifestyle1.svg";
import lifestyle2 from "./../assets/lifestyle2.svg";
import lifestyle3 from "./../assets/lifestyle3.svg";
import workout from "./../assets/workout.svg";
import asanas from "./../assets/asanas.svg";
import rejuvenation from "./../assets/rejuvenation.svg";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Button from "@mui/material/Button";
import { useEffect, useMemo, useState } from "react";
import { setIsMinimized, setTabValue } from "../store/layout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Lifestyle = () => {
  const [selectedDosha, setSelectedDosha] = useState("Vata");
  const isMinimized = useSelector((state) => state.layout.isMinimized);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const vataData = {
    desc: [
      "As you possess a Vata body type, finding the right workout routine plays a crucial role in maintaining a healthy lifestyle, but it can be a bit confusing and challenging.",
      "Balancing the requirement for light exercises like walking or Yin Yoga, perfect for calming the airy Vata constitution, with the aspiration for a fit appearance and strong bones introduces unique challenges. Addressing these valid concerns becomes essential as you navigate your fitness journey, tailored to the delicate Vata frame.",
      "The key word is moderation.",
    ],
    compactPts: [
      {
        color: "#E6F5FF",
        title: "Ideal Workout Session",
        data: "Optimize workouts with gentle strength training, deep breathing, gradual tempo, and grounding asanas",
      },
      {
        color: "#E6F5FF",
        title: "Asansas",
        data: "Experience the depth of knowledge from experts across all areas of yoga.",
      },
      {
        color: "#E6F5FF",
        title: "Rejuvenation",
        data: "An essential aspect of a comprehensive Ayurveda fitness routine for Vata dosha involves prioritizing rejuvenation.",
      },
    ],
    asanas: [
      {
        title: "Paschimottanasana",
        img: "",
      },
      {
        title: "Vrikshasana",
        img: "",
      },
      {
        title: "Tadasana",
        img: "",
      },
    ],
    workout: [
      {
        title: "Warm-up Phase",
        data: "Begin with a brief activation circuit (2-5 minutes) to engage targeted muscles, fostering a connection between mind and body for full presence.",
      },
      {
        title: "Training Phase",
        data: "Commence your workout routine, focusing on the tempo of each exercise. Execute movements with controlled precision, emphasizing mindful repetition.",
      },
      {
        title: "Cool-down Phase",
        data: "Conclude with grounding movements, including stretching, self-massage, and deep breathing. Feel your body, promote relaxation, and culminate with Savasana for a holistic conclusion.",
      },
    ],
    rejuvenation: {
      img: lifestyle1,
      color: "#E6F5FF",
      desc: "Focusing on increasing Ojas and achieving mind-body balance is crucial. Follow these Ayurvedic tips to enhance fitness without aggravating Vata:",
      ptsList1: [
        "Optimal exercise occurs during the Kapha time, from 6 am to 10 am, minimizing Vata aggravation.",
        "Cap off your resistance training with a grounding session. This final touch enhances the overall effectiveness of your workout.",
        "Consider barefoot workouts for a deeper connection to the earth, especially with body weight or resistance bands. ",
        "Maintain a deliberate and slow tempo for muscle building, strength improvement, and mindfulness. ",
      ],
      ptsList2: [
        "Begin with a warm-up session to prepare your body, open your joints, and connect your mind to the muscles you'll be training.",
        "Include a grounding session at the end, incorporating yoga asanas.",
        "Remember to breathe deeply throughout every exercise to maintain a smooth and effective fitness regimen.",
      ],
    },
  };

  const pittaData = {
    desc: [
      "For you, with a Pitta constitution, achieving a fit appearance, preventing muscle loss, and keeping strong bones are key priorities that deserve your attention and care.",
      "As you engage in workouts, bring mindfulness and intentionality, specifically targeting the reduction of excessive fire and oily qualities that may already exist in your Pitta constitution.",
      "Through the inclusion of strength training and progressive overload, you'll fortify your legs, arms, glutes, and core, preventing potential back issues. Embrace calming and grounding asanas to boost flexibility, ward off tightness, and cool your body—maximizing the benefits for your Pitta constitution.",
      "Pitta aligns closely with physical activity. Be in moderation.",
    ],
    compactPts: [
      {
        color: "#FBE3E1",
        title: "Ideal Workout Session",
        data: "Gentle strength training, deep breathing, gradual tempo, and grounding asanas optimize workout benefits",
      },
      {
        color: "#FBE3E1",
        title: "Asansas",
        data: "Experience the depth of knowledge from experts across all areas of yoga via videos",
      },
      {
        color: "#FBE3E1",
        title: "Rejuvenation",
        data: "Rejuvenation should be a special component of an adequate Ayurvedic fitness routine for Pitta dosha.",
      },
    ],
    asanas: [
      {
        title: "Chandra Namaskar",
        img: "",
      },
      {
        title: "Baddha Konasana",
        img: "",
      },
      {
        title: "Virasana",
        img: "",
      },
    ],
    workout: [
      {
        title: "Warm-up Phase",
        data: "Commence your session with a brief activation circuit (2-5 minutes) to engage the muscles targeted in your training. This phase serves as an opportune moment to establish a connection between mind and muscles, fostering full presence.",
      },
      {
        title: "Training Phase",
        data: "Initiate your workout routine, giving thoughtful consideration to the tempo of each exercise. Focus on the speed at which you execute each repetition, emphasizing controlled and precise movements throughout.",
      },
      {
        title: "Cool-down Phase",
        data: "Conclude your session with grounding movements, incorporating stretches, self-massage, and deep breathing exercises. Take the time to attune to your body, breathe deeply, and induce a state of relaxation. Complete your practice with the restorative Savasana pose for a holistic conclusion.",
      },
    ],
    rejuvenation: {
      img: lifestyle2,
      color: "#FBE3E1",
      desc: "Rejuvenation holds a distinct place in a well-rounded Ayurvedic fitness regimen tailored for Pitta dosha.",
      ptsList1: [
        "Optimal exercise time is during the Kapha period, from 6 am to 10 am, minimizing Pitta aggravation.",
        "Try barefoot workouts for a grounded connection to the earth.",
        "Conclude your resistance training with a grounding session.",
        "Embrace a gradual, intentionally slow tempo in your movements, promoting muscle building, strength, recovery, and mindfulness, while fostering groundedness and coolness.",
      ],
      ptsList2: [
        "Begin with an activating session to engage your body, open joints, and connect mind to muscles for improved range of motion and smooth movements.",
        "Conclude with a grounding yoga session, stretching target muscles and promoting softness and equilibrium in the body.",
        "Ensure deep, consistent breathing throughout your entire workout for a smooth and effective fitness regimen.",
      ],
    },
  };

  const kaphaData = {
    desc: [
      "As you have a Kapha dosha, opt for stimulating exercises such as brisk walking, running, or hiking - they work wonders for your body type.",
      "By incorporating strength training, progressive overload, plyometrics, and steady forms of cardio, you can achieve beautifully sculpted legs, arms, and glutes, along with a solid core to prevent potential back problems in the future.",
      "Additionally, integrating calming and grounding asanas into your routine can prevent tightness, enhance both inner and outer flexibility, and expand your range of motion.",
      "The keywords are intensity and potency.",
    ],
    compactPts: [
      {
        color: "#FEF6D2",
        title: "Ideal Workout Session",
        data: "Kaphas, often sluggish, benefit from consistent, energetic workouts, melting excess fat, promoting a lighter body, and enhancing endurance.",
      },
      {
        color: "#FEF6D2",
        title: "Asansas",
        data: "Experience the depth of knowledge from experts across all areas of yoga via videos",
      },
      {
        color: "#FEF6D2",
        title: "Rejuvenation",
        data: "Incorporating rejuvenation is a crucial element of a well-rounded Ayurvedic fitness regimen tailored for Kapha dosha.",
      },
    ],
    asanas: [
      {
        title: "Surya Namaskar",
        img: "",
      },
      {
        title: "Ustrasana",
        img: "",
      },
      {
        title: "Urdhva Mukha Svanasana",
        img: "",
      },
    ],
    workout: [
      {
        title: "Warm-up Phase",
        data: "Embark on a brief activation circuit (2-5 minutes) to engage target muscles, fostering a connection between mind and body for full presence.",
      },
      {
        title: "Training Phase",
        data: "Initiate your workout routine, focusing on the tempo of each exercise—the speed at which you perform each repetition. Execute each movement in an invigorating and controlled manner.",
      },
      {
        title: "Cool-down Phase",
        data: "Conclude with grounding movements, including stretching, self-massage, and deep breathing. Immerse yourself in the sensory experience, taking deep breaths and relaxing. Finish with a plank for a final moment of strength and stability.",
      },
    ],
    rejuvenation: {
      img: lifestyle3,
      color: "#FEF6D2",
      desc: "Here are Ayurvedic strategies for you to get in the best shape of your life while avoiding the exacerbation of Kapha.",
      ptsList1: [
        "Engage in workouts 5 to 6 days a week, ensuring at least one day of rest.",
        "Prioritize joint care with Mustard oil massages.",
        "Incorporate milk decoctions with nourishing spices like Ashwagandha.",
      ],
      ptsList2: [
        "Aim for 45-60 minutes of exercise with a fast intensity to maximize your fitness routine.",
        "Immerse yourself in nature as part of your green therapy for a refreshing and balancing effect.",
        "Conclude your exercise session with planks, adding a final touch of strength and stability.",
      ],
    },
  };

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
    <div className="rounded-2xl h-full w-full p-5 flex flex-col gap-5">
      <div className="text-2xl min-h-[2rem] max-h-[2rem] flex items-center">
        <Button
          variant="outlined"
          color="lightGray"
          disableElevation
          onClick={() => navigate("/selfcare")}
        >
          <ArrowBackRoundedIcon color="secondary" className="mr-2" />
        </Button>
        Lifestyle Routine
      </div>

      <div className="w-full h-[0px] bg-black/50 "></div>

      <div className="h-full overflow-y-scroll">
        <div className="flex gap-2 justify-center mb-4">
          <div
            title="Vata Prakruti"
            className={`w-12 h-12 bg-[#7CC6FE] p-4 rounded-xl flex items-center justify-center cursor-pointer ${
              selectedDosha !== "Vata" && "scale-75"
            } transition-all`}
            onClick={() => setSelectedDosha("Vata")}
          >
            <img src={doshalogo1} alt="icon" className="" />
          </div>
          <div
            title="Pitta Prakruti"
            className={`w-12 h-12 bg-[#E87461] p-4 rounded-xl flex items-center justify-center cursor-pointer ${
              selectedDosha !== "Pitta" && "scale-75"
            } transition-all`}
            onClick={() => setSelectedDosha("Pitta")}
          >
            <img src={doshalogo2} alt="icon" className="" />
          </div>
          <div
            title="Kapha Prakruti"
            className={`w-12 h-12 bg-[#F9C80E] p-4 rounded-xl flex items-center justify-center cursor-pointer ${
              selectedDosha !== "Kapha" && "scale-75"
            } transition-all`}
            onClick={() => setSelectedDosha("Kapha")}
          >
            <img src={doshalogo3} alt="icon" className="" />
          </div>
        </div>

        {/* <div className='text-center font-normal'>
                    {data?.desc?.map((item, index) => (
                        <div key={index} className={`text-lg mb-5 ${index === data?.desc?.length - 1 && 'font-medium'}`}>{item}</div>
                    ))}
                </div> */}

        {/* <div className={`text-center flex ${isMinimized ? 'flex-row' : 'flex-col items-center'} gap-5 my-3 justify-center`}>
                    {data?.compactPts?.map((item, index) => (
                        <div key={index} className={`flex flex-col gap-5 justify-start px-5 py-20 rounded-2xl w-full max-w-[400px]`} style={{ backgroundColor: item?.color}}>
                            {index === 0 && <img src={workout} alt="icon" className='w-16 h-16 mx-auto' />}
                            {index === 1 && <img src={asanas} alt="icon" className='w-16 h-16 mx-auto' />}
                            {index === 2 && <img src={rejuvenation} alt="icon" className='w-16 h-16 mx-auto' />}
                            <div className='text-2xl font-medium'>{item?.title}</div>
                            <div className='font-normal'>{item?.data}</div>
                        </div>
                    ))}
                </div> */}

        {/* <div className='my-10 text-2xl font-medium text-center'>Asanas</div>
                <div className={`flex text-center ${isMinimized ? 'flex-row' : 'flex-col items-center'} gap-10 my-5 justify-center mx-5`}>
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
                </div> */}

        {/* <div className='flex my-10 gap-5 items-center'>
                    <div className='w-[5rem] h-[1px] bg-black/50'></div>
                    <div className=' text-2xl font-medium'>Rejuvenation</div>
                </div> */}
        <div
          className={`flex-col flex ${
            isMinimized ? "items-end" : "items-center gap-5"
          } relative`}
        >
          <div
            className={`${
              isMinimized ? "absolute w-4/12" : "static w-full "
            } rounded-2xl p-10 max-w-[500px] aspect-square left-0 flex justify-center items-center`}
            style={{
              backgroundColor: data?.rejuvenation?.color,
            }}
          >
            <img
              src={data?.rejuvenation?.img}
              alt="icon"
              className="w-full aspect-square"
            />
          </div>
          <div
            className={`${
              isMinimized
                ? "w-9/12 ps-10 pt-10 pe-5 pb-10 gap-10 bg-white"
                : "w-full flex-col gap-0 rounded-2xl"
            } flex z-10`}
          >
            <div
              style={{
                backgroundColor:
                  selectedDosha === "Vata"
                    ? vataData?.rejuvenation?.color
                    : selectedDosha === "Pitta"
                    ? pittaData?.rejuvenation?.color
                    : kaphaData?.rejuvenation?.color,
              }}
              className={`text-black p-5 w-full ${
                isMinimized ? "rounded-2xl" : "rounded-t-2xl pb-0"
              }`}
            >
              {data?.rejuvenation?.ptsList1?.map((item, index) => (
                <div className="flex items-center gap-5 mb-5">
                  <div className="font-semibold">{item}</div>
                </div>
              ))}
            </div>
            <div
              style={{
                backgroundColor:
                  selectedDosha === "Vata"
                    ? vataData?.rejuvenation?.color
                    : selectedDosha === "Pitta"
                    ? pittaData?.rejuvenation?.color
                    : kaphaData?.rejuvenation?.color,
              }}
              className={`text-black p-5 w-full ${
                isMinimized ? "rounded-2xl" : "rounded-b-2xl pt-0"
              }`}
            >
              {data?.rejuvenation?.ptsList2?.map((item, index) => (
                <div className="flex items-center gap-4 mb-5">
                  <div className="font-semibold">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lifestyle;
