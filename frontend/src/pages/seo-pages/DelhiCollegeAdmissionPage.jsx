import React from 'react';
import PublicLayout from '../../components/public/PublicLayout';
import { useSEO } from '../../hooks/useSEO';
import { FiCheckCircle, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Delhi College Admission Consultant | JCS Consultancy",
  "url": "https://www.jamiaconsultancyservices.in/delhi-college-admission",
  "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.jamiaconsultancyservices.in/" },
    { "@type": "ListItem", "position": 2, "name": "Delhi College Admission", "item": "https://www.jamiaconsultancyservices.in/delhi-college-admission" }
  ]}
};

const DelhiCollegeAdmissionPage = () => {
  useSEO({
    title: "Delhi College Admission Consultant | Top Colleges | JCS Consultancy",
    description: "Expert admission guidance for top colleges in Delhi NCR — medical, engineering, management, nursing & more. Low rank? JCS finds the right path. Call 9990922119.",
    canonical: "https://www.jamiaconsultancyservices.in/delhi-college-admission",
    keywords: "delhi college admission consultant, top colleges in delhi, admission consultant delhi ncr, low rank college admission delhi, delhi university admission help",
    schema,
  });

  return (
    <PublicLayout>
      <div className="pt-32 pb-20 bg-gradient-to-br from-jcs-deep to-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <span className="inline-block border border-jcs-brand/30 bg-jcs-brand/10 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 text-jcs-brand">
            Delhi NCR Admissions 2026
          </span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            Delhi College Admission<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-jcs-brand to-white">Consultant & Guide</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mb-8">
            JCS Consultancy covers 50+ colleges across Delhi NCR — from Jamia Hamdard to IP University affiliates, medical colleges to management institutes. We find the right college for YOUR profile.
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
          <h2 className="text-3xl font-black text-gray-900 mb-10 text-center">College Categories We Cover in Delhi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "🏥", cat: "Medical Colleges", desc: "MBBS, BAMS, BHMS, BDS admissions across Delhi" },
              { icon: "⚙️", cat: "Engineering Colleges", desc: "B.Tech in top IP University & private colleges" },
              { icon: "💼", cat: "Management Colleges", desc: "MBA, BBA, MCA, BCA in reputed institutes" },
              { icon: "🏥", cat: "Nursing Colleges", desc: "B.Sc Nursing, GNM, ANM in Delhi NCR" },
              { icon: "💊", cat: "Pharmacy Colleges", desc: "B.Pharm, M.Pharm, D.Pharm in Delhi" },
              { icon: "🌐", cat: "Allied Health Sciences", desc: "Physiotherapy, MLT, OT & more" },
            ].map((c, i) => (
              <div key={i} className="p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-jcs-brand/30 transition-all">
                <span className="text-3xl mb-3 block">{c.icon}</span>
                <h3 className="font-black text-gray-900 mb-1">{c.cat}</h3>
                <p className="text-gray-600 text-sm">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 bg-jcs-deep text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <FiMapPin size={40} className="mx-auto mb-4 text-jcs-brand" />
          <h2 className="text-3xl font-black mb-4">Serving All of Delhi NCR</h2>
          <p className="text-gray-300 mb-8">Whether you're in South Delhi, Noida, Gurgaon, Faridabad or anywhere in NCR — JCS is your local admission expert.</p>
          <a href="tel:+919990922119" className="inline-flex items-center gap-2 bg-jcs-brand text-gray-900 font-black px-10 py-4 rounded-2xl hover:bg-white transition-all">
            <FiPhone /> Call Now: 9990922119
          </a>
        </div>
      </div>
    </PublicLayout>
  );
};
export default DelhiCollegeAdmissionPage;
