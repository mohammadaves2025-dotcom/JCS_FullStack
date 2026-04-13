import React from 'react';

const Universities = () => {
    // 🟢 Switched to domains so we can use Google's ultra-reliable API
    const colleges = [
        { name: "Amity University", location: "Noida, UP", tags: "Management & Tech", domain: "amity.edu" },
        { name: "Sharda University", location: "Greater Noida, UP", tags: "Medical & Dental", domain: "sharda.ac.in" },
        { name: "Jamia Hamdard", location: "New Delhi", tags: "Medical & Pharmacy", domain: "jamiahamdard.edu" },
        { name: "Bennett University", location: "Greater Noida, UP", tags: "Tech & Law", domain: "bennett.edu.in" },
        { name: "Symbiosis", location: "Pune, MH", tags: "Business & Mgmt", domain: "siu.edu.in" },
        { name: "Manipal University", location: "Bangalore", tags: "Tech & Sciences", domain: "manipal.edu" },
    ];

    return (
        <div className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                
                {/* Animated Header */}
                <div className="mb-12 reveal-on-scroll">
                    <div className="line-mask">
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight line-reveal delay-line-1 pb-3">
                            Top Universities for <span className="text-blue-500">Direct Admission</span>
                        </h2>
                    </div>
                </div>

                {/* Animated Tabs */}
                <div className="flex gap-8 border-b border-gray-200 mb-12 overflow-x-auto hide-scrollbar reveal-on-scroll delay-100">
                    <button className="pb-4 border-b-2 border-blue-500 text-blue-500 font-bold text-lg whitespace-nowrap px-2">Delhi NCR</button>
                    <button className="pb-4 border-b-2 border-transparent text-gray-400 hover:text-gray-900 font-bold text-lg whitespace-nowrap px-2 transition-colors">Pune</button>
                    <button className="pb-4 border-b-2 border-transparent text-gray-400 hover:text-gray-900 font-bold text-lg whitespace-nowrap px-2 transition-colors">Bangalore</button>
                </div>

                {/* Staggered Animated Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children reveal-on-scroll">
                    {colleges.map((col, idx) => (
                        <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center gap-4 shadow-[0_5px_15px_rgba(0,0,0,0.02)] hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                            
                            {/* Premium Logo Container */}
                            <div className="w-16 h-16 bg-white border border-gray-100 rounded-xl flex items-center justify-center p-2.5 shrink-0 shadow-sm group-hover:shadow-md transition-all duration-300">
                                <img 
                                    src={`https://www.google.com/s2/favicons?domain=${col.domain}&sz=128`} 
                                    alt={`${col.name} Logo`} 
                                    className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                                    // 🟢 BULLETPROOF FALLBACK: If image fails, create a beautiful initials avatar!
                                    onError={(e) => { 
                                        e.target.onerror = null; 
                                        e.target.src = `https://ui-avatars.com/api/?name=${col.name}&background=f3f4f6&color=3b82f6&font-size=0.4&rounded=true`; 
                                    }}
                                />
                            </div>

                            <div className="flex-1">
                                <h4 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors pr-2">
                                    {col.name}
                                </h4>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1.5">{col.location}</p>
                            </div>

                            <div className="bg-yellow-50 text-yellow-600 text-[9px] font-black px-3 py-1.5 rounded-lg border border-yellow-200/50 uppercase tracking-widest whitespace-nowrap shrink-0 group-hover:bg-yellow-100 transition-colors hidden sm:block">
                                {col.tags}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Universities;