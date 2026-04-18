import React from 'react';
import { FiMonitor, FiFileText, FiGlobe, FiUsers, FiBook, FiAward ,FiArrowUpRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Features = () => {
    return (
        <div className="py-24 bg-white relative z-20">
            

            <section className="py-12 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-jcs-deep rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
                        {/* Background Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-jcs-brand opacity-10 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <span className="text-jcs-brand font-black text-xs uppercase tracking-[0.2em] mb-3 block">New Service</span>
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                                Want to study <span className="text-jcs-brand">MBBS Abroad?</span>
                            </h2>
                            <p className="text-white/70 font-medium max-w-md">
                                Low tuition fees, direct admissions, and MCI-approved universities in Georgia, Russia, and more.
                            </p>
                        </div>

                        <Link
                            to="/mbbs-abroad"
                            className="relative z-10 bg-jcs-brand text-gray-900 font-black px-8 py-4 rounded-2xl hover:bg-white hover:scale-105 transition-all shadow-lg flex items-center gap-2"
                        >
                            Explore Medical Programs <FiArrowUpRight />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Features;