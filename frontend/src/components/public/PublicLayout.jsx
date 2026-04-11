import React, { useState, useEffect } from 'react';
import { FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const PublicLayout = ({ children }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-jcs-brand selection:text-white pb-20 md:pb-0 flex flex-col">

            {/* 🟢 Premium Animated Navbar (Upscaled for Mobile) */}
            <nav className={`fixed w-full top-0 z-50 transition-all duration-500 py-3 md:py-3 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">

                    {/* Logo Area */}
                    <div className="flex items-center gap-2.5 md:gap-3 group cursor-pointer">
                        {/* Increased mobile box size to w-10 h-10 */}
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-jcs-deep to-[#13422E] rounded-lg md:rounded-xl flex items-center justify-center font-black text-white text-xs md:text-base shadow-lg group-hover:scale-105 transition-transform duration-300">
                            JCS
                        </div>
                        <div className="flex flex-col justify-center">
                            {/* Bumped up text size, kept tight line-height */}
                            <span className={`font-extrabold text-[13px] sm:text-[15px] md:text-lg leading-none tracking-tight transition-colors duration-300 ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                                JAMIA CONSULTANCY
                            </span>
                            <span className={`text-[8.5px] md:text-[10px] font-bold tracking-widest uppercase mt-1 ${scrolled ? 'text-jcs-brand' : 'text-white/80'}`}>
                                Services • Delhi NCR
                            </span>
                        </div>
                    </div>

                    {/* Links Area */}
                    <div className="flex items-center gap-3.5 md:gap-6">
                        {/* Increased link sizes */}
                        <NavLink
                            to="/mbbs-abroad"
                            className={`text-[11px] sm:text-xs md:text-sm font-black tracking-wide transition-colors uppercase ${scrolled ? 'text-gray-700 hover:text-jcs-brand' : 'text-jcs-brand hover:text-white drop-shadow-md'
                                }`}
                        >
                            MBBS Abroad
                        </NavLink>

                        <NavLink
                            to="/login"
                            className={`text-xs sm:text-sm md:text-sm font-bold transition-colors ${scrolled ? 'text-gray-500 hover:text-gray-900' : 'text-white/90 hover:text-white'
                                }`}
                        >
                            Login
                        </NavLink>

                        {/* Hidden entirely on mobile to save space, visible on desktop */}
                        <a href="tel:+919990922119" className={`hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all duration-300 ${scrolled ? 'bg-jcs-deep text-white shadow-md hover:bg-gray-900' : 'bg-white/20 text-white backdrop-blur-md border border-white/30 hover:bg-white hover:text-jcs-deep'}`}>
                            <FiPhone size={16} /> Call us 9990922119
                        </a>
                    </div>
                </div>
            </nav>

            {/* 🟢 Main Page Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* 🟢 Minimalist Footer */}
            <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8 mt-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-jcs-deep rounded-lg flex items-center justify-center font-black text-white text-xs">JCS</div>
                        <h3 className="text-xl font-black text-gray-900">Secure Your Future.</h3>
                    </div>
                    <p className="text-sm text-gray-500 font-medium max-w-4xl leading-relaxed mb-10">
                        Every year, thousands of students compete for limited seats. Jamia Consultancy Services bridges the gap between ambition and reality by providing expert guidance for management quota and direct admissions across premium institutions. 100% transparent, secure, and hassle-free.
                    </p>
                    <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-gray-400">
                        <p>Copyright © 2026, Jamia Consultancy Services.</p>
                        <div className="flex gap-6 items-center">
                            <a href="#privacy" className="hover:text-jcs-deep">Privacy Policy</a>
                            <a href="#terms" className="hover:text-jcs-deep">Terms</a>
                            {/* 🟢 THE HIDDEN DOOR: Discreet Staff Access */}
                            <NavLink to="/login" className="bg-gray-200/50 px-3 py-1 rounded text-gray-400 hover:bg-jcs-deep hover:text-white transition-all">
                                Staff Access
                            </NavLink>
                        </div>
                    </div>
                </div>
            </footer>

            {/* 🟢 Floating WhatsApp Button (Animated) */}
            <a href="https://wa.me/919990922119" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white text-4xl shadow-[0_10px_25px_rgba(37,211,102,0.4)] hover:scale-110 hover:rotate-12 transition-all z-50 cursor-pointer border-4 border-white group">
                <FaWhatsapp />
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            </a>
        </div>
    );
};

export default PublicLayout;