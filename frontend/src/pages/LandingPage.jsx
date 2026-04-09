import React from 'react';
import PublicLayout from '../components/public/PublicLayout';
import Hero from '../components/public/Hero';
import Features from '../components/public/Features';
import Universities from '../components/public/Universities';
import Testimonials from '../components/public/Testimonials';

const LandingPage = () => {
    return (
        <PublicLayout>
            <Hero />
            <Features />
            <Universities />
            <Testimonials />
        </PublicLayout>
    );
};

export default LandingPage;