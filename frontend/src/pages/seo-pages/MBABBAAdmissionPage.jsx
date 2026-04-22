import React from 'react';
import PublicLayout from '../../components/public/PublicLayout';
import { useSEO } from '../../hooks/useSEO';
import { FiCheckCircle, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "MBA BBA Admission in Delhi | JCS Consultancy",
  "url": "https://www.jamiaconsultancyservices.in/mba-bba-admission",
  "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.jamiaconsultancyservices.in/" },
    { "@type": "ListItem", "position": 2, "name": "MBA/BBA Admission", "item": "https://www.jamiaconsultancyservices.in/mba-bba-admission" }
  ]}
};

const MBABBAAdmissionPage = () => {
  useSEO({
    title: "MBA & BBA Admission in Delhi | Jamia Hamdard | JCS Consultancy",
    description: "Expert MBA & BBA admission guidance in Delhi NCR. Jamia Hamdard, IP University & top management colleges. Direct admission support. Call JCS: 9990922119.",
    canonical: "https://www.jamiaconsultancyservices.in/mba-bba-admission",
    keywords: "mba admission delhi, bba admission delhi, jamia hamdard mba admission, management college admission delhi, mba direct admission",
    schema,
  });

  return (
    <PublicLayout>
      <div className="pt-32 pb-20 bg-gradient-to-br from-blue-900 to-jcs-deep text-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <span className="inline-block border border-blue-400/30 bg-blue-400/10 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 text-blue-300">
            MBA & BBA Admissions 2026
          </span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            MBA & BBA Admission in Delhi<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">Expert Guidance</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mb-8">
            JCS Consultancy provides end-to-end MBA and BBA admission support for Jamia Hamdard, IP University, and top management colleges across Delhi NCR.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="tel:+919990922119" className="flex items-center gap-2 bg-jcs-brand text-gray-900 font-black px-8 py-4 rounded-2xl hover:bg-white transition-all">
              <FiPhone /> Call: 9990922119
            </a>
            <a href="https://wa.me/919990922119" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#25D366] text-white font-black px-8 py-4 rounded-2xl transition-all">
              <FaWhatsapp size={20} /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-10 text-center">Management Programs We Cover</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { prog: "MBA", desc: "Master of Business Administration — General, Finance, Marketing, HR, Operations." },
              { prog: "BBA", desc: "Bachelor of Business Administration — foundation for future business leaders." },
              { prog: "MCA", desc: "Master of Computer Applications — for tech-focused management careers." },
              { prog: "BCA", desc: "Bachelor of Computer Applications — blend of IT and business fundamentals." },
            ].map((p, i) => (
              <div key={i} className="flex gap-4 p-5 bg-blue-50 rounded-2xl border border-blue-100">
                <span className="w-14 h-14 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black text-sm shrink-0">{p.prog}</span>
                <div><h3 className="font-black text-gray-900">{p.prog}</h3><p className="text-gray-600 text-sm mt-1">{p.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 bg-jcs-deep text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-black mb-4">Start Your Management Career Journey</h2>
          <p className="text-gray-300 mb-8">Free counselling session — we match your profile to the best MBA/BBA program available.</p>
          <a href="tel:+919990922119" className="inline-flex items-center gap-2 bg-jcs-brand text-gray-900 font-black px-10 py-4 rounded-2xl hover:bg-white transition-all">
            <FiPhone /> Call Now: 9990922119
          </a>
        </div>
      </div>
    </PublicLayout>
  );
};
export default MBABBAAdmissionPage;
