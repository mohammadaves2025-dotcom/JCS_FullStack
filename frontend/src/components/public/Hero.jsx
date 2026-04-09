import React, { useState } from 'react';
import axios from 'axios';
import { FiCheckCircle, FiUser, FiMail, FiPhone, FiMapPin, FiBookOpen } from 'react-icons/fi';

const Hero = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', preferredCity: '', interestedCourse: '' });
    const [status, setStatus] = useState({ loading: false, success: false, error: '' });

    const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: '' });
        try {
            await axios.post(`${backendURL}/api/inquiries/`, { ...formData, source: 'Website Form' });
            setStatus({ loading: false, success: true, error: '' });
            setFormData({ name: '', email: '', phone: '', preferredCity: '', interestedCourse: '' });
            setTimeout(() => setStatus(s => ({ ...s, success: false })), 5000);
        } catch (err) {
            setStatus({ loading: false, success: false, error: err.response?.data?.message || 'Something went wrong.' });
        }
    };

    return (
        <div className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-jcs-deep">
            {/* Ambient Animated Orbs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-jcs-brand opacity-20 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500 opacity-10 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0 bg-cover bg-center opacity-30 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80')" }}></div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

                {/* Left: Copy & Value Props */}
                <div className="lg:w-1/2 text-white animate-fade-in-up">
                    <span className="inline-block border border-jcs-brand/30 bg-jcs-brand/10 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase mb-6 text-jcs-brand backdrop-blur-sm">
                        Admissions Open 2026
                    </span>
                    <h1 className="text-5xl md:text-6xl lg:text-[4rem] font-black leading-[1.1] tracking-tight mb-6">
                        Take the First Step to <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-jcs-brand to-white">STUDY AT TOP TIER</span> Colleges.
                    </h1>

                    <div className="space-y-5 text-base md:text-lg font-medium text-gray-300 mt-8">
                        <p className="flex items-center gap-4"><FiCheckCircle className="text-jcs-brand shrink-0" size={24} /> Direct Management Quota Admissions</p>
                        <p className="flex items-center gap-4"><FiCheckCircle className="text-jcs-brand shrink-0" size={24} /> Guaranteed Placement Support</p>
                        <p className="flex items-center gap-4"><FiCheckCircle className="text-jcs-brand shrink-0" size={24} /> Offer letter in less than 48 hours</p>
                    </div>
                </div>

                {/* Right: The Floating Lead Engine */}
                <div className="w-full lg:w-[480px] bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] border border-white/20 animate-fade-in-up relative z-20">
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-6 tracking-tight">Start your Journey</h3>

                    {status.success ? (
                        <div className="bg-green-50 p-8 rounded-3xl text-center h-[350px] flex flex-col justify-center items-center border border-green-100 animate-fade-in-up">
                            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 mx-auto"><FiCheckCircle size={40} /></div>
                            <h4 className="font-black text-gray-900 text-2xl mb-2">Request Received!</h4>
                            <p className="text-sm text-green-700 font-medium">Our expert counselor will contact you shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {status.error && <p className="text-red-500 text-xs font-bold text-center bg-red-50 p-3 rounded-xl border border-red-100">{status.error}</p>}

                            <div>
                                <div className="relative">
                                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full pl-11 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-jcs-brand focus:ring-4 focus:ring-jcs-brand/10 bg-white text-sm font-bold text-gray-900 transition-all shadow-sm" placeholder="Student Full Name*" />
                                </div>
                            </div>

                            <div>
                                <div className="relative">
                                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full pl-11 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-jcs-brand focus:ring-4 focus:ring-jcs-brand/10 bg-white text-sm font-bold text-gray-900 transition-all shadow-sm" placeholder="Email Address*" />
                                </div>
                            </div>

                            <div>
                                <div className="flex shadow-sm rounded-xl overflow-hidden border border-gray-200 focus-within:border-jcs-brand focus-within:ring-4 focus-within:ring-jcs-brand/10 transition-all bg-white">
                                    <span className="flex items-center px-4 bg-gray-50 border-r border-gray-200 text-gray-500 font-bold text-sm">🇮🇳 +91</span>
                                    <input type="tel" required maxLength="10" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-4 focus:outline-none bg-transparent text-sm font-bold text-gray-900" placeholder="Mobile Number*" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                    <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                                    <select required value={formData.preferredCity} onChange={(e) => setFormData({ ...formData, preferredCity: e.target.value })} className="w-full pl-11 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-jcs-brand focus:ring-4 focus:ring-jcs-brand/10 bg-white text-sm font-bold text-gray-900 appearance-none cursor-pointer shadow-sm relative">
                                        <option value="" disabled>Current City*</option>
                                        <option value="Delhi NCR">Delhi NCR</option><option value="Bangalore">Bangalore</option><option value="Pune">Pune</option><option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="relative">
                                    <FiBookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                                    <select required value={formData.interestedCourse} onChange={(e) => setFormData({ ...formData, interestedCourse: e.target.value })} className="w-full pl-11 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-jcs-brand focus:ring-4 focus:ring-jcs-brand/10 bg-white text-sm font-bold text-gray-900 appearance-none cursor-pointer shadow-sm relative">
                                        <option value="" disabled>Target Course*</option>
                                        <option value="B.Tech">B.Tech</option><option value="MBBS">MBBS</option><option value="BDS">BDS</option><option value="MBA">MBA/BBA</option><option value="Law">Law</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-2 flex items-start gap-2">
                                <input type="checkbox" required className="mt-1 accent-jcs-brand w-4 h-4 rounded border-gray-300" />
                                <p className="text-[10px] font-bold text-gray-500 leading-tight">I have read and agreed to the <a href="#" className="text-jcs-brand hover:underline">terms</a> & <a href="#" className="text-jcs-brand hover:underline">privacy policy</a>.</p>
                            </div>

                            <button type="submit" disabled={status.loading} className="w-full bg-jcs-deep hover:bg-gray-900 text-white font-extrabold py-5 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 flex justify-center items-center mt-2">
                                {status.loading ? <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div> : "Book Free Consultation"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Hero;