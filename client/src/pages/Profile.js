import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsMinimized, setTabValue } from "../store/layout";

export default function Profile(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTabValue(7))
        dispatch(setIsMinimized(false))
    }, [])
    
    return(
        <>
        </>
    )
}