import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsMinimized, setShowTabs, setTabValue } from "../store/layout";

export default function Profile(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTabValue(7))
        if (localStorage.getItem('token') && window.innerWidth >= 1024)
            dispatch(setIsMinimized(false))
        window.innerWidth < 1024 && dispatch(setShowTabs(false))
    }, [])
    
    return(
        'qwertyuiop'
    )
}