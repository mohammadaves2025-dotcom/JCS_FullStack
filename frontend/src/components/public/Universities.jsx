import React from 'react';

const Universities = () => {
    const colleges = [
        { name: "Amity University", location: "Noida, UP", tags: "Management & Tech", initials: "AU" },
        { name: "Sharda University", location: "Greater Noida, UP", tags: "Medical & Dental", initials: "SU" },
        { name: "Jamia Hamdard", location: "New Delhi", tags: "Medical & Pharmacy", initials: "JH" },
        { name: "Bennett University", location: "Greater Noida, UP", tags: "Tech & Law", initials: "BU" },
        { name: "Symbiosis", location: "Pune, MH", tags: "Business & Mgmt", initials: "SI" },
        { name: "Manipal University", location: "Bangalore", tags: "Tech & Sciences", initials: "MU" },
    ];

    return (
        <div className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-8">
                    Top Universities for <span className="text-blue-500">Direct Admission</span>
                </h2>

                {/* Tabs */}
                <div className="flex gap-8 border-b border-gray-200 mb-12 overflow-x-auto hide-scrollbar">
                    <button className="pb-4 border-b-2 border-blue-500 text-blue-500 font-bold text-lg whitespace-nowrap px-2">Delhi NCR</button>
                    <button className="pb-4 border-b-2 border-transparent text-gray-400 hover:text-gray-900 font-bold text-lg whitespace-nowrap px-2 transition-colors">Pune</button>
                    <button className="pb-4 border-b-2 border-transparent text-gray-400 hover:text-gray-900 font-bold text-lg whitespace-nowrap px-2 transition-colors">Bangalore</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {colleges.map((col, idx) => (
                        <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center gap-4 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                            <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center font-black text-gray-300 text-xl group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors duration-300 shrink-0">
                                {col.initials}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <h4 className="font-bold text-gray-900 text-lg leading-tight truncate">{col.name}</h4>
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">{col.location}</p>
                            </div>
                            <div className="bg-yellow-50 text-yellow-600 text-[9px] font-black px-3 py-1.5 rounded-md border border-yellow-200/50 uppercase tracking-wider whitespace-nowrap shrink-0">
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