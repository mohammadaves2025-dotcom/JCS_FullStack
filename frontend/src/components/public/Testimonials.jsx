import React from 'react';

const Testimonials = () => {
    const stories = [
        { name: "Adnan Khan", course: "MBBS", college: "Jamia Hamdard", img: "https://plus.unsplash.com/premium_photo-1682091992663-2e4f4a5534ba?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", quote: "JCS helped me navigate the complex admission process. Their guidance on documentation was a lifesaver! Everything was transparent from day one." },
        { name: "Sanya Sharma", course: "MBA", college: "Amity University", img: "https://plus.unsplash.com/premium_photo-1682089810582-f7b200217b67?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWFuJTIwc3R1ZGVudHxlbnwwfHwwfHx8MA%3D%3D", quote: "I was confused between 3 universities. JCS gave me a clear comparison, handled the paperwork, and secured my seat." },
        { name: "Rahul Verma", course: "MBBS", college: "Sharda University", img: "https://plus.unsplash.com/premium_photo-1683121727064-e151bd584a54?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", quote: "The portal tracking feature is amazing. I didn't have to call anyone to know my status; I just logged in and saw my offer letter ready to download." }
    ];

    return (
        <div className="py-24 bg-gray-50/50 border-t border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                
                {/* 🟢 Animated Header */}
                <div className="text-center mb-16 reveal-on-scroll">
                    <div className="line-mask">
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4 line-reveal delay-line-1 pb-2">
                            1,200+ <span className="text-jcs-brand">Success Stories</span>
                        </h2>
                    </div>
                    <div className="line-mask">
                        <p className="text-gray-500 font-medium text-lg line-reveal delay-line-2 pb-2">
                            From Dreamers to Achievers.
                        </p>
                    </div>
                </div>

                {/* 🟢 Restored Classic Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children reveal-on-scroll">
                    {stories.map((story, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative">
                            {/* Subtle Hover Glow */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-jcs-brand/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                            
                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <div className="w-12 h-12 rounded-full p-0.5 bg-white shadow-sm border border-gray-100 shrink-0">
                                    <img src={story.img} className="w-full h-full rounded-full object-cover" alt={story.name} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 leading-none group-hover:text-jcs-brand transition-colors">{story.name}</h4>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1.5">{story.course} → {story.college}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm font-medium leading-relaxed italic relative z-10">
                                "{story.quote}"
                            </p>
                            <div className="mt-6 pt-4 border-t border-gray-50 flex gap-2 relative z-10">
                                <span className="bg-blue-50 text-blue-500 text-[10px] font-bold px-2.5 py-1.5 rounded-lg tracking-wide">{story.course}</span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Testimonials;