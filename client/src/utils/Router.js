import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import InfoCenter from "../pages/InfoCenter";
import Community from "../pages/Community";
import About from "../pages/About";
import Results from "../pages/Results";
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Layout from '../components/Layout';
import FindPrakruti from '../pages/FindPrakruti';

export default function Router() {
    return (
        <>
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/infocenter" element={<InfoCenter />} />
                    <Route exact path="/community" element={<Community />} />
                    <Route exact path="/about" element={<About />} />
                    <Route exact path="/results" element={<Results />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/signup" element={<Signup />} />
                    <Route exact path="/find-your-prakruti" element={<FindPrakruti />} />
                </Routes>
            </Layout>
        </BrowserRouter>
        </>
    );
}