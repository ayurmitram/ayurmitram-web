import React, { useEffect } from "react";
import about1logo from "../assets/about1logo.svg";
import about2logo from "../assets/about2logo.svg";
import about3logo from "../assets/about3logo.svg";
import { useDispatch } from 'react-redux'
import { setIsMinimized, setTabValue } from '../store/layout';


const Card = ({
  title,
  content1,
  content2,
  classBigBox,
  classSmallBox,
  icon,
}) => (
  <div className={`relative ${classBigBox} rounded-xl max-w-md`}>
    {/* Square box at top left */}
    <div
      className={`w-16 h-16 rounded-xl ${classSmallBox} flex items-center justify-center`}
    >
      <img src={icon} alt="icon" className="" />
    </div>

    <div className="">
      {" "}
      {/* Adjust margin as needed */}
      <h2 className="text-black text-lg font-bold ">{title}</h2>
      <p className="text-gray-500 text-sm font-semibold">{content1}</p>
      <br></br>
      <p className="text-gray-500 text-sm font-semibold">{content2}</p>
    </div>
  </div>
);

export default function About() {
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(setTabValue(5))
      if (localStorage.getItem('token')) 
        dispatch(setIsMinimized(false))
  }, [])

  return (
    <div className="w-full h-full flex flex-col gap-5 p-5">
      <div className="text-2xl min-h-[2rem] flex items-center">
          About
      </div>
      <div className='w-full h-[0px] bg-black/50 '></div>

      <div className="flex flex-col items-center overflow-y-auto h-full">
        <Card
          title="Vata Prakruti"
          content1="Embracing Creativity and Flexibility"
          content2="Discover insights into the Vata prakruti and how to nurture your creative energy..."
          classBigBox="bg-[#ECFEFF] p-4 mb-4"
          classSmallBox="bg-[#7CC6FE] p-4 mb-4"
          icon={about1logo}
        />

        <Card
          title="Pitta Prakruti"
          content1="Harnessing Focus and Determination"
          content2="Learn about the dynamic energy of Pitta prakruti and ways to channel it for productivity..."
          classBigBox="bg-[#FFEAEA] p-4 mb-4"
          classSmallBox="bg-[#E87461] p-4 mb-4"
          icon={about2logo}
        />

        <Card
          title="Kapha Prakruti"
          content1="Embodying Stability and Nurturing Energy"
          content2="Explore the nurturing qualities of Kapha prakruti and discover how to tap into your inner strength..."
          classBigBox="bg-[#FFFEE3] p-4 mb-4"
          classSmallBox="bg-[#F9C80E] p-4 mb-4"
          icon={about3logo}
        />
      </div>
    </div>
  );
}
