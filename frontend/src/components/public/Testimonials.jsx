import React from 'react';

const Testimonials = () => {
    const stories = [
        { name: "Adnan Khan", course: "B.Tech CSE", college: "Jamia Millia", img: "11", quote: "JCS helped me navigate the complex admission process. Their guidance on documentation was a lifesaver! Everything was transparent from day one." },
        { name: "Sanya Sharma", course: "MBA", college: "Amity University", img: "12", quote: "I was confused between 3 universities. JCS gave me a clear comparison, handled the paperwork, and secured my seat in less than 48 hours." },
        { name: "Rahul Verma", course: "MBBS", college: "Sharda University", img: "15", quote: "The portal tracking feature is amazing. I didn't have to call anyone to know my status; I just logged in and saw my offer letter ready to download." }
    ];

    return (
        <div className="py-24 bg-gray-50/50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-2">
                    1,200+ <span className="text-jcs-brand">Success Stories</span>
                </h2>
                <p className="text-gray-500 font-medium text-lg mb-12">From Dreamers to Achievers.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stories.map((story, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                            <div className="flex items-center gap-4 mb-6">
                                <img src={`https://i.pravatar.cc/150?img=${story.img}`} className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100" alt={story.name} />
                                <div>
                                    <h4 className="font-bold text-gray-900 leading-none">{story.name}</h4>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{story.course} → {story.college}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm font-medium leading-relaxed italic">
                                "{story.quote}"
                            </p>
                            <div className="mt-6 pt-4 border-t border-gray-50 flex gap-2">
                                <span className="bg-blue-50 text-blue-500 text-[10px] font-bold px-2 py-1 rounded-md">{story.course}</span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Testimonials;