import React from 'react';
import PublicLayout from '../../components/public/PublicLayout';
import { useSEO } from '../../hooks/useSEO';
import { FiCheckCircle, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Nursing Admission in Delhi | JCS Consultancy",
  "url": "https://jcsconsultancy.in/nursing-admission",
  "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jcsconsultancy.in/" },
    { "@type": "ListItem", "position": 2, "name": "Nursing Admission", "item": "https://jcsconsultancy.in/nursing-admission" }
  ]}
};

const NursingAdmissionPage = () => {
  useSEO({
    title: "Nursing Admission in Delhi | B.Sc Nursing | JCS Consultancy",
    description: "Expert B.Sc Nursing, GNM, Post Basic Nursing admission guidance in Delhi NCR. Jamia Hamdard Faculty of Nursing & top colleges. Call JCS: 9990922119.",
    canonical: "https://jcsconsultancy.in/nursing-admission",
    keywords: "nursing admission delhi, bsc nursing admission, gnm nursing delhi, jamia hamdard nursing admission, nursing college delhi ncr",
    schema,
  });

  return (
    <PublicLayout>
      <div className="pt-32 pb-20 bg-gradient-to-br from-pink-900 to-jcs-deep text-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <span className="inline-block border border-pink-400/30 bg-pink-400/10 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 text-pink-300">
            Nursing Admissions 2026
          </span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            Nursing Admission in Delhi<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-white">With JCS Guidance</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mb-8">
            B.Sc Nursing, GNM, Post Basic Nursing, M.Sc Nursing — JCS Consultancy covers all nursing courses at Jamia Hamdard and top Delhi colleges.
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
          <h2 className="text-3xl font-black text-gray-900 mb-10 text-center">Nursing Courses We Cover</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["B.Sc (Hons.) Nursing", "Post Basic B.Sc Nursing", "GNM (General Nursing & Midwifery)", "M.Sc Nursing (All Specializations)", "Diploma in Nursing", "ANM (Auxiliary Nurse Midwifery)"].map((c, i) => (
              <div key={i} className="flex items-center gap-2 p-4 bg-pink-50 rounded-xl border border-pink-100">
                <FiCheckCircle className="text-pink-500 shrink-0" size={16} />
                <p className="font-semibold text-gray-800 text-sm">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 bg-jcs-deep text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-black mb-4">Secure Your Nursing Seat Today</h2>
          <p className="text-gray-300 mb-8">Limited management quota seats available. Contact JCS now for a free counselling session.</p>
          <a href="tel:+919990922119" className="inline-flex items-center gap-2 bg-jcs-brand text-gray-900 font-black px-10 py-4 rounded-2xl hover:bg-white transition-all">
            <FiPhone /> Call Now: 9990922119
          </a>
        </div>
      </div>
    </PublicLayout>
  );
};
export default NursingAdmissionPage;
