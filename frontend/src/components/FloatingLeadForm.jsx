import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    FiX, FiArrowRight, FiShield, FiPhone, FiUser, FiMail,
    FiBookOpen, FiMapPin, FiCheckCircle, FiMessageSquare
} from 'react-icons/fi';

const DELAY_MS = 5000;
const DISMISS_KEY = 'jcs_lead_form_dismissed';

const FloatingLeadForm = () => {
    const [visible, setVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        interestedCourse: '',
        preferredCity: '',
    });

    const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    useEffect(() => {
        const dismissed = sessionStorage.getItem(DISMISS_KEY);
        if (dismissed) return;
        const timer = setTimeout(() => setVisible(true), DELAY_MS);
        return () => clearTimeout(timer);
    }, []);

    const handleDismiss = () => {
        sessionStorage.setItem(DISMISS_KEY, 'true');
        setVisible(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        try {
            await axios.post(`${backendURL}/api/inquiries`, {
                ...formData,
                source: 'Floating Lead Form',
            });
            setIsSuccess(true);
            setFormData({ name: '', phone: '', email: '', interestedCourse: '', preferredCity: '' });
            setTimeout(() => handleDismiss(), 4000);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!visible) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm"
            style={{ fontFamily: 'inherit' }}
        >
            <div className="w-full max-w-2xl bg-white rounded-2xl md:rounded-[2rem] shadow-2xl overflow-hidden animate-slide-up flex flex-col md:flex-row">

                {/* ── Left Panel (desktop only) ───────────────────────── */}
                <div className="hidden md:flex bg-gradient-to-br from-gray-900 via-[#13422E] to-gray-900 md:w-5/12 p-8 flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#00d084]/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-[#00d084]/20 flex items-center justify-center mb-5">
                            <FiMessageSquare size={24} className="text-[#00d084]" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#00d084] bg-[#00d084]/10 px-3 py-1.5 rounded-full inline-block mb-4">
                            Admissions Open 2026
                        </span>
                        <h2 className="text-2xl font-black text-white leading-tight mb-3">
                            Secure Your Seat in a Top University
                        </h2>
                        <p className="text-white/60 text-sm font-medium leading-relaxed">
                            Get expert guidance and guaranteed management quota admissions. Our counselors reply within minutes.
                        </p>

                        <div className="mt-6 space-y-3">
                            {[
                                { icon: <FiShield size={14} />, text: '100% Secure & Transparent' },
                                { icon: <FiCheckCircle size={14} />, text: 'End-to-End Admission Support' },
                                { icon: <FiPhone size={14} />, text: 'Expert Callback Within Minutes' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[#00d084]/20 text-[#00d084] flex items-center justify-center shrink-0">
                                        {item.icon}
                                    </div>
                                    <span className="text-white/70 text-xs font-semibold">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
                        <div className="flex -space-x-2 mb-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-900 flex items-center justify-center text-xs text-gray-400">
                                    <FiUser size={12} />
                                </div>
                            ))}
                        </div>
                        <p className="text-white/50 text-xs font-semibold">
                            Join <strong className="text-white">500+</strong> students who secured their future with us.
                        </p>
                    </div>

                    {/* Desktop close button */}
                    <button
                        onClick={handleDismiss}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-red-500/80 hover:text-white transition-colors z-20"
                        aria-label="Close"
                    >
                        <FiX size={15} />
                    </button>
                </div>

                {/* ── Right Panel — Form ──────────────────────────────── */}
                <div className="w-full md:w-7/12 p-6 md:p-8 bg-gray-50/50 flex flex-col justify-center">

                    {/* Mobile-only top bar */}
                    <div className="flex items-center justify-between mb-5 md:hidden">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-[#13422E] flex items-center justify-center">
                                <FiMessageSquare size={15} className="text-[#00d084]" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-gray-900 leading-tight">Free Counselling</p>
                                <p className="text-[10px] text-gray-400 font-semibold">Admissions Open 2026</p>
                            </div>
                        </div>
                        <button
                            onClick={handleDismiss}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-red-100 hover:text-red-500 transition-colors"
                            aria-label="Close"
                        >
                            <FiX size={14} />
                        </button>
                    </div>

                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                                <FiCheckCircle size={38} />
                            </div>
                            <h3 className="font-black text-gray-900 text-2xl">Request Received!</h3>
                            <p className="text-sm text-gray-500 font-medium">Our counselor will contact you shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">

                            <div className="mb-2">
                                <h3 className="text-xl font-black text-gray-900 mb-1">Request a Free Consultation</h3>
                                <p className="text-xs text-gray-400 font-semibold">Drop your details — our counselors will call you back.</p>
                            </div>

                            {error && (
                                <div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-xl border border-red-100">
                                    {error}
                                </div>
                            )}

                            {/* Name & Phone */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Full Name</label>
                                    <div className="relative">
                                        <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
                                        <input
                                            type="text" name="name" required value={formData.name}
                                            onChange={handleChange} placeholder="John Doe"
                                            className="w-full pl-9 pr-3 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00d084]/30 focus:border-[#00d084] text-gray-900 font-bold text-sm transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Phone No.</label>
                                    <div className="relative">
                                        <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
                                        <input
                                            type="tel" name="phone" required value={formData.phone}
                                            onChange={handleChange} placeholder="+91 98765 43210"
                                            className="w-full pl-9 pr-3 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00d084]/30 focus:border-[#00d084] text-gray-900 font-bold text-sm transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                                    Email Address <span className="normal-case font-medium">(optional)</span>
                                </label>
                                <div className="relative">
                                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
                                    <input
                                        type="email" name="email" value={formData.email}
                                        onChange={handleChange} placeholder="john@example.com"
                                        className="w-full pl-9 pr-3 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00d084]/30 focus:border-[#00d084] text-gray-900 font-bold text-sm transition-all"
                                    />
                                </div>
                            </div>

                            {/* Course & City */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Interested Course</label>
                                    <div className="relative">
                                        <FiBookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={13} />
                                        <input
                                            type="text" name="interestedCourse" required value={formData.interestedCourse}
                                            onChange={handleChange} placeholder="e.g. MBBS, B.Tech"
                                            className="w-full pl-9 pr-3 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00d084]/30 focus:border-[#00d084] text-gray-900 font-bold text-sm transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Preferred Location</label>
                                    <div className="relative">
                                        <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={13} />
                                        <input
                                            type="text" name="preferredCity" required value={formData.preferredCity}
                                            onChange={handleChange} placeholder="e.g. Delhi, Mumbai"
                                            className="w-full pl-9 pr-3 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00d084]/30 focus:border-[#00d084] text-gray-900 font-bold text-sm transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full bg-gray-900 text-white font-extrabold py-4 rounded-xl shadow-lg hover:bg-[#13422E] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-sm mt-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? (
                                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Submitting...</>
                                ) : (
                                    <>Request Free Callback <FiArrowRight size={15} /></>
                                )}
                            </button>

                            <p className="text-center text-[10px] text-gray-400 font-bold flex items-center justify-center gap-1 mt-1">
                                <FiShield size={10} /> Your information is 100% secure · No Spam
                            </p>

                        </form>
                    )}
                </div>

            </div>
        </div>
    );
};

export default FloatingLeadForm;