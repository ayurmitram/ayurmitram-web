import React, { useEffect, useState } from "react";
import { get_all_doctors } from "../controllers/doctorRoutes";
import doctor_image from "../assets/docimage.png"

const DoctorCard = ({ doctor_name, description }) => (
    <>
    <div className="flex max-w-xl bg-gray-300 shadow-md rounded-md overflow-hidden mx-auto my-4">
      <img
        src={doctor_image}
        alt="Card Image"
        className="w-1/3 object-cover object-center"
      />
      <div className="w-2/3 p-4">
        <h2 className="text-xl font-bold mb-2">{doctor_name}</h2>
        <p className="text-gray-600 overflow-hidden overflow-ellipsis max-h-32">
          ewfnwehfbhewfewfgewgfyweyfugyfgweuyfgewygfwegfugy 
        </p>
      </div>
    </div>
    </>
//     <div className="mx-auto bg-red-500 rounded-lg overflow-hidden shadow-lg sm:flex">
//     <img
//       className="w-full h-40 m-2 rounded-xl"
//       src={doctor_image}
//       alt={doctor_name}
//     />
//     <div className="flex-1 p-4">
//       <h2 className="text-xl font-semibold">{doctor_name}</h2>
//       <p className="text-gray-600 mt-2">
//         dnhsdbjhsdbvjhbhjvbdsbjsdbdjsbvhsbvsdjvbdbdsjbdsjvbsdbvdc dvdsbdjsbvbbjdddsbdvdvfsdvfdshbsdvhbdsbjb
//       </p>
//     </div>
//   </div>
  );
  
  

export default function Consultant() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    get_all_doctors().then((res) => {
      console.log(res);
      setDoctors(res);
    });
  }, []);

  return (
    <>
      <div className="w-full h-full flex flex-col gap-5">
        <div className="text-2xl min-h-[2rem] flex items-center">
          Consultant (Doctor)
        </div>
        <div className="w-full h-[0.5px] bg-black/50 "></div>

        {/* Doctor cards */}
        <div className="overflow-y-auto max-h-[50rem]">
        <div className="grid grid-cols-1 gap-4">
          {doctors.map((doctor, index) => (
            <>
              <DoctorCard key={index} {...doctor} />
            </>
          ))}
        </div>
        </div>
      
      </div>
    </>
  );
}
