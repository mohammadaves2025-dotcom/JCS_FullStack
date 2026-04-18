import React, { useEffect } from 'react';
import { FiShield, FiLock, FiCheckCircle } from 'react-icons/fi';
import PublicLayout from '../components/public/PublicLayout';

const PrivacyPolicy = () => {
    // 🟢 Keep the scroll reveal working for this page too!
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        setTimeout(() => {
            const hiddenElements = document.querySelectorAll('.reveal-on-scroll');
            hiddenElements.forEach(el => observer.observe(el));
        }, 100);

        return () => observer.disconnect();
    }, []);

    return (
        <PublicLayout>
            <div className="bg-gray-50 min-h-screen pt-32 pb-24">
                <div className="max-w-4xl mx-auto px-6">
                    
                    {/* Header Section */}
                    <div className="text-center mb-16 reveal-on-scroll">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-jcs-brand/10 text-jcs-brand mb-6">
                            <FiShield size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-gray-500 font-medium text-lg">
                            At JCS Consultancy, we are committed to protecting your privacy and ensuring that your personal information remains secure.
                        </p>
                    </div>

                    {/* Content Section */}
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 md:p-12 space-y-12 reveal-on-scroll">
                        
                        {/* Information We Collect */}
                        <section>
                            <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
                                <span className="text-jcs-brand">01.</span> Information We Collect
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                As part of our admission consultancy services, we may collect certain personal and academic information from our clients, including but not limited to:
                            </p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                {[
                                    "Full name",
                                    "Phone number",
                                    "Email address",
                                    "Residential address",
                                    "Academic records, marksheets, and certificates",
                                    "Identification documents (Aadhaar, PAN, Passport Size Photo, etc.)",
                                    "Course, college, and admission preferences"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-600 font-medium bg-gray-50 p-3 rounded-xl border border-gray-100">
                                        <FiCheckCircle className="text-jcs-brand shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Purpose of Collection */}
                        <section>
                            <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
                                <span className="text-jcs-brand">02.</span> Purpose of Collection
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                This information is collected solely for the purpose of providing complete hassle-free admission guidance, including counseling, eligibility checks, form filling, document verification, application submission, follow-ups, and support until the final stage of admission.
                            </p>
                        </section>

                        {/* Verification & Trust */}
                        <section>
                            <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
                                <span className="text-jcs-brand">03.</span> Verification & Trust
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                In some cases, we may request additional documents or identity proof to verify that the client is genuine and to ensure the admission process is carried out smoothly without any interruption or abandonment midway. This helps us maintain trust, avoid fraudulent requests, and provide the best possible consultancy service.
                            </p>
                        </section>

                        {/* Data Security & Sharing */}
                        <section>
                            <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
                                <span className="text-jcs-brand">04.</span> Data Security & Sharing
                            </h2>
                            <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-2xl mb-4">
                                <p className="text-gray-700 leading-relaxed flex items-start gap-3">
                                    <FiLock className="text-blue-500 shrink-0 mt-1" size={20} />
                                    <span>
                                        We take the safety of your personal data seriously. All documents and information shared with us are stored securely and handled with strict confidentiality.
                                    </span>
                                </p>
                            </div>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We <strong>do not sell, rent, trade, or share</strong> your personal information or documents with any third party, except where it is strictly required for admission processing with colleges, universities, examination bodies, or when required by law.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Our team follows reasonable administrative and technical measures to safeguard your data from unauthorized access, misuse, loss, or disclosure.
                            </p>
                        </section>

                        {/* Consent */}
                        <section className="pt-8 border-t border-gray-100">
                            <p className="text-gray-500 font-medium italic text-center">
                                By using our website and consultancy services, you agree to the collection and use of your information in accordance with this Privacy Policy.
                            </p>
                        </section>

                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default PrivacyPolicy;