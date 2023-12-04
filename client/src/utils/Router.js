import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import InfoCenter from "../pages/InfoCenter";
import Community from "../pages/Community";
import About from "../pages/About";
import Results from "../pages/Results";
import Login from '../pages/Login';

export default function Router() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/infocenter" element={<InfoCenter />} />
                <Route exact path="/community" element={<Community />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/results" element={<Results />} />
                <Route exact path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
        </>
    );
}