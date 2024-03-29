import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Layout from '../components/Layout';
import FindPrakruti from '../pages/FindPrakruti';
import Consultant from '../pages/Consultant';
import SelfCare from '../pages/SelfCare';
import DietPlan from '../pages/DietPlan';
import Profile from '../pages/Profile';
import Workout from '../pages/Workout';
import Lifestyle from '../pages/Lifestyle';
import OnboardingDoctor from '../pages/OnboardingDoctor';

export default function Router() {
    return (
        <>
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/find-your-prakruti" element={<FindPrakruti />} />
                    <Route exact path="/consultant" element={<Consultant />} />
                    <Route exact path="/selfcare" element={<SelfCare />} />
                    <Route exact path="/selfcare/diet" element={<DietPlan />} />
                    <Route exact path="/selfcare/workout" element={<Workout />} />
                    <Route exact path="/selfcare/lifestyle" element={<Lifestyle />} />
                    <Route exact path="/about" element={<About />} />
                    <Route exact path="/profile" element={<Profile />} />
                    <Route exact path="/signup" element={<Signup />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/onboarding/doctor" element={<OnboardingDoctor />} />
                </Routes>
            </Layout>
        </BrowserRouter>
        </>
    );
}