import React from 'react';
import PublicLayout from '../../components/public/PublicLayout';
import { useSEO } from '../../hooks/useSEO';
import { FiPhone, FiMail, FiMapPin, FiInstagram } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const schema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact JCS Consultancy",
  "url": "https://www.jamiaconsultancyservices.in/contact",
  "description": "Contact JCS Consultancy for expert admission guidance. Call, WhatsApp or email us for Jamia Hamdard, MBBS, B.Tech, MBA admissions.",
};

const ContactUsPage = () => {
  useSEO({
    title: "Contact JCS Consultancy | Admission Guidance Delhi | 9990922119",
    description: "Contact JCS Consultancy for expert college admission guidance in Delhi NCR. Call 9990922119 or WhatsApp for Jamia Hamdard, MBBS, B.Tech, MBA, Nursing admissions.",
    canonical: "https://www.jamiaconsultancyservices.in/contact",
    keywords: "jcs consultancy contact, admission consultant contact delhi, jamia hamdard admission help, college admission consultant phone number",
    schema,
  });

  return (
    <PublicLayout>
      <div className="pt-32 pb-20 bg-gradient-to-br from-jcs-deep to-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
          <span className="inline-block border border-jcs-brand/30 bg-jcs-brand/10 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 text-jcs-brand">
            Free Counselling
          </span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            Contact JCS Consultancy
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Reach out for a free, no-obligation counselling session. Our experts will guide you to the best admission options based on your academic profile.
          </p>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-gray-900">Get in Touch</h2>
              
              <a href="tel:+919990922119" className="flex items-center gap-4 p-5 bg-jcs-deep text-white rounded-2xl hover:bg-gray-900 transition-all group">
                <div className="w-12 h-12 bg-jcs-brand rounded-xl flex items-center justify-center">
                  <FiPhone size={22} className="text-gray-900" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Call Us</p>
                  <p className="text-xl font-black">9990922119</p>
                </div>
              </a>

              <a href="https://wa.me/919990922119" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-5 bg-[#25D366] text-white rounded-2xl hover:bg-green-500 transition-all">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <FaWhatsapp size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white/70 uppercase tracking-wide">WhatsApp</p>
                  <p className="text-xl font-black">Chat with us</p>
                </div>
              </a>

              <a href="https://www.instagram.com/jcs.delhi/" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-5 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl hover:opacity-90 transition-all">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <FiInstagram size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white/70 uppercase tracking-wide">Instagram</p>
                  <p className="text-xl font-black">@jcs.delhi</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <FiMapPin size={22} className="text-jcs-brand" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Location</p>
                  <p className="font-black text-gray-900">New Delhi, India</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Services We Offer</h2>
              <div className="space-y-3">
                {[
                  "Jamia Hamdard Admission (All Courses)",
                  "MBBS Admission — Delhi & Management Quota",
                  "MBBS Abroad (Russia, Georgia, Kazakhstan)",
                  "B.Tech Admission — Delhi NCR",
                  "MBA & BBA Admission Guidance",
                  "Nursing & Allied Health Sciences",
                  "B.Pharm & M.Pharm Admissions",
                  "Low Rank Admission Specialist",
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <span className="w-1.5 h-1.5 bg-jcs-brand rounded-full shrink-0"></span>
                    {s}
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-jcs-deep rounded-2xl text-white text-center">
                <p className="text-sm font-bold text-gray-300 mb-1">Working Hours</p>
                <p className="font-black">Monday – Saturday</p>
                <p className="text-jcs-brand font-bold">9:00 AM – 7:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};
export default ContactUsPage;
