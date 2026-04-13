import React from 'react';
import PublicLayout from '../components/public/PublicLayout';
import Hero from '../components/public/Hero';
import Features from '../components/public/Features';
import Universities from '../components/public/Universities';
import Testimonials from '../components/public/Testimonials';
import UniversityLogos from '../components/public/UniversityLogos';
import { useEffect } from 'react';

const LandingPage = () => {

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Stop observing once it has animated in so it stays visible
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        // Slight delay to ensure all child components have mounted before looking for them
        setTimeout(() => {
            const hiddenElements = document.querySelectorAll('.reveal-on-scroll');
            hiddenElements.forEach(el => observer.observe(el));
        }, 100);

        return () => observer.disconnect();
    }, []);

    return (
        <PublicLayout>
            <Hero />
            <Features />
            <Universities />
            <UniversityLogos />
            <Testimonials />
        </PublicLayout>
    );
};

export default LandingPage;