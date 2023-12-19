import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Avatar from '@mui/material/Avatar';
import { setIsMinimized, setTabValue } from "../store/layout";

export default function Profile(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTabValue(7))
        dispatch(setIsMinimized(false))
    }, [])

    const profile = {
        img: "",
        name: "John Doe",
        gender: 'M',
        age: 20,
        contact_number: "2343234543"
    }

    const result = {
        prakruti: "Vata",
    }
    
    return(
        // <div className="rounded-2xl h-full w-full p-5 flex flex-col gap-5">
        //     <div className="text-2xl min-h-[2rem] max-h-[2rem] flex items-center">
        //         Profile
        //     </div>
    
        //     <div className="w-full h-[0px] bg-black/50 "></div>
    
        //     <div className="h-full overflow-y-scroll w-full self-center flex flex-col gap-5 justify-start items-center max-w-[500px]">
        //         <Avatar alt={profile?.name} src="/static/images/avatar/1.jpg" sx={{
        //             width: '100px',
        //             height: '100px'
        //         }} />
        //         <div className="px-10 py-2 rounded-xl bg-[#539C52] text-white">{profile?.name}</div>
        //         <div className="flex gap-5 justify-between w-full">
        //             <div>{profile?.gender === 'M' ? 'Male' : 'Female'}</div>
        //             <div>{profile?.age} years</div>
        //             {typeof profile?.contact_number === 'string' && <div>+91 {profile?.contact_number?.slice(0,5)} {profile?.contact_number?.slice(5,10)}</div>}
        //             {typeof profile?.contact_number === 'number' && <div>+91 {profile?.contact_number / 100000} {profile?.contact_number % 100000}</div>}
        //         </div>
        //     </div>
        // </div>
        <div>qwertyuiop</div>
  
    )
}