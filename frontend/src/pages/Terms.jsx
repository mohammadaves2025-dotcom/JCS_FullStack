import React, { useEffect } from 'react';
import { FiFileText, FiAlertCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';
import PublicLayout from '../components/public/PublicLayout';

const Terms = () => {
    // 🟢 Keep the scroll reveal animations consistent!
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
                            <FiFileText size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
                            Terms & Conditions
                        </h1>
                        <p className="text-gray-500 font-medium text-lg">
                            Welcome to JCS Consultancy. By using our consultancy services, you agree to the following terms and conditions.
                        </p>
                    </div>

                    {/* Content Section */}
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 md:p-12 space-y-12 reveal-on-scroll">

                        {/* 1. Service Commitment */}
                        <section>
                            <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
                                <span className="text-jcs-brand">01.</span> Service Commitment
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                At JCS Consultancy, we strive to provide the best possible admission guidance and support to every student. Our team works diligently from the initial counseling and form filling stage until the final stage of admission.
                            </p>
                            <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-2xl">
                                <p className="text-gray-700 leading-relaxed text-sm flex items-start gap-3">
                                    <FiInfo className="text-blue-500 shrink-0 mt-0.5" size={18} />
                                    <span>
                                        While we maintain a high success rate, admission is subject to eligibility criteria, seat availability, institutional policies, and the accuracy of the documents provided by the student.
                                    </span>
                                </p>
                            </div>
                        </section>

                        {/* 2. Responsibility for Documents */}
                        <section>
                            <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
                                <span className="text-jcs-brand">02.</span> Responsibility for Student Documents
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4 font-bold">
                                The student / client is solely responsible for providing accurate, genuine, and complete documents and information.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                JCS Consultancy shall <strong>not</strong> be held responsible or liable if admission is delayed, rejected, cancelled, or fails due to:
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                                {[
                                    "Incorrect information provided by the student",
                                    "Incomplete documents",
                                    "Fake or unverifiable documents",
                                    "Delay in submission from the student’s side",
                                    "Non-cooperation during the process"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-600 font-medium bg-red-50/30 p-3 rounded-xl border border-red-100/50">
                                        <FiAlertCircle className="text-red-400 shrink-0 mt-0.5" />
                                        <span className="text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* 3. Token Amount Policy */}
                        <section>
                            <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
                                <span className="text-jcs-brand">03.</span> Token Amount Policy
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                To initiate the admission process, we charge a small token amount as a confirmation fee. This token amount is collected to ensure the commitment of the student / client once the admission process begins.
                            </p>
                            <p className="text-gray-600 leading-relaxed flex items-center gap-2 font-bold text-green-700 bg-green-50 p-4 rounded-xl border border-green-100">
                                <FiCheckCircle className="shrink-0" />
                                Upon successful admission, the token amount shall be adjusted and deducted from the final consultancy fees.
                            </p>
                        </section>

                        {/* 4. Refund Policy */}
                        <section>
                            <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
                                <span className="text-jcs-brand">04.</span> Refund Policy
                            </h2>
                            <div className="space-y-4">
                                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
                                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                        When is it refunded?
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        If the admission process fails due to any mistake, delay, or inability strictly from the consultancy’s side, the token amount will be <strong>fully refunded</strong> to the student / client.
                                    </p>
                                </div>
                                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
                                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                        When is it NOT refunded?
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        If the admission fails due to reasons arising from the student’s side, including document issues, non-responsiveness, cancellation, or withdrawal, the token amount <strong>shall not be refunded</strong>.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 5. Cancellation by Student */}
                        <section>
                            <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
                                <span className="text-jcs-brand">05.</span> Cancellation by Student
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                If the student / client chooses to cancel, withdraw, or discontinue the admission process after it has been initiated, the token amount will <strong>not be refunded under any circumstances</strong>.
                            </p>
                        </section>

                        {/* 6. Final Admission Decision */}
                        <section>
                            <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
                                <span className="text-jcs-brand">06.</span> Final Admission Decision
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                Please note that the final admission decision is always made by the respective college, university, or institution. JCS Consultancy provides professional guidance and assistance but does not independently issue admissions.
                            </p>
                        </section>

                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default Terms;