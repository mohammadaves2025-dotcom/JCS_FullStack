import React from 'react';
import PublicLayout from '../../components/public/PublicLayout';
import { useSEO } from '../../hooks/useSEO';
import { FiCheckCircle, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const BPharmAdmissionPage = () => {
  useSEO({
    title: "B.Pharm Admission in Delhi | Jamia Hamdard Pharmacy | JCS Consultancy",
    description: "Get expert B.Pharm & M.Pharm admission guidance in Delhi NCR. Jamia Hamdard is ranked #1 in Pharmacy in India. JCS Consultancy helps secure your seat. Call 9990922119.",
    canonical: "https://www.jamiaconsultancyservices.in/bpharm-admission",
    keywords: "bpharm admission delhi, jamia hamdard pharmacy admission, pharmacy college delhi, b pharm admission 2026, pharmacy management quota",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "B.Pharm Admission Delhi | JCS Consultancy",
      "url": "https://www.jamiaconsultancyservices.in/bpharm-admission",
      "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.jamiaconsultancyservices.in/" },
        { "@type": "ListItem", "position": 2, "name": "B.Pharm Admission", "item": "https://www.jamiaconsultancyservices.in/bpharm-admission" }
      ]}
    }
  });

  return (
    <PublicLayout>
      <div className="pt-32 pb-20 bg-gradient-to-br from-emerald-900 to-jcs-deep text-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <span className="inline-block border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 text-emerald-300">
            Pharmacy Admissions 2026
          </span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            B.Pharm Admission in Delhi<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-white">Jamia Hamdard — Rank #1</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mb-8">
            Jamia Hamdard is India's top-ranked pharmacy institution. JCS Consultancy specializes in securing B.Pharm and M.Pharm seats through direct and management quota admissions.
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
          <h2 className="text-3xl font-black text-gray-900 mb-10 text-center">Pharmacy Courses at Jamia Hamdard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { prog: "B.Pharm", desc: "4-year Bachelor of Pharmacy — India's most sought-after pharmacy degree from the #1 ranked institute." },
              { prog: "M.Pharm", desc: "2-year Master of Pharmacy in specializations like Pharmaceutics, Pharmacology & Pharmaceutical Chemistry." },
              { prog: "Pharm.D", desc: "6-year Doctor of Pharmacy programme — clinical pharmacy & patient care focused." },
              { prog: "D.Pharm", desc: "2-year Diploma in Pharmacy — quick entry path into the pharmaceutical sector." },
            ].map((p, i) => (
              <div key={i} className="flex gap-4 p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                <span className="w-16 h-14 bg-emerald-700 text-white rounded-xl flex items-center justify-center font-black text-xs shrink-0 text-center px-1">{p.prog}</span>
                <div><h3 className="font-black text-gray-900">{p.prog}</h3><p className="text-gray-600 text-sm mt-1">{p.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 bg-jcs-deep text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-black mb-4">Secure Your Pharmacy Seat</h2>
          <p className="text-gray-300 mb-8">Limited seats at India's top pharmacy college. Book your free counselling call with JCS today.</p>
          <a href="tel:+919990922119" className="inline-flex items-center gap-2 bg-jcs-brand text-gray-900 font-black px-10 py-4 rounded-2xl hover:bg-white transition-all">
            <FiPhone /> Call: 9990922119
          </a>
        </div>
      </div>
    </PublicLayout>
  );
};
export default BPharmAdmissionPage;
