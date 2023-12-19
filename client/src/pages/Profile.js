import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsMinimized, setShowTabs, setTabValue } from "../store/layout";
import { LineChart } from "../components/Chart";
import { Box } from "@mui/material";

export default function Profile() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTabValue(7))
        if (localStorage.getItem('token') && window.innerWidth >= 1024)
            dispatch(setIsMinimized(false))
        window.innerWidth < 1024 && dispatch(setShowTabs(false))
    }, [])

    return (
        <Box m={2.5} pb={10} style={{
            overflowY: 'scroll',
            height: '100%',
        }}>

            <LineChart />
        </Box>

    )
}