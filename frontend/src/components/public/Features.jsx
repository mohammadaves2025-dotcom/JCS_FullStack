import React from 'react';
import { FiMonitor, FiFileText, FiGlobe, FiUsers, FiBook, FiAward } from 'react-icons/fi';

const Features = () => {
    return (
        <div className="py-24 bg-white relative z-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                
                {/* TOP STATS */}
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-16">
                        Why Choose <span className="text-jcs-brand">JCS?</span>
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="group cursor-pointer"><div className="text-5xl mb-4 group-hover:-translate-y-2 transition-transform duration-300">🤝</div><h4 className="font-black text-2xl text-gray-900">50+</h4><p className="text-sm font-bold text-gray-500 mt-1">University Partners</p></div>
                        <div className="group cursor-pointer"><div className="text-5xl mb-4 group-hover:-translate-y-2 transition-transform duration-300">🏆</div><h4 className="font-black text-2xl text-gray-900">1,200+</h4><p className="text-sm font-bold text-gray-500 mt-1">Success Stories</p></div>
                        <div className="group cursor-pointer"><div className="text-5xl mb-4 group-hover:-translate-y-2 transition-transform duration-300">🏅</div><h4 className="font-black text-2xl text-gray-900">100%</h4><p className="text-sm font-bold text-gray-500 mt-1">Admission Success</p></div>
                        <div className="group cursor-pointer"><div className="text-5xl mb-4 group-hover:-translate-y-2 transition-transform duration-300">🎓</div><h4 className="font-black text-2xl text-gray-900">Premium</h4><p className="text-sm font-bold text-gray-500 mt-1">Management Quotas</p></div>
                    </div>
                </div>

                {/* ADVANTAGE GRID */}
                <div className="bg-gray-50/50 rounded-[3rem] p-10 md:p-16 border border-gray-100">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-12 text-center md:text-left">
                        JCS <span className="text-jcs-brand">Advantage</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-10">
                        <div className="flex items-start gap-5 group cursor-pointer">
                            <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300"><FiMonitor size={24}/></div>
                            <div><h4 className="font-bold text-gray-900 text-lg mb-1">Find the Right Program</h4><p className="text-sm text-gray-500 font-medium">Data-driven shortlisting based on your academic profile.</p></div>
                        </div>
                        <div className="flex items-start gap-5 group cursor-pointer">
                            <div className="w-14 h-14 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center shrink-0 border border-purple-100 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300"><FiFileText size={24}/></div>
                            <div><h4 className="font-bold text-gray-900 text-lg mb-1">Expert Application Support</h4><p className="text-sm text-gray-500 font-medium">We handle the paperwork, tracking, and seat booking.</p></div>
                        </div>
                        <div className="flex items-start gap-5 group cursor-pointer">
                            <div className="w-14 h-14 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center shrink-0 border border-green-100 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300"><FiAward size={24}/></div>
                            <div><h4 className="font-bold text-gray-900 text-lg mb-1">Financial Transparency</h4><p className="text-sm text-gray-500 font-medium">No hidden fees. Secure ledger tracking in your portal.</p></div>
                        </div>
                        <div className="flex items-start gap-5 group cursor-pointer">
                            <div className="w-14 h-14 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center shrink-0 border border-orange-100 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300"><FiUsers size={24}/></div>
                            <div><h4 className="font-bold text-gray-900 text-lg mb-1">Specialist Counselors</h4><p className="text-sm text-gray-500 font-medium">Dedicated experts for Medical, Engineering & Law.</p></div>
                        </div>
                        <div className="flex items-start gap-5 group cursor-pointer">
                            <div className="w-14 h-14 bg-jcs-brand/10 text-jcs-deep rounded-2xl flex items-center justify-center shrink-0 border border-jcs-brand/20 group-hover:bg-jcs-deep group-hover:text-white transition-colors duration-300"><FiBook size={24}/></div>
                            <div><h4 className="font-bold text-gray-900 text-lg mb-1">Top-Tier Network</h4><p className="text-sm text-gray-500 font-medium">Direct tie-ups with premium institutions across India.</p></div>
                        </div>
                        <div className="flex items-start gap-5 group cursor-pointer">
                            <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center shrink-0 border border-red-100 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300"><FiGlobe size={24}/></div>
                            <div><h4 className="font-bold text-gray-900 text-lg mb-1">Student Tracking Portal</h4><p className="text-sm text-gray-500 font-medium">Track your admission status live in your dedicated portal.</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;