import React, { useState } from 'react';
import axios from 'axios';
import { FiCheckCircle, FiShield, FiTrendingUp, FiArrowRight, FiBookOpen, FiMapPin, FiPhone, FiUser, FiMail } from 'react-icons/fi';

const LeadCaptureForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        interestedCourse: '',
        preferredCity: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            // This hits the backend route we built for the Lead Pipeline
            await axios.post(`${backendURL}/api/inquiries`, {
                ...formData,
                source: 'Website Form' // Automatically tags the lead source
            });

            setIsSuccess(true);
            setFormData({ name: '', phone: '', email: '', interestedCourse: '', preferredCity: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setIsSuccess(false), 5000);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 animate-fade-in-up">
            <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col lg:flex-row">

                {/* 🟢 LEFT SIDE: Trust Signals & Social Proof */}
                <div className="lg:w-5/12 bg-gradient-to-br from-gray-900 via-[#13422E] to-jcs-deep p-10 md:p-14 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-jcs-brand opacity-10 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <span className="bg-white/10 text-jcs-brand text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest border border-white/10 backdrop-blur-sm inline-block mb-6">
                            Admissions Open 2026
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black leading-tight mb-6 tracking-tight">
                            Secure Your Seat in Top Universities Today.
                        </h2>
                        <p className="text-gray-300 font-medium mb-10 text-lg">
                            Skip the uncertainty. Get expert guidance and guaranteed management quota admissions across premium colleges.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-jcs-brand/20 text-jcs-brand flex items-center justify-center shrink-0">
                                    <FiShield size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">100% Secure & Transparent</h4>
                                    <p className="text-sm text-gray-400 mt-1">Direct college transfers, no hidden consultancy fees.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-jcs-brand/20 text-jcs-brand flex items-center justify-center shrink-0">
                                    <FiTrendingUp size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">End-to-End Processing</h4>
                                    <p className="text-sm text-gray-400 mt-1">From documentation to final seat confirmation.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
                        <div className="flex -space-x-3 mb-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full bg-gray-800 border-2 border-gray-900 flex items-center justify-center text-xs font-bold text-gray-400">
                                    <FiUser />
                                </div>
                            ))}
                        </div>
                        <p className="text-sm font-medium text-gray-400">Join <strong className="text-white">500+</strong> students who secured their future with us.</p>
                    </div>
                </div>

                {/* 🟢 RIGHT SIDE: The High-Converting Form */}
                <div className="lg:w-7/12 p-10 md:p-14 bg-gray-50/50">
                    <div className="mb-8">
                        <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Request a Free Consultation</h3>
                        <p className="text-gray-500 font-medium text-sm">Drop your details below and our expert counselors will reach out within 24 hours.</p>
                    </div>

                    {isSuccess ? (
                        <div className="bg-green-50 border border-green-200 rounded-3xl p-8 text-center animate-fade-in-up h-full flex flex-col justify-center items-center">
                            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <FiCheckCircle size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-2">Request Received!</h3>
                            <p className="text-green-800 font-medium">Your inquiry has been securely routed to our team. We will contact you shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100">
                                    {error}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                                    <div className="relative">
                                        <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text" name="name" required value={formData.name} onChange={handleChange}
                                            className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-jcs-brand/20 focus:border-jcs-brand transition-all text-gray-900 font-bold text-sm"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
                                    <div className="relative">
                                        <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                                            className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-jcs-brand/20 focus:border-jcs-brand transition-all text-gray-900 font-bold text-sm"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address (Optional)</label>
                                <div className="relative">
                                    <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email" name="email" value={formData.email} onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-jcs-brand/20 focus:border-jcs-brand transition-all text-gray-900 font-bold text-sm"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Interested Course</label>
                                    <div className="relative">
                                        <FiBookOpen className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                                        <select
                                            name="interestedCourse" required value={formData.interestedCourse} onChange={handleChange}
                                            className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-jcs-brand/20 focus:border-jcs-brand transition-all text-gray-900 font-bold text-sm appearance-none cursor-pointer relative"
                                        >
                                            <option value="" disabled>Select a course</option>
                                            <option value="B.Tech">B.Tech (Engineering)</option>
                                            <option value="MBBS">MBBS (Medical)</option>
                                            <option value="BDS">BDS (Dental)</option>
                                            <option value="BBA">BBA / MBA</option>
                                            <option value="Law">Law (BA LLB)</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Preferred Location</label>
                                    <div className="relative">
                                        <FiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                                        <select
                                            name="preferredCity" required value={formData.preferredCity} onChange={handleChange}
                                            className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-jcs-brand/20 focus:border-jcs-brand transition-all text-gray-900 font-bold text-sm appearance-none cursor-pointer relative"
                                        >
                                            <option value="" disabled>Select a region</option>
                                            <option value="Delhi NCR">Delhi NCR</option>
                                            <option value="Bangalore">Bangalore</option>
                                            <option value="Pune">Pune</option>
                                            <option value="Mumbai">Mumbai</option>
                                            <option value="Anywhere in India">Anywhere in India</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full bg-gray-900 text-white font-extrabold py-5 rounded-2xl shadow-lg hover:bg-jcs-deep hover:-translate-y-0.5 transition-all mt-4 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? (
                                    <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Processing...</>
                                ) : (
                                    <>Request Call Back <FiArrowRight /></>
                                )}
                            </button>

                            <p className="text-center text-xs text-gray-400 font-bold mt-4 flex items-center justify-center gap-1">
                                <FiShield /> Your information is 100% secure.
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LeadCaptureForm;