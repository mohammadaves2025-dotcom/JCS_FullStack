import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiSend, FiUser, FiPhone, FiMail, FiMapPin, FiGlobe, FiBookOpen, FiCheckCircle, FiShield, FiUsers } from 'react-icons/fi';
import { LeadContext } from '../context/LeadContext';

const MBBS = () => {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const { submitLead, loading, successMsg, errorMsg } = useContext(LeadContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        interestedCourse: 'MBBS Abroad',
        message: '', // We'll use this for the country selection
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await submitLead(formData);
        if (!errorMsg) setFormData({ name: '', email: '', phone: '', interestedCourse: 'MBBS Abroad', message: '' });
    };

    const destinations = [
        { country: "Russia", cost: "15-25 Lakhs", duration: "6 Years", image: "🇷🇺" },
        { country: "Georgia", cost: "25-35 Lakhs", duration: "6 Years", image: "🇬🇪" },
        { country: "Kazakhstan", cost: "12-18 Lakhs", duration: "5 Years", image: "🇰🇿" },
        { country: "Uzbekistan", cost: "14-20 Lakhs", duration: "5 Years", image: "🇺🇿" },
    ];

    return (
        <div className="bg-white min-h-screen pt-20">

            {/* 🟢 Upgraded Premium Navbar (Mobile Optimized & Scroll-Aware) */}
            <nav className={`fixed w-full top-0 z-50 transition-all duration-500 py-3 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100' : 'bg-transparent'
                }`}>
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">

                    {/* Logo Area */}
                    <div className="flex items-center gap-2.5 md:gap-3 group cursor-pointer">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-jcs-deep to-[#13422E] rounded-lg md:rounded-xl flex items-center justify-center font-black text-white text-xs md:text-base shadow-[0_0_15px_rgba(0,208,132,0.3)] group-hover:scale-105 transition-transform duration-300">
                            JCS
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className={`font-extrabold text-[13px] sm:text-[15px] md:text-lg leading-none tracking-tight transition-colors duration-300 ${scrolled ? 'text-gray-900' : 'text-shadow-black drop-shadow-md'}`}>
                                JAMIA CONSULTANCY
                            </span>
                            <span className={`text-[8.5px] md:text-[10px] font-bold tracking-widest uppercase mt-1 transition-colors duration-300 ${scrolled ? 'text-jcs-brand' : 'text-jcs-brand drop-shadow-sm'}`}>
                                Admissions • 2026
                            </span>
                        </div>
                    </div>

                    {/* Links Area */}
                    <div className="flex items-center gap-3.5 md:gap-6">
                        <NavLink
                            to="/mbbs-abroad"
                            className={`text-[11px] sm:text-xs md:text-sm font-black tracking-wide transition-all uppercase ${scrolled ? 'text-gray-700 hover:text-jcs-brand' : 'text-jcs-brand drop-shadow-[0_0_8px_rgba(0,208,132,0.6)] hover:text-white'
                                }`}
                        >
                            MBBS Abroad
                        </NavLink>

                        <NavLink
                            to="/login"
                            className={`text-[11px] sm:text-xs md:text-sm font-bold transition-colors ${scrolled ? 'text-gray-500 hover:text-gray-900' : 'text-gray-500 hover:text-jcs-brand'
                                }`}
                        >
                            Portal
                        </NavLink>

                        {/* Desktop Only Contact Button */}
                        <a href="tel:+919990922119"
                            className={`hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all duration-300 ${scrolled ? 'bg-jcs-deep text-white shadow-md hover:bg-gray-900' : 'bg-jcs-brand text-gray-900 shadow-[0_0_15px_rgba(0,208,132,0.4)] hover:bg-white hover:shadow-none'
                                }`}
                        >
                            <FiPhone size={16} /> Contact
                        </a>
                    </div>
                </div>
            </nav>


            {/* Hero Section */}
            <section className="bg-gradient-to-br from-gray-900 via-jcs-deep to-black text-white py-20 px-6 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-jcs-brand opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                    <span className="bg-jcs-brand/20 text-jcs-brand px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-jcs-brand/30">
                        Admissions Open 2026-27
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
                        Become a <span className="text-jcs-brand">Global Doctor</span>.
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl font-medium mb-10">
                        Secure your MBBS seat in top-tier medical universities abroad with globally recognized degrees and zero donation fees.
                    </p>
                    <button className="bg-jcs-brand hover:bg-jcs-brand-light text-gray-900 font-black px-10 py-5 rounded-2xl shadow-xl transition-all transform hover:-translate-y-1">
                        Book Free Consultation
                    </button>
                </div>
            </section>

            {/* Why MBBS Abroad? */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: <FiGlobe />, title: "No Donation", desc: "Pay only the university tuition fee directly." },
                        { icon: <FiBookOpen />, title: "English Medium", desc: "100% English taught curriculum for Indian students." },
                        { icon: <FiCheckCircle />, title: "MCI/WHO Approved", desc: "Degrees valid for FMGE/NEXT in India." },
                        { icon: <FiShield />, title: "Safe Hostels", desc: "Verified Indian food and safe campus life." },
                    ].map((feature, i) => (
                        <div key={i} className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100 hover:border-jcs-brand/50 transition-all group">
                            <div className="text-3xl text-jcs-brand mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                            <h3 className="text-xl font-black text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-500 font-medium text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Destinations Grid */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">Top Destinations</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {destinations.map((d, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all group cursor-pointer">
                                <div className="text-5xl mb-6">{d.image}</div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4">{d.country}</h3>
                                <div className="space-y-2">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Est. Budget</p>
                                    <p className="font-black text-jcs-deep">{d.cost}</p>
                                </div>
                                <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                                    <span className="text-sm font-bold text-gray-500">{d.duration}</span>
                                    <span className="text-jcs-brand font-black text-sm group-hover:underline">View Universities</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Admission Roadmap Section */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Your Journey to Success</h2>
                    <p className="text-gray-500 font-medium">From Delhi NCR to your dream Medical University—we handle the heavy lifting.</p>
                </div>

                <div className="relative">
                    {/* The Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {[
                            { step: "01", title: "Counseling", desc: "Expert guidance to choose the right country and university based on your budget.", icon: <FiUsers /> },
                            { step: "02", title: "Documentation", desc: "We manage your admission letter, apostille, and university registration.", icon: <FiBookOpen /> },
                            { step: "03", title: "Visa & Travel", desc: "100% Visa success rate. We handle the embassy work and flight bookings.", icon: <FiGlobe /> },
                            { step: "04", title: "On-Ground Support", desc: "Our local representative helps with hostel check-in and local registration.", icon: <FiShield /> }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-lg transition-all text-center group">
                                <div className="w-14 h-14 bg-jcs-brand/10 text-jcs-brand rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl group-hover:scale-110 group-hover:bg-jcs-brand group-hover:text-white transition-all duration-300">
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

            {/* 🟢 Upgraded Lead Generation Form Section */}
            <section className="py-24 bg-gray-50 px-6 relative">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">

                    {/* Left Side: Text & Value Prop */}
                    <div className="lg:w-1/2">
                        <span className="text-jcs-brand font-black text-xs uppercase tracking-widest mb-4 block">Get Started Today</span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
                            Request a <span className="text-jcs-brand">Personalized</span> Admission Plan
                        </h2>
                        <p className="text-gray-500 font-medium text-lg mb-8">
                            Fill out the form and our senior medical counselor will reach out within 24 hours to discuss your eligibility, budget, and top university options.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-jcs-brand/10 text-jcs-brand rounded-full flex items-center justify-center shrink-0">
                                    <FiMapPin size={20} />
                                </div>
                                <div>
                                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Head Office</span>
                                    <span className="font-bold text-gray-900">Sector 18, Noida, Delhi NCR</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-jcs-deep/10 text-jcs-deep rounded-full flex items-center justify-center shrink-0">
                                    <FiCheckCircle size={20} />
                                </div>
                                <div>
                                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Our Promise</span>
                                    <span className="font-bold text-gray-900">100% Transparent Process</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: The Form */}
                    <div className="lg:w-1/2 w-full">
                        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden">
                            {/* Decorative Glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-jcs-brand opacity-[0.03] rounded-full blur-3xl pointer-events-none"></div>

                            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="relative group">
                                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-jcs-brand transition-colors" />
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Student Name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-jcs-brand focus:bg-white focus:ring-4 focus:ring-jcs-brand/10 outline-none transition-all font-medium text-gray-900 placeholder-gray-400"
                                        />
                                    </div>
                                    <div className="relative group">
                                        <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-jcs-brand transition-colors" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Mobile Number"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-jcs-brand focus:bg-white focus:ring-4 focus:ring-jcs-brand/10 outline-none transition-all font-medium text-gray-900 placeholder-gray-400"
                                        />
                                    </div>
                                </div>

                                <div className="relative group">
                                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-jcs-brand transition-colors" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-jcs-brand focus:bg-white focus:ring-4 focus:ring-jcs-brand/10 outline-none transition-all font-medium text-gray-900 placeholder-gray-400"
                                    />
                                </div>

                                <div className="relative group">
                                    <FiGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-jcs-brand transition-colors z-10" />
                                    <select
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-10 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-jcs-brand focus:bg-white focus:ring-4 focus:ring-jcs-brand/10 outline-none transition-all font-medium appearance-none text-gray-900 cursor-pointer"
                                    >
                                        <option value="" disabled>Select Target Destination</option>
                                        <option value="Russia">Russia (15-25 Lakhs)</option>
                                        <option value="Georgia">Georgia (25-35 Lakhs)</option>
                                        <option value="Kazakhstan">Kazakhstan (12-18 Lakhs)</option>
                                        <option value="Uzbekistan">Uzbekistan (14-20 Lakhs)</option>
                                        <option value="Not Sure Yet">Not Sure Yet - Need Counseling</option>
                                    </select>
                                    {/* Custom Dropdown Arrow */}
                                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-jcs-deep text-white font-black py-4 rounded-2xl hover:bg-jcs-brand hover:text-gray-900 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,208,132,0.3)] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                                >
                                    {loading ? 'Processing...' : <>Submit Application <FiSend className="group-hover:translate-x-1 transition-transform" /></>}
                                </button>

                                {/* Refined Feedback Messages */}
                                {successMsg && (
                                    <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-100 flex items-center gap-3 animate-fade-in-up">
                                        <FiCheckCircle className="shrink-0 text-green-500" />
                                        <p className="text-sm font-bold">{successMsg}</p>
                                    </div>
                                )}
                                {errorMsg && (
                                    <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 text-sm font-bold animate-fade-in-up">
                                        {errorMsg}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>

                </div>
            </section>

            {/* Final Call to Action */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto bg-jcs-deep rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10">Ready to start your Medical Career?</h2>
                    <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto relative z-10">Don't let the complex paperwork stop you. Our experts are here to help you every step of the way.</p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center relative z-10">
                        <button className="bg-jcs-brand text-gray-900 font-black px-10 py-5 rounded-2xl hover:bg-white transition-all">Download Brochure</button>
                        <button className="bg-white/10 text-white font-black px-10 py-5 rounded-2xl border border-white/20 hover:bg-white/20 transition-all">Talk to a Counselor</button>
                    </div>
                </div>
            </section>

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
        </div>
    );
};

export default MBBS;