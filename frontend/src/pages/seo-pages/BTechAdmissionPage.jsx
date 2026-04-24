import React from 'react';
import PublicLayout from '../../components/public/PublicLayout';
import { useSEO } from '../../hooks/useSEO';
import LeadCaptureForm from '../../components/LeadCaptureForm';
import { FiCheckCircle, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "B.Tech Admission in Delhi | JCS Consultancy",
  "url": "https://www.jamiaconsultancyservices.in/btech-admission",
  "description": "Expert B.Tech admission guidance for Jamia Hamdard, IP University & top engineering colleges in Delhi NCR. Low JEE rank? We help with management quota.",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.jamiaconsultancyservices.in/" },
      { "@type": "ListItem", "position": 2, "name": "B.Tech Admission", "item": "https://www.jamiaconsultancyservices.in/btech-admission" }
    ]
  }
};

const BTechAdmissionPage = () => {
  useSEO({
    title: "B.Tech Admission in Delhi | Jamia Hamdard | JCS Consultancy",
    description: "Get expert B.Tech admission guidance in Delhi NCR. Jamia Hamdard, IP University & top engineering colleges. Low JEE rank? Management quota available. Call 9990922119.",
    canonical: "https://www.jamiaconsultancyservices.in/btech-admission",
    keywords: "btech admission delhi, jamia hamdard btech admission, engineering admission delhi, low jee rank admission, btech management quota delhi",
    schema,
  });

  return (
    <PublicLayout>
      <div className="pt-32 pb-20 bg-gradient-to-br from-jcs-deep to-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <span className="inline-block border border-jcs-brand/30 bg-jcs-brand/10 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 text-jcs-brand">
            B.Tech Admissions 2026
          </span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            B.Tech Admission in Delhi<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-jcs-brand to-white">Made Hassle-Free</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mb-8">
            From Jamia Hamdard to IP University affiliates — JCS Consultancy guides you to the right engineering college, even with a low JEE rank.
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
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">B.Tech Admission Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Jamia Hamdard B.Tech", desc: "Computer Science, Electronics, Civil, Mechanical & more. Management quota seats available." },
              { title: "IP University Colleges", desc: "USICT, MSIT, Maharaja Surajmal — top IP University affiliated colleges in Delhi." },
              { title: "Low JEE Rank Admissions", desc: "Specialized guidance for students with lower JEE scores to secure reputed engineering seats." },
            ].map((s, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-jcs-brand/30 transition-all">
                <h3 className="font-black text-gray-900 text-lg mb-3">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 bg-jcs-deep text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-black mb-4">Start Your B.Tech Journey Today</h2>
          <p className="text-gray-300 mb-8">Free counselling session to understand your options based on JEE rank and preferred specialization.</p>
          <a href="tel:+919990922119" className="inline-flex items-center gap-2 bg-jcs-brand text-gray-900 font-black px-10 py-4 rounded-2xl hover:bg-white transition-all">
            <FiPhone /> Call Now: 9990922119
          </a>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">B.Tech Admission FAQs</h2>
          <div className="space-y-5">
            {[
              { q: "Can I get B.Tech admission in Delhi without a high JEE rank?", a: "Yes! Many colleges offer management quota seats independent of JEE cutoffs. JCS helps you identify and secure these seats at quality institutions." },
              { q: "What B.Tech specializations are available at Jamia Hamdard?", a: "Computer Science & Engineering, Electronics & Communication, Civil Engineering, Mechanical Engineering, and Electrical Engineering are among the popular choices." },
              { q: "Is documentation support included?", a: "Absolutely. JCS handles all paperwork — from form filling to offer letter follow-up — so you can focus on preparing for college." },
            ].map((faq, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Lead Capture Form */}
      <div className="py-16 bg-gray-50">
        <LeadCaptureForm />
      </div>
    </PublicLayout>
  );
};

export default BTechAdmissionPage;
