import React from 'react';
import { NavLink } from 'react-router-dom';

const Universities = () => {
    return (
        <div className="py-24 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                {/* Header */}
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight pb-3">
                        Top Universities for <span className="text-blue-600">Direct Admission</span>
                    </h2>
                </div>

                {/* Tabs */}
                <div className="flex gap-8 border-b border-gray-200 mb-12 overflow-x-auto hide-scrollbar">
                    <button className="pb-4 border-b-2 border-blue-600 text-blue-600 font-bold text-lg whitespace-nowrap px-2">Delhi NCR</button>
                    
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* 3. Jamia Hamdard */}
                    <NavLink to="/jamia-hamdard" className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-5 shadow-sm hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                        <div className="w-20 h-20 bg-white border border-gray-100 rounded-2xl flex items-center justify-center p-2 shrink-0 shadow-inner group-hover:shadow-md transition-all duration-300">
                            <img
                                src="https://tse4.mm.bing.net/th/id/OIP.YKK58nojUNv3Edtg7QJy5wHaHj?rs=1&pid=ImgDetMain&o=7&rm=3"
                                alt="Jamia Hamdard Logo"
                                loading="lazy" className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://ui-avatars.com/api/?name=Jamia+Hamdard&background=3b82f6&color=fff&font-size=0.4&rounded=true";
                                }}
                            />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-xl leading-tight group-hover:text-blue-600 transition-colors pr-2">
                                Jamia Hamdard
                            </h4>
                            <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest mt-2">New Delhi</p>
                            <p className="text-[11px] font-black text-blue-500 uppercase tracking-widest mt-2">click here----</p>
                        </div>
                        <div className="bg-yellow-100 text-yellow-700 text-[10px] font-black px-3 py-1.5 rounded-lg border border-yellow-200 uppercase tracking-widest whitespace-nowrap shrink-0 group-hover:bg-yellow-200 transition-colors hidden sm:block">
                            Medical & Pharmacy
                        </div>
                    </NavLink>

                    {/* 1. Amity University */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-5 shadow-sm hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                        <div className="w-20 h-20 bg-white border border-gray-100 rounded-2xl flex items-center justify-center p-2 shrink-0 shadow-inner group-hover:shadow-md transition-all duration-300">
                            <img src="https://p7.hiclipart.com/preview/931/650/469/amity-university-noida-amity-school-of-engineering-amity-business-school-campus-university-logo.jpg" alt="Amity University Logo" loading="lazy" className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-xl leading-tight group-hover:text-blue-600 transition-colors pr-2">
                                Amity University
                            </h4>
                            <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest mt-2">Noida, UP</p>
                        </div>
                        <div className="bg-yellow-100 text-yellow-700 text-[10px] font-black px-3 py-1.5 rounded-lg border border-yellow-200 uppercase tracking-widest whitespace-nowrap shrink-0 group-hover:bg-yellow-200 transition-colors hidden sm:block">
                            Management & Tech
                        </div>
                    </div>

                    {/* 2. Sharda University */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-5 shadow-sm hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                        <div className="w-20 h-20 bg-white border border-gray-100 rounded-2xl flex items-center justify-center p-2 shrink-0 shadow-inner group-hover:shadow-md transition-all duration-300">
                            <img
                                src="https://www.google.com/s2/favicons?domain=sharda.ac.in&sz=128"
                                alt="Sharda University Logo"
                                loading="lazy" className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://ui-avatars.com/api/?name=Sharda+University&background=3b82f6&color=fff&font-size=0.4&rounded=true";
                                }}
                            />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-xl leading-tight group-hover:text-blue-600 transition-colors pr-2">
                                Sharda University
                            </h4>
                            <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest mt-2">Greater Noida, UP</p>
                        </div>
                        <div className="bg-yellow-100 text-yellow-700 text-[10px] font-black px-3 py-1.5 rounded-lg border border-yellow-200 uppercase tracking-widest whitespace-nowrap shrink-0 group-hover:bg-yellow-200 transition-colors hidden sm:block">
                            Medical & Dental
                        </div>
                    </div>



                    {/* 4. Bennett University */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-5 shadow-sm hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                        <div className="w-20 h-20 bg-white border border-gray-100 rounded-2xl flex items-center justify-center p-2 shrink-0 shadow-inner group-hover:shadow-md transition-all duration-300">
                            <img
                                src="https://www.google.com/s2/favicons?domain=bennett.edu.in&sz=128"
                                alt="Bennett University Logo"
                                loading="lazy" className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://ui-avatars.com/api/?name=Bennett+University&background=3b82f6&color=fff&font-size=0.4&rounded=true";
                                }}
                            />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-xl leading-tight group-hover:text-blue-600 transition-colors pr-2">
                                Bennett University
                            </h4>
                            <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest mt-2">Greater Noida, UP</p>
                        </div>
                        <div className="bg-yellow-100 text-yellow-700 text-[10px] font-black px-3 py-1.5 rounded-lg border border-yellow-200 uppercase tracking-widest whitespace-nowrap shrink-0 group-hover:bg-yellow-200 transition-colors hidden sm:block">
                            Tech & Law
                        </div>
                    </div>

                    {/* 5. Symbiosis */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-5 shadow-sm hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                        <div className="w-20 h-20 bg-white border border-gray-100 rounded-2xl flex items-center justify-center p-2 shrink-0 shadow-inner group-hover:shadow-md transition-all duration-300">
                            <img
                                src="https://tse3.mm.bing.net/th/id/OIP.adG5pU8l1d-jk84P5rv2owAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
                                alt="Symbiosis Logo"
                                loading="lazy" className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://ui-avatars.com/api/?name=Symbiosis&background=3b82f6&color=fff&font-size=0.4&rounded=true";
                                }}
                            />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-xl leading-tight group-hover:text-blue-600 transition-colors pr-2">
                                Symbiosis
                            </h4>
                            <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest mt-2">Pune, MH</p>
                        </div>
                        <div className="bg-yellow-100 text-yellow-700 text-[10px] font-black px-3 py-1.5 rounded-lg border border-yellow-200 uppercase tracking-widest whitespace-nowrap shrink-0 group-hover:bg-yellow-200 transition-colors hidden sm:block">
                            Business & Mgmt
                        </div>
                    </div>

                    {/* 6. Manipal University */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-5 shadow-sm hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                        <div className="w-20 h-20 bg-white border border-gray-100 rounded-2xl flex items-center justify-center p-2 shrink-0 shadow-inner group-hover:shadow-md transition-all duration-300">
                            <img
                                src="https://www.facultyplus.com/wp-content/uploads/2021/05/220px-Manipal_University_logo.png"
                                alt="Manipal University Logo"
                                loading="lazy" className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://ui-avatars.com/api/?name=Manipal+University&background=3b82f6&color=fff&font-size=0.4&rounded=true";
                                }}
                            />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-xl leading-tight group-hover:text-blue-600 transition-colors pr-2">
                                Manipal University
                            </h4>
                            <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest mt-2">Bangalore</p>
                        </div>
                        <div className="bg-yellow-100 text-yellow-700 text-[10px] font-black px-3 py-1.5 rounded-lg border border-yellow-200 uppercase tracking-widest whitespace-nowrap shrink-0 group-hover:bg-yellow-200 transition-colors hidden sm:block">
                            Tech & Sciences
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Universities;