import React, { useEffect, useState } from "react";
import { get_all_doctors } from "../controllers/doctorRoutes";
import doctor_image from "../assets/docimage.png";
import { setTabValue } from "../store/layout";
import { useDispatch } from "react-redux";

const DoctorCard = ({
  doctor_name,
  doctor_languages_spoken,
  doctor_preferred_comm,
  doctor_area_of_expertise,
  doctor_availability,
  doctor_clinic_address,
  doctor_clinic_name,
  doctor_consultant_type,
  doctor_contact_number,
  doctor_description,
  doctor_education,
  doctor_experience,
  doctor_specialization,
  doctor_website,
}) => (
  <>
    <div className="flex max-w-xl bg-gray-300 shadow-md rounded-md overflow-hidden my-4 mx-4">
      <img
        src={doctor_image}
        alt="Card Image"
        className="w-1/3 object-cover object-center"
      />
      <div className="w-2/3 p-4">
        <h2 className="text-xl font-bold mb-2">{doctor_name}</h2>
        <p className="text-gray-600 overflow-hidden overflow-ellipsis max-h-32">
          Description: <span className="text-black">{doctor_description}</span>
        </p>
        <p className="text-gray-600 overflow-hidden overflow-ellipsis max-h-32">
          Specialization: <span className="text-black">{doctor_specialization}</span>
        </p>
        <p className="text-gray-600 overflow-hidden overflow-ellipsis max-h-32">
          Consultant Type: <span className="text-black">{doctor_consultant_type}</span>
        </p>
        <p className="text-gray-600 overflow-hidden overflow-ellipsis max-h-32">
          Experience: <span className="text-black">{doctor_experience}</span>
        </p>
        <p className="text-gray-600 overflow-hidden overflow-ellipsis max-h-32">
          Education: <span className="text-black">{doctor_education}</span>
        </p>
        <p className="text-gray-600 overflow-hidden overflow-ellipsis max-h-32">
          Clinic Name: <span className="text-black">{doctor_clinic_name}</span>
        </p>
        <p className="text-gray-600 overflow-hidden overflow-ellipsis max-h-32">
          Clinic Address: <span className="text-black">{doctor_clinic_address}</span>
        </p>
        <p className="text-gray-600 overflow-hidden overflow-ellipsis max-h-32">
          Contact Number: <span className="text-black">{doctor_contact_number}</span>
        </p>
        <p className="text-gray-600 overflow-hidden overflow-ellipsis max-h-32">
          Languages Spoken: <span className="text-black">{doctor_languages_spoken.join(", ")}</span>
        </p>
        <p className="text-gray-600 overflow-hidden overflow-ellipsis max-h-32">
          Availability: <span className="text-black">{new Date(doctor_availability).toLocaleString()}</span>
        </p>
        <p className="text-gray-600 overflow-hidden overflow-ellipsis max-h-32">
          Preferred Communication: <span className="text-black">{doctor_preferred_comm.join(", ")}</span>
        </p>
        <p className="text-gray-600 overflow-hidden overflow-ellipsis max-h-32">
          Area of Expertise: <span className="text-black">{doctor_area_of_expertise.join(", ")}</span>
        </p>
        <p className="text-gray-600 overflow-hidden overflow-ellipsis max-h-32">
          Website: <span className="text-black">{doctor_website}</span>
        </p>
        {/* Add more details as needed */}
      </div>
    </div>
  </>
);

export default function Consultant() {
  const [doctors, setDoctors] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTabValue(3));
    get_all_doctors().then((res) => {
      console.log(res);
      setDoctors(res);
    });
  }, []);

  return (
    <>
      <div className="w-full h-full flex flex-col gap-5 p-5">
        <div className="text-2xl min-h-[2rem] flex items-center">
          Consultant (Doctor)
        </div>
        <div className="w-full h-[0.5px] bg-black/50 "></div>

        {/* Doctor cards */}
        <div className="overflow-y-auto max-h-[50rem]">
          <div className="flex flex-row m-4">
            {doctors.map((doctor, index) => (
              <DoctorCard key={index} {...doctor} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
