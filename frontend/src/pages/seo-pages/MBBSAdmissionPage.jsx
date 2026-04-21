import React from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/public/PublicLayout';
import { useSEO } from '../../hooks/useSEO';
import { FiCheckCircle, FiPhone, FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "MBBS Admission in Delhi | JCS Consultancy",
  "url": "https://jcsconsultancy.in/mbbs-admission",
  "description": "Expert MBBS admission guidance in Delhi NCR. Low NEET rank? Get direct admission through management quota. Jamia Hamdard & top medical colleges.",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jcsconsultancy.in/" },
      { "@type": "ListItem", "position": 2, "name": "MBBS Admission", "item": "https://jcsconsultancy.in/mbbs-admission" }
    ]
  },
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I get MBBS admission in Delhi with a low NEET rank?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. JCS Consultancy specializes in management quota MBBS admissions in Delhi NCR including Jamia Hamdard for students with lower NEET scores." }
      },
      {
        "@type": "Question",
        "name": "What is the MBBS fee structure at Jamia Hamdard?",
        "acceptedAnswer": { "@type": "Answer", "text": "Jamia Hamdard MBBS fees vary by quota. JCS Consultancy provides detailed fee breakdowns and helps secure the best possible seat. Contact us for current fee structures." }
      }
    ]
  }
};

const MBBSAdmissionPage = () => {
  useSEO({
    title: "MBBS Admission in Delhi | Low NEET Rank | JCS Consultancy",
    description: "Get expert MBBS admission guidance in Delhi NCR. Low NEET rank? JCS Consultancy helps secure management quota seats at Jamia Hamdard & top medical colleges. Call 9990922119.",
    canonical: "https://jcsconsultancy.in/mbbs-admission",
    keywords: "mbbs admission delhi, mbbs admission low neet rank, jamia hamdard mbbs admission, mbbs management quota delhi, mbbs direct admission",
    schema,
  });

  return (
    <PublicLayout>
      <div className="pt-32 pb-20 bg-gradient-to-br from-jcs-deep to-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <span className="inline-block border border-jcs-brand/30 bg-jcs-brand/10 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 text-jcs-brand">
            MBBS Admissions 2026
          </span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            MBBS Admission in Delhi<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-jcs-brand to-white">With Expert Guidance</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mb-8">
            Low NEET rank? Don't worry. JCS Consultancy specializes in securing management quota MBBS seats at Jamia Hamdard and top medical colleges across Delhi NCR.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="tel:+919990922119" className="flex items-center gap-2 bg-jcs-brand text-gray-900 font-black px-8 py-4 rounded-2xl hover:bg-white transition-all">
              <FiPhone /> Call: 9990922119
            </a>
            <a href="https://wa.me/919990922119" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#25D366] text-white font-black px-8 py-4 rounded-2xl hover:bg-green-400 transition-all">
              <FaWhatsapp size={20} /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">Why Choose JCS for MBBS Admission?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Management quota MBBS admissions — even with low NEET rank",
              "Direct admission guidance for Jamia Hamdard MBBS",
              "Expert documentation & form filling support",
              "Fast offer letter & seat confirmation assistance",
              "Transparent fee structure with no hidden charges",
              "Dedicated counselor till final admission",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                <FiCheckCircle className="text-jcs-brand shrink-0 mt-0.5" size={20} />
                <p className="font-semibold text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8">MBBS Colleges We Cover in Delhi NCR</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["Jamia Hamdard (Hamdard Institute of Medical Sciences)", "Lady Hardinge Medical College", "Maulana Azad Medical College", "Vardhman Mahavir Medical College", "All India Institute of Medical Sciences (AIIMS)", "IP University Affiliated Medical Colleges"].map((col, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200">
                <span className="w-8 h-8 bg-jcs-deep text-white rounded-lg flex items-center justify-center font-black text-sm">{i + 1}</span>
                <p className="font-semibold text-gray-800">{col}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 bg-jcs-deep text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-black mb-4">Ready to Secure Your MBBS Seat?</h2>
          <p className="text-gray-300 mb-8">Thousands of students have secured their dream medical college with JCS. Book your free counselling session today.</p>
          <a href="tel:+919990922119" className="inline-flex items-center gap-2 bg-jcs-brand text-gray-900 font-black px-10 py-4 rounded-2xl hover:bg-white transition-all">
            <FiPhone /> Call Now: 9990922119
          </a>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">MBBS Admission FAQs</h2>
          <div className="space-y-6">
            {[
              { q: "Can I get MBBS admission in Delhi with a low NEET rank?", a: "Yes! JCS Consultancy specializes in management quota admissions. Even with a lower NEET score, we can help secure seats in reputed colleges including Jamia Hamdard through direct admission processes." },
              { q: "What documents are needed for MBBS admission?", a: "10th & 12th marksheets, NEET scorecard, category certificate (if applicable), passport photos, migration certificate, character certificate, and Aadhar card. JCS handles all documentation support." },
              { q: "How much does MBBS cost in Delhi through management quota?", a: "Fees vary by institution and quota type. JCS provides complete fee transparency with no hidden charges. Contact us for current fee structures at specific colleges." },
              { q: "How long does the MBBS admission process take?", a: "With JCS guidance, the process typically takes 2–4 weeks from counselling to offer letter. We expedite all steps to ensure you don't miss admission windows." },
            ].map((faq, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default MBBSAdmissionPage;
