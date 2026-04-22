import React from 'react';
import PublicLayout from '../components/public/PublicLayout';
import Hero from '../components/public/Hero';
import Features from '../components/public/Features';
import Universities from '../components/public/Universities';
import Testimonials from '../components/public/Testimonials';
import UniversityLogos from '../components/public/UniversityLogos';
import { useEffect } from 'react';
import Choose from '../components/public/Choose';
import { useSEO } from '../hooks/useSEO';

const LandingPage = () => {
    useSEO({
        title: "JCS Consultancy | Jamia Hamdard, MBBS, B.Tech & Delhi College Admission Experts",
        description: "Get expert admission guidance for Jamia Hamdard University, MBBS, B.Tech, MBA, BBA, Nursing, and top Delhi colleges. JCS offers complete end-to-end hassle-free admission support.",
        canonical: "https://www.jamiaconsultancyservices.in/",
        keywords: "jamia hamdard admission consultant, college admission delhi, mbbs admission delhi, low rank admission consultant, nursing admission delhi, btech admission delhi",
        schema: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "JCS Consultancy — Top Admission Consultancy for Jamia Hamdard & Delhi Colleges",
            "url": "https://www.jamiaconsultancyservices.in/",
            "description": "Expert admission guidance for Jamia Hamdard, MBBS, B.Tech, MBA, Nursing & Delhi colleges. 1200+ success stories.",
        }
    });

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
            <Choose />
        </PublicLayout>
    );
};

export default LandingPage;