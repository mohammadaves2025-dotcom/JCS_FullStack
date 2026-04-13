import React from 'react';

const UniversityLogos = () => {
    // 🟢 Switched to domains for Google API
    const universities = [
        { name: "Amity University", domain: "amity.edu" },
        { name: "Sharda University", domain: "sharda.ac.in" },
        { name: "Jamia Millia Islamia", domain: "jmi.ac.in" },
        { name: "Galgotias University", domain: "galgotiasuniversity.edu.in" },
        { name: "Shiv Nadar", domain: "snu.edu.in" },
        { name: "Delhi University", domain: "du.ac.in" },
    ];

    const doubledUniversities = [...universities, ...universities];

    return (
        <section className="py-12 bg-white border-t border-gray-100 overflow-hidden reveal-on-scroll">
            <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
                <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
                    Direct Admissions available across Delhi NCR
                </p>
            </div>
            
            {/* Infinite Marquee Wrapper */}
            <div className="relative flex overflow-hidden w-full group">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                <div className="flex gap-10 w-max animate-infinite-scroll px-4 items-center">
                    {doubledUniversities.map((uni, idx) => (
                        <div key={idx} className="flex items-center gap-3 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer">
                            <div className="w-10 h-10 bg-white border border-gray-100 rounded-lg flex items-center justify-center p-1.5 shadow-sm shrink-0">
                                <img 
                                    src={`https://www.google.com/s2/favicons?domain=${uni.domain}&sz=128`} 
                                    alt={uni.name} 
                                    className="max-w-full max-h-full object-contain"
                                    // 🟢 BULLETPROOF FALLBACK
                                    onError={(e) => { 
                                        e.target.onerror = null; 
                                        e.target.src = `https://ui-avatars.com/api/?name=${uni.name}&background=ffffff&color=00D084&font-size=0.4&rounded=true&bold=true`; 
                                    }}
                                />
                            </div>
                            <span className="font-bold text-gray-900 text-lg whitespace-nowrap">{uni.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UniversityLogos;