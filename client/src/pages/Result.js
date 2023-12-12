import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsMinimized, setTabValue } from "../store/layout";

export default function Result() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTabValue(2))
        dispatch(setIsMinimized(true))
    }, [])
    return(
        <>
            qwertyuiop
        </>
    )
}