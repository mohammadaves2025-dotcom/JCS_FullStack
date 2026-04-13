import React, { useState, useContext, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FiSend, FiUser, FiPhone, FiMail, FiMapPin, FiGlobe, FiBookOpen, FiCheckCircle, FiShield, FiUsers, FiArrowRight, FiClock } from 'react-icons/fi';
import { LeadContext } from '../context/LeadContext';

// 🟢 Animated counter hook for the stats
const useCounter = (target, duration = 1800, start = false) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime = null;
        const step = (ts) => {
            if (!startTime) startTime = ts;
            const p = Math.min((ts - startTime) / duration, 1);
            setCount(Math.floor((1 - Math.pow(1 - p, 4)) * target));
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [start, target, duration]);
    return count;
};

const MBBS = () => {
    const [scrolled, setScrolled] = useState(false);
    const [statsStarted, setStatsStarted] = useState(false);
    const statsRef = useRef(null);

    // Navbar Scroll Listener
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Stats Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsStarted(true); }, { threshold: 0.5 });
        if (statsRef.current) observer.observe(statsRef.current);
        return () => observer.disconnect();
    }, []);

    // 🟢 Global Scroll Reveal Observer (Handles Fade-ins and Line Masks)
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Trigger once and keep visible
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        // Slight delay to ensure DOM is ready
        setTimeout(() => {
            const hiddenElements = document.querySelectorAll('.reveal-on-scroll');
            hiddenElements.forEach(el => observer.observe(el));
        }, 100);

        return () => observer.disconnect();
    }, []);

    // Form Logic
    const { submitLead, loading, successMsg, errorMsg } = useContext(LeadContext);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', interestedCourse: 'MBBS Abroad', message: '' });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = async (e) => {
        e.preventDefault();
        await submitLead(formData);
        if (!errorMsg) setFormData({ name: '', email: '', phone: '', interestedCourse: 'MBBS Abroad', message: '' });
    };

    // Animated Values
    const studentsCount = useCounter(500, 1800, statsStarted);
    const successRate = useCounter(98, 1600, statsStarted);
    const universitiesCount = useCounter(40, 1400, statsStarted);

    const destinations = [
        { country: "Russia", cost: "15-25 Lakhs", duration: "6 Years", image: "https://flagcdn.com/ru.svg", highlight: "Most Popular" },
        { country: "Georgia", cost: "25-35 Lakhs", duration: "6 Years", image: "https://flagcdn.com/ge.svg", highlight: "Premium" },
        { country: "Kazakhstan", cost: "12-18 Lakhs", duration: "5 Years", image: "https://flagcdn.com/kz.svg", highlight: "Budget Friendly" },
        { country: "Uzbekistan", cost: "14-20 Lakhs", duration: "5 Years", image: "https://flagcdn.com/uz.svg", highlight: "Emerging" },
    ];

    return (
        <div className="bg-white min-h-screen">

            {/* Navbar */}
            <nav className={`fixed w-full top-0 z-50 transition-all duration-500 py-3 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
                    <div className="flex items-center gap-2.5 md:gap-3 group cursor-pointer">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-jcs-deep to-[#13422E] rounded-lg md:rounded-xl flex items-center justify-center font-black text-white text-xs md:text-base shadow-[0_0_15px_rgba(0,208,132,0.3)] group-hover:scale-105 transition-transform duration-300 animate-pulse-glow">
                            JCS
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className={`font-extrabold text-[13px] sm:text-[15px] md:text-lg leading-none tracking-tight transition-colors duration-300 ${scrolled ? 'text-gray-900' : 'text-white drop-shadow-md'}`}>
                                JAMIA CONSULTANCY
                            </span>
                            <span className={`text-[8.5px] md:text-[10px] font-bold tracking-widest uppercase mt-1 text-jcs-brand`}>
                                Admissions • 2026
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3.5 md:gap-6">
                        <NavLink to="/mbbs-abroad" className={`text-[11px] sm:text-xs md:text-sm font-black tracking-wide transition-all uppercase ${scrolled ? 'text-gray-700 hover:text-jcs-brand' : 'text-jcs-brand drop-shadow-[0_0_8px_rgba(0,208,132,0.6)] hover:text-white'}`}>MBBS Abroad</NavLink>
                        <NavLink to="/login" className={`text-[11px] sm:text-xs md:text-sm font-bold transition-colors ${scrolled ? 'text-gray-500 hover:text-gray-900' : 'text-gray-400 hover:text-jcs-brand'}`}>Portal</NavLink>
                        <a href="tel:+919990922119" className={`hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all duration-300 ${scrolled ? 'bg-jcs-deep text-white shadow-md hover:bg-gray-900' : 'bg-jcs-brand text-gray-900 shadow-[0_0_15px_rgba(0,208,132,0.4)] hover:bg-white hover:shadow-none'}`}>
                            <FiPhone size={16} /> Contact
                        </a>
                    </div>
                </div>
            </nav>

            {/* ===== HERO SECTION ===== */}
            <section className="bg-gradient-to-br from-gray-950 via-jcs-deep to-black text-white py-28 md:py-40 px-6 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-jcs-brand opacity-10 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: '5s' }}></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500 opacity-10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
                <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(0,208,132,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,208,132,0.5) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

                {[...Array(8)].map((_, i) => (
                    <div key={i} className="absolute w-1 h-1 rounded-full bg-jcs-brand particle pointer-events-none" style={{ left: `${10 + i * 11}%`, bottom: '15%', animationDelay: `${i * 0.4}s`, animationDuration: `${3 + i * 0.3}s` }}></div>
                ))}

                <div className="absolute right-[5%] top-[15%] w-60 h-60 pointer-events-none hidden xl:block opacity-20">
                    <div className="w-full h-full rounded-full border-2 border-dashed border-jcs-brand/50 animate-spin-slow"></div>
                    <div className="absolute inset-8 rounded-full border border-jcs-brand/30 animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
                    <div className="absolute inset-0 flex items-center justify-center text-6xl">🩺</div>
                </div>

                {/* 🟢 Masked Reveal Hero Text */}
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 reveal-on-scroll">
                    <div className="line-mask mb-8">
                        <span className="inline-flex items-center gap-2 bg-jcs-brand/20 text-jcs-brand px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-jcs-brand/30 line-reveal delay-line-1">
                            <span className="w-2 h-2 rounded-full bg-jcs-brand animate-ping inline-block"></span>
                            Admissions Open 2026-27
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight flex flex-col items-center gap-2">
                        <span className="line-mask"><span className="line-reveal delay-line-2 block pb-2">Become a</span></span>
                        <span className="line-mask"><span className="line-reveal delay-line-3 animate-gradient-text block pb-3">Global Doctor.</span></span>
                    </h1>

                    <div className="line-mask mb-10 max-w-2xl">
                        <p className="text-xl text-gray-400 font-medium line-reveal delay-line-4 block pb-2">
                            Secure your MBBS seat in top-tier medical universities abroad with globally recognized degrees and zero donation fees.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in-up delay-700">
                        <button className="bg-jcs-brand hover:bg-jcs-brand-light text-gray-900 font-black px-10 py-5 rounded-2xl shadow-xl transition-all hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,208,132,0.4)] flex items-center gap-3 group">
                            Book Free Consultation <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="bg-white/10 border border-white/20 text-white font-black px-10 py-5 rounded-2xl hover:bg-white/20 transition-all backdrop-blur-sm">
                            Download Brochure
                        </button>
                    </div>

                    {/* Stats row */}
                    <div ref={statsRef} className="grid grid-cols-3 gap-8 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm w-full max-w-2xl animate-fade-in-up delay-800">
                        <div className="text-center">
                            <div className="text-3xl font-black text-jcs-brand">{studentsCount}+</div>
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Students Placed</div>
                        </div>
                        <div className="text-center border-x border-white/10">
                            <div className="text-3xl font-black text-jcs-brand">{successRate}%</div>
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Visa Success</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-black text-jcs-brand">{universitiesCount}+</div>
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Partner Univ.</div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
                    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12">
                        <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* ===== WHY MBBS ABROAD ===== */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-14 reveal-on-scroll">
                    <div className="line-mask"><span className="text-jcs-brand font-black text-xs uppercase tracking-widest line-reveal delay-line-1 block pb-1">Why Go Abroad?</span></div>
                    <div className="line-mask"><h2 className="text-4xl font-black text-gray-900 mt-2 line-reveal delay-line-2 block pb-1">The Smart Choice for Your</h2></div>
                    <div className="line-mask"><h2 className="text-4xl font-black animate-gradient-text line-reveal delay-line-3 block pb-3">Medical Career</h2></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children reveal-on-scroll">
                    {[
                        { icon: <FiGlobe />, title: "No Donation", desc: "Pay only the university tuition fee directly. Zero capitation.", color: "from-green-400 to-emerald-600" },
                        { icon: <FiBookOpen />, title: "English Medium", desc: "100% English taught curriculum for Indian students.", color: "from-blue-400 to-indigo-600" },
                        { icon: <FiCheckCircle />, title: "MCI/WHO Approved", desc: "Degrees valid for FMGE/NEXT in India. Practice anywhere.", color: "from-purple-400 to-pink-600" },
                        { icon: <FiShield />, title: "Safe Hostels", desc: "Verified Indian food and safe campus life. Parents' peace.", color: "from-orange-400 to-red-500" },
                    ].map((feature, i) => (
                        <div key={i} className="p-8 rounded-[2rem] bg-white border border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-500 group cursor-pointer overflow-hidden relative">
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white text-2xl mb-6 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-jcs-deep transition-colors">{feature.title}</h3>
                            <p className="text-gray-500 font-medium text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== DESTINATIONS ===== */}
            <section className="py-24 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-14 reveal-on-scroll">
                        <div className="line-mask"><span className="text-jcs-brand font-black text-xs uppercase tracking-widest line-reveal delay-line-1 block pb-1">Choose Your Destination</span></div>
                        <div className="line-mask"><h2 className="text-4xl font-black text-gray-900 mt-2 line-reveal delay-line-2 block pb-2">Top Study Destinations</h2></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children reveal-on-scroll">
                        {destinations.map((d, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_40px_rgba(0,208,132,0.12)] hover:border-jcs-brand/30 hover:-translate-y-2 transition-all duration-500 group cursor-pointer relative overflow-hidden">

                                {/* Subtle background glow that reveals on hover */}
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-jcs-brand/10 rounded-full blur-3xl group-hover:bg-jcs-brand/20 transition-colors duration-500 pointer-events-none"></div>

                                {/* Header: Flag & Badge */}
                                <div className="flex justify-between items-start mb-8 relative z-10">
                                    {/* Premium Flag Pedestal */}
                                    <div className="w-16 h-16 rounded-full p-1 bg-white shadow-[0_8px_15px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center justify-center group-hover:shadow-[0_12px_25px_rgba(0,208,132,0.3)] group-hover:border-jcs-brand/50 transition-all duration-500 bg-gradient-to-br from-white to-gray-50">
                                        <img src={d.image} alt={d.country} className="w-full h-full object-cover rounded-full shadow-inner" />
                                    </div>
                                    {/* Refined Badge */}
                                    <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-jcs-brand/10 text-jcs-brand border border-jcs-brand/20">
                                        {d.highlight}
                                    </span>
                                </div>

                                {/* Content */}
                                <h3 className="text-3xl font-black text-gray-900 mb-6 tracking-tight relative z-10 group-hover:text-jcs-deep transition-colors">
                                    {d.country}
                                </h3>

                                <div className="space-y-1.5 relative z-10">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Est. Budget</p>
                                    <p className="font-black text-jcs-deep text-2xl tracking-tight">{d.cost}</p>
                                </div>

                                {/* Footer */}
                                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between relative z-10">
                                    <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5">
                                        <FiClock className="text-gray-400" /> {d.duration}
                                    </span>
                                    <span className="text-jcs-brand font-black text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                        View <FiArrowRight size={16} />
                                    </span>
                                </div>

                                {/* Hover Bottom Bar Effect */}
                                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-jcs-brand to-jcs-brand-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== ROADMAP STEPS ===== */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16 reveal-on-scroll">
                    <div className="line-mask"><span className="text-jcs-brand font-black text-xs uppercase tracking-widest line-reveal delay-line-1 block pb-1">The Process</span></div>
                    <div className="line-mask"><h2 className="text-4xl font-black text-gray-900 tracking-tight mt-2 mb-4 line-reveal delay-line-2 block pb-2">Your Journey to Success</h2></div>
                    <div className="h-1 w-16 bg-jcs-brand rounded-full mx-auto animate-fade-in-up delay-300"></div>
                </div>

                <div className="relative reveal-on-scroll">
                    <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-jcs-brand/20 via-jcs-brand to-jcs-brand/20 z-0"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 stagger-children">
                        {[
                            { step: "01", title: "Counseling", desc: "Expert guidance to choose the right country and university based on your budget and score.", icon: <FiUsers />, color: "bg-green-100 text-green-600" },
                            { step: "02", title: "Documentation", desc: "We manage your admission letter, apostille, and university registration end-to-end.", icon: <FiBookOpen />, color: "bg-blue-100 text-blue-600" },
                            { step: "03", title: "Visa & Travel", desc: "100% Visa success rate. We handle the embassy work, flight, and forex too.", icon: <FiGlobe />, color: "bg-purple-100 text-purple-600" },
                            { step: "04", title: "On-Ground Support", desc: "Our local rep helps with hostel check-in, local registration, and SIM card.", icon: <FiShield />, color: "bg-orange-100 text-orange-600" },
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 text-center group hover:-translate-y-1">
                                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}>
                                    {item.icon}
                                </div>
                                <span className="text-jcs-brand font-black text-xs uppercase tracking-[0.2em] mb-2 block">Step {item.step}</span>
                                <h3 className="text-xl font-black text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== LEAD FORM SECTION ===== */}
            <section className="py-24 bg-gray-50 px-6 relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-jcs-brand/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2 reveal-on-scroll">
                        <div className="line-mask"><span className="text-jcs-brand font-black text-xs uppercase tracking-widest mb-4 block line-reveal delay-line-1 pb-1">Get Started Today</span></div>
                        <div className="line-mask">
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6 line-reveal delay-line-2 pb-2">
                                Request a <span className="animate-gradient-text">Personalized</span> Admission Plan
                            </h2>
                        </div>
                        <div className="line-mask">
                            <p className="text-gray-500 font-medium text-lg mb-8 line-reveal delay-line-3 pb-1">Our senior medical counselor will reach out within 24 hours.</p>
                        </div>

                        <div className="space-y-4 stagger-children">
                            {[
                                { icon: <FiMapPin />, label: 'Head Office', value: 'Sector 18, Noida, Delhi NCR', color: 'bg-jcs-brand/10 text-jcs-brand' },
                                { icon: <FiCheckCircle />, label: 'Our Promise', value: '100% Transparent Process', color: 'bg-jcs-deep/10 text-jcs-deep' },
                                { icon: <FiPhone />, label: 'Call Us', value: '+91 99909 22119', color: 'bg-blue-100 text-blue-600' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                                    <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center shrink-0`}>{item.icon}</div>
                                    <div>
                                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">{item.label}</span>
                                        <span className="font-bold text-gray-900">{item.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 w-full reveal-on-scroll">
                        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 relative overflow-hidden animate-float" style={{ animationDuration: '8s' }}>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-jcs-brand opacity-[0.03] rounded-full blur-3xl pointer-events-none"></div>
                            <div className="absolute inset-0 animate-shimmer pointer-events-none"></div>

                            <h3 className="text-xl font-black text-gray-900 mb-6 relative z-10">
                                Submit Your Application
                                <span className="block text-xs font-bold text-jcs-brand mt-1 tracking-widest uppercase">Free • No Obligation</span>
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {[
                                        { icon: <FiUser />, name: 'name', placeholder: 'Student Name', type: 'text' },
                                        { icon: <FiPhone />, name: 'phone', placeholder: 'Mobile Number', type: 'tel' },
                                    ].map(f => (
                                        <div key={f.name} className="relative group">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-jcs-brand transition-colors">{f.icon}</span>
                                            <input type={f.type} name={f.name} placeholder={f.placeholder} required value={formData[f.name]} onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-jcs-brand focus:bg-white focus:ring-4 focus:ring-jcs-brand/10 outline-none transition-all font-medium text-gray-900 placeholder-gray-400" />
                                        </div>
                                    ))}
                                </div>

                                <div className="relative group">
                                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-jcs-brand transition-colors" />
                                    <input type="email" name="email" placeholder="Email Address" required value={formData.email} onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-jcs-brand focus:bg-white focus:ring-4 focus:ring-jcs-brand/10 outline-none transition-all font-medium text-gray-900 placeholder-gray-400" />
                                </div>

                                <div className="relative group">
                                    <FiGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-jcs-brand transition-colors z-10" />
                                    <select name="message" value={formData.message} onChange={handleChange} required
                                        className="w-full pl-12 pr-10 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-jcs-brand focus:bg-white focus:ring-4 focus:ring-jcs-brand/10 outline-none transition-all font-medium appearance-none text-gray-900 cursor-pointer">
                                        <option value="" disabled>Select Target Destination</option>
                                        <option value="Russia">🇷🇺 Russia (15-25 Lakhs)</option>
                                        <option value="Georgia">🇬🇪 Georgia (25-35 Lakhs)</option>
                                        <option value="Kazakhstan">🇰🇿 Kazakhstan (12-18 Lakhs)</option>
                                        <option value="Uzbekistan">🇺🇿 Uzbekistan (14-20 Lakhs)</option>
                                        <option value="Not Sure Yet">🤔 Not Sure - Need Counseling</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>

                                <button type="submit" disabled={loading}
                                    className="w-full bg-jcs-deep text-white font-black py-4 rounded-2xl hover:bg-jcs-brand hover:text-gray-900 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,208,132,0.3)] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed">
                                    {loading ? 'Processing...' : <><FiSend className="group-hover:translate-x-0.5 transition-transform" /> Submit Application</>}
                                </button>

                                {successMsg && (
                                    <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-100 flex items-center gap-3 animate-bounce-in">
                                        <FiCheckCircle className="shrink-0 text-green-500" />
                                        <p className="text-sm font-bold">{successMsg}</p>
                                    </div>
                                )}
                                {errorMsg && (
                                    <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 text-sm font-bold">{errorMsg}</div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto bg-jcs-deep rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl reveal-on-scroll">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-jcs-brand/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                        <div className="w-[600px] h-[600px] rounded-full border border-jcs-brand animate-spin-slow"></div>
                    </div>

                    <div className="line-mask"><h2 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10 line-reveal delay-line-1 pb-2">Ready to start your Medical Career?</h2></div>
                    <div className="line-mask"><p className="text-white/70 text-lg mb-10 max-w-xl mx-auto relative z-10 line-reveal delay-line-2 pb-2">Don't let complex paperwork stop you. Our experts handle everything.</p></div>

                    <div className="flex flex-col md:flex-row gap-4 justify-center relative z-10 animate-fade-in-up delay-300">
                        <button className="bg-jcs-brand text-gray-900 font-black px-10 py-5 rounded-2xl hover:bg-white transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(0,208,132,0.5)] flex items-center justify-center gap-2 group">
                            Download Brochure <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="bg-white/10 text-white font-black px-10 py-5 rounded-2xl border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm">Talk to a Counselor</button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-jcs-deep rounded-lg flex items-center justify-center font-black text-white text-xs animate-pulse-glow">JCS</div>
                        <h3 className="text-xl font-black text-gray-900">Secure Your Future.</h3>
                    </div>
                    <p className="text-sm text-gray-500 font-medium max-w-4xl leading-relaxed mb-10">
                        Every year, thousands of students compete for limited seats. Jamia Consultancy Services bridges the gap between ambition and reality by providing expert guidance for management quota and direct admissions. 100% transparent and hassle-free.
                    </p>
                    <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-gray-400">
                        <p>Copyright © 2026, Jamia Consultancy Services.</p>
                        <div className="flex gap-6 items-center">
                            <a href="#" className="hover:text-jcs-deep">Privacy Policy</a>
                            <a href="#" className="hover:text-jcs-deep">Terms</a>
                            <NavLink to="/login" className="bg-gray-200/50 px-3 py-1 rounded text-gray-400 hover:bg-jcs-deep hover:text-white transition-all">Staff Access</NavLink>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MBBS;