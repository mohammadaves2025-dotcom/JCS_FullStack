import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import PublicLayout from '../../components/public/PublicLayout';
import { useSEO } from '../../hooks/useSEO';
import { FiCalendar, FiClock, FiArrowLeft, FiArrowRight, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const DOMAIN = 'https://www.jamiaconsultancyservices.in';

const POSTS = {
    'how-to-get-admission-in-jamia-hamdard': {
        title: 'How to Get Admission in Jamia Hamdard University in 2026',
        description: 'Complete step-by-step guide to Jamia Hamdard University admissions in 2026 — courses, eligibility, entrance tests, management quota, fees and deadlines.',
        date: '2026-04-15', dateDisplay: 'April 15, 2026',
        author: 'JCS Admissions Team', category: 'Jamia Hamdard', readTime: '6 min read',
        keywords: 'jamia hamdard admission 2026, jamia hamdard admission process, how to get admission jamia hamdard, jamia hamdard courses eligibility',
        sections: [
            { p: "Jamia Hamdard University, located in New Delhi, is one of India's premier deemed universities — especially renowned for its medical, pharmaceutical, and engineering programs. Every year, thousands of students apply for a limited number of seats. This guide covers everything you need to know about securing admission in 2026." },
            { h2: 'Courses Available at Jamia Hamdard', p: 'Jamia Hamdard offers undergraduate and postgraduate programs across multiple faculties. Most sought-after: MBBS, B.Pharm, D.Pharm, B.Tech (CSE/ECE/Biotech), BCA, MCA, MBA, BBA, B.Sc Nursing, and Allied Health Sciences.' },
            { h2: 'Eligibility Criteria', p: 'MBBS: 10+2 PCB with 50% marks (45% reserved), valid NEET. B.Tech: 10+2 PCM with 50% marks, valid JEE Main. B.Pharm: 10+2 PCB or PCM, 50% marks. MBA/BBA: Graduation in any discipline with CAT/MAT/university entrance.' },
            { h2: 'Admission Process — Step by Step', steps: ['Check the official Jamia Hamdard website for the current admission notification and key dates.', 'Register on the admission portal and fill out the application form accurately.', 'Upload required documents: 10th & 12th marksheets, entrance scorecard, passport photo, ID proof.', 'Pay the application fee online (typically Rs.1,000-2,000).', 'Appear for counselling rounds — merit-based or management quota as applicable.', 'Pay seat confirmation fee and submit original documents for verification.', 'Complete hostel and fee payment formalities to secure your seat.'] },
            { h2: 'Management Quota Admissions', p: 'Management quota seats are available for students who may not qualify through merit-based counselling. These seats are filled directly by the institution based on marks and documents — without needing a high entrance rank. JCS Consultancy specializes in securing management quota seats, handling the entire process from documentation to seat confirmation.' },
            { h2: 'Documents Required', list: ['10th Mark Sheet & Certificate', '12th Mark Sheet & Passing Certificate', 'NEET / JEE / Entrance Exam Scorecard', 'Category Certificate (SC/ST/OBC if applicable)', 'Migration Certificate', 'Character Certificate', '6 Passport-size photographs', 'Aadhaar Card / Passport', 'Transfer Certificate (TC)', 'Medical Fitness Certificate (MBBS applicants)'] },
            { h2: 'Key Deadlines for 2026', p: 'Jamia Hamdard typically opens admission forms between April and June. MBBS counselling follows the NEET national timeline (July-August). B.Tech admissions follow JEE counselling. Management quota admissions often have extended deadlines through September. Contact JCS Consultancy for the most current dates.' },
        ]
    },
    'best-courses-in-jamia-hamdard-after-12th': {
        title: 'Best Courses in Jamia Hamdard After 12th — Science, Commerce & Arts',
        description: 'Discover the top undergraduate courses at Jamia Hamdard for Science, Commerce and Arts students — with future scope, salary insights and eligibility criteria.',
        date: '2026-04-10', dateDisplay: 'April 10, 2026',
        author: 'JCS Admissions Team', category: 'Course Guidance', readTime: '7 min read',
        keywords: 'best courses jamia hamdard after 12th, jamia hamdard science courses, jamia hamdard commerce courses, jamia hamdard undergraduate programs 2026',
        sections: [
            { p: "Choosing the right course after 12th is one of the most important decisions of your life. Jamia Hamdard University offers a wide range of programs with strong industry connections and excellent placement records. Here's a detailed breakdown by stream." },
            { h2: 'Top Courses for Science (PCB) Students', p: "MBBS remains the most prestigious program. Jamia Hamdard's medical school is among the top private medical colleges in India. B.Pharm is another excellent option with strong placement in pharma companies. B.Sc Nursing from Jamia Hamdard's Faculty of Nursing offers excellent career prospects in India and abroad. Allied Health Sciences — Physiotherapy, Medical Lab Technology, Radiology — are high-demand fields." },
            { h2: 'Top Courses for Science (PCM) Students', p: "B.Tech in Computer Science Engineering is the most popular choice with strong IT placements. B.Tech in Electronics & Communication Engineering and Biotechnology Engineering are also available. BCA is a strong option for a technology career without the JEE cutoff pressure." },
            { h2: 'Top Courses for Commerce Students', p: "BBA at Jamia Hamdard has a strong alumni network and a direct pathway to MBA. B.Com and integrated MBA programs are ideal for finance, banking, and management careers. Jamia Hamdard's AICTE-recognized MBA is popular among both fresh graduates and working professionals." },
            { h2: 'Salary & Future Scope', list: ['MBBS: Rs.8-25 LPA starting (government hospitals)', 'B.Tech CSE: Rs.5-18 LPA at top tech companies', 'B.Pharm: Rs.3-8 LPA in pharma and hospital pharmacy', 'B.Sc Nursing: Rs.3-6 LPA in India; Rs.40-80 LPA abroad (UK, Australia, Canada)', 'MBA: Rs.6-20 LPA depending on specialization', 'BCA: Rs.3-10 LPA with strong growth potential'] },
            { h2: 'How JCS Consultancy Helps', p: 'Our counsellors assess your marks, interests, and career goals to recommend the best course-college combination. We handle the entire Jamia Hamdard admission process from form filling to seat booking. Over 1,200 students placed successfully.' },
        ]
    },
    'mbbs-admission-delhi-low-rank': {
        title: 'MBBS Admission in Delhi with Low NEET Rank — A Complete Guide',
        description: 'Low NEET score? All legitimate options for securing an MBBS seat in Delhi NCR — management quota, deemed universities, and MBBS abroad explained.',
        date: '2026-04-05', dateDisplay: 'April 5, 2026',
        author: 'JCS Admissions Team', category: 'MBBS', readTime: '8 min read',
        keywords: 'mbbs admission low neet rank delhi, low neet mbbs seat delhi NCR, management quota mbbs delhi, mbbs without high neet score 2026',
        sections: [
            { p: "Every year, hundreds of thousands of students appear for NEET — but only a fraction secure seats in government medical colleges. If your NEET rank is lower than expected, don't give up. There are multiple legitimate pathways to secure an MBBS seat in Delhi NCR." },
            { h2: 'What is the Minimum NEET Score for MBBS in Delhi?', p: 'Government medical colleges in Delhi typically require a rank in the top 5,000-15,000 for general category students. However, private deemed universities and management quota seats are available for students with ranks between 15,000 and 1,00,000 and beyond. Jamia Hamdard University accepts management quota MBBS admissions with relatively flexible cutoffs.' },
            { h2: 'Option 1: Management Quota Seats', p: 'Management quota seats at private and deemed medical colleges including Jamia Hamdard are reserved for direct admission outside the merit list. These are filled based on candidate marks, category, and availability. Fees are typically higher than government quota. JCS Consultancy has strong connections with Jamia Hamdard management and helps students secure these seats efficiently.' },
            { h2: 'Option 2: NRI / Paid Seats', p: 'Some private medical colleges offer NRI or paid seats to Indian students at a premium fee. These have separate application processes and cutoffs. JCS Consultancy guides families through the documentation and eligibility for these categories.' },
            { h2: 'Option 3: MBBS Abroad', p: 'If your NEET rank is very low, MBBS abroad is a viable and increasingly popular option. Countries like Russia, Georgia, Kazakhstan, and the Philippines offer NMC-approved MBBS programs at a total cost of Rs.20-40 lakhs — significantly less than Indian private colleges. JCS Consultancy handles direct admissions to top NMC-approved universities abroad.' },
            { h2: 'Colleges in Delhi NCR for Low Rank MBBS', list: ['Jamia Hamdard (Hamdard Institute of Medical Sciences)', 'Sharda University, Greater Noida', 'Teerthanker Mahaveer University, Moradabad', 'SGT University, Gurugram', 'Amity University Allied Health Sciences'] },
            { h2: 'Important: Beware of Fraudulent Consultants', p: 'Never pay large upfront amounts to unverified consultants. JCS Consultancy operates transparently — we provide written documentation of every step, official receipts, and direct communication with institutions. We have been serving Delhi families since 2018 with zero fraud cases.' },
        ]
    },
    'top-nursing-colleges-in-delhi': {
        title: 'Top Nursing Colleges in Delhi NCR for 2026 Admissions',
        description: 'A comprehensive ranking of the best B.Sc Nursing and GNM colleges in Delhi including Jamia Hamdard — fees, eligibility, placement and admission process.',
        date: '2026-03-28', dateDisplay: 'March 28, 2026',
        author: 'JCS Admissions Team', category: 'Nursing', readTime: '5 min read',
        keywords: 'top nursing colleges delhi NCR 2026, best bsc nursing colleges delhi, jamia hamdard nursing admission, gnm nursing delhi fees',
        sections: [
            { p: "Nursing is one of the fastest-growing healthcare professions globally, with enormous demand in India, the UK, Canada, and Australia. Delhi NCR has several excellent nursing colleges — here's our expert ranking for 2026 admissions." },
            { h2: '1. Jamia Hamdard Faculty of Nursing (Top Pick)', p: "Jamia Hamdard's Faculty of Nursing is one of the best nursing schools in North India. It offers B.Sc Nursing, M.Sc Nursing, and Post-Basic B.Sc Nursing programs. The college is backed by Hamdard Hospital and provides excellent clinical exposure. Many graduates pursue careers in the UK and Australia. JCS Consultancy helps secure management quota seats here." },
            { h2: '2. AIIMS Delhi School of Nursing', p: 'AIIMS offers B.Sc Nursing and M.Sc Nursing with extremely high competition. Admission is through the AIIMS nursing entrance exam. Graduates are among the most sought-after nursing professionals in India and internationally.' },
            { h2: '3. Lady Hardinge Medical College (LHMC)', p: "Government-affiliated nursing school with strong clinical training. Very competitive government quota admissions. One of Delhi's oldest and most respected nursing institutions." },
            { h2: 'Eligibility for B.Sc Nursing 2026', list: ['10+2 with Physics, Chemistry, Biology', 'Minimum 45% marks in PCB (40% for reserved categories)', 'Age between 17 and 35 years', 'Valid NEET score (mandatory from 2024 for some colleges)', 'English as a subject in 10+2'] },
            { h2: 'Fees Comparison', p: 'Government nursing colleges in Delhi charge Rs.15,000-50,000 per year. Private colleges including Jamia Hamdard range from Rs.80,000-2,50,000 per year. JCS Consultancy provides complete fee transparency before any commitment.' },
        ]
    },
    'btech-colleges-low-rank-delhi': {
        title: 'Best B.Tech Colleges for Low Rank Students in Delhi NCR',
        description: "Didn't score high in JEE? Top engineering colleges in Delhi NCR that accept students through management quota and state counselling — with fees and placement data.",
        date: '2026-03-22', dateDisplay: 'March 22, 2026',
        author: 'JCS Admissions Team', category: 'Engineering', readTime: '6 min read',
        keywords: 'btech colleges low jee rank delhi, btech admission management quota delhi NCR, best engineering colleges delhi NCR low rank, btech direct admission 2026',
        sections: [
            { p: "A low JEE Main rank is not the end of your engineering dream. Delhi NCR has many excellent private and deemed engineering colleges with management quota seats, state-level counselling options, and direct admissions. Here's what you need to know." },
            { h2: 'Top B.Tech Colleges for Low Rank Students', list: ['Jamia Hamdard — B.Tech CSE, ECE, Biotechnology (Management Quota available)', 'IP University affiliates — state counselling (no JEE required)', 'Amity University Noida — wide range of specializations', 'SRM University Delhi-NCR — strong placements', 'Bennett University, Greater Noida — excellent CSE placements', 'Galgotias University — largest engineering intake in NCR', 'KIET Group of Institutions, Ghaziabad'] },
            { h2: 'What is Management Quota in B.Tech?', p: 'Private engineering colleges are allowed to fill 15-25% of seats through management quota outside of state counselling. These seats are awarded based on 10+2 marks and the college\'s own criteria — a high JEE rank is not required. Fees for management quota seats are higher but provide guaranteed admission.' },
            { h2: 'IP University Counselling for Low Rank', p: 'GGSIPU conducts its own Common Entrance Test (IPU CET). Students who don\'t perform well in JEE Main can still qualify through IPU CET and get admission to 150+ affiliated engineering colleges in Delhi at regulated fee structures (Rs.1-1.5 lakhs per year).' },
            { h2: 'Placement Statistics', list: ['Jamia Hamdard CSE: Average Rs.5-7 LPA, top packages Rs.15+ LPA', 'Amity Noida CSE: Average Rs.4-6 LPA, strong MNC connections', 'Bennett University: Average Rs.6+ LPA, top packages Rs.30+ LPA', 'KIET Ghaziabad: Average Rs.4-5 LPA, good core engineering placements'] },
            { h2: 'JCS Consultancy B.Tech Admission Support', p: 'We assess your JEE percentile, 12th marks, and preferred specializations to match you with the best available college and quota. We have helped 300+ engineering students secure seats at their target colleges in Delhi NCR through management quota and state counselling.' },
        ]
    },
    'mba-colleges-delhi-ncr': {
        title: 'Top MBA Colleges in Delhi NCR — Fees, Rankings & Admission Process',
        description: 'Planning an MBA from Delhi? Detailed comparison of the best MBA colleges in Delhi NCR — FMS, IMT, Jamia Hamdard, MDI — with admission requirements and ROI.',
        date: '2026-03-15', dateDisplay: 'March 15, 2026',
        author: 'JCS Admissions Team', category: 'MBA', readTime: '7 min read',
        keywords: 'top mba colleges delhi NCR 2026, best mba colleges delhi, mba admission process delhi, mba fees delhi, jamia hamdard mba admission',
        sections: [
            { p: "Delhi NCR is home to some of India's best MBA institutions — from prestigious government colleges to high-ROI private universities. Here's our comprehensive guide to MBA admissions in 2026." },
            { h2: 'Top MBA Colleges in Delhi NCR', list: ['FMS Delhi — Rank 1 in Delhi, highly competitive (CAT required)', 'MDI Gurugram — Top 10 nationally', 'IMT Ghaziabad — Excellent industry connections', 'Jamia Hamdard MBA — AICTE approved, affordable fees, good placements', 'Amity Business School — Large campus, diverse specializations', 'BIMTECH Greater Noida — Niche specializations, strong alumni', 'IMS Ghaziabad — Good ROI for working professionals'] },
            { h2: 'Jamia Hamdard MBA — A Closer Look', p: "Jamia Hamdard's AICTE-approved MBA offers specializations in Marketing, Finance, HR, and Healthcare Management. Strong ties to the healthcare and pharma industry — unique given the university's medical heritage. Fees approximately Rs.2-3 lakhs per year. Placements average Rs.6-10 LPA with top packages at Rs.18+ LPA." },
            { h2: 'Admission Process for MBA 2026', steps: ['Appear for CAT / MAT / CMAT / XAT depending on target college', 'Apply to colleges using entrance scores (most have separate application portals)', 'Shortlisting based on entrance score + 10th, 12th, and graduation marks', 'Attend GD/PI rounds (Group Discussion + Personal Interview)', 'Receive offer letter and pay admission fees', 'Submit all documents and complete enrollment formalities'] },
            { h2: 'CAT vs MAT vs CMAT — Which Exam to Take?', p: 'CAT is required for FMS, MDI, and IIMs. MAT and CMAT are accepted by most private colleges including Jamia Hamdard, IMT, and Amity. If targeting Jamia Hamdard MBA specifically, CMAT scores are most commonly accepted. JCS Consultancy guides students through exam selection based on their target colleges.' },
            { h2: 'Expected ROI from Delhi MBA Programs', list: ['FMS Delhi: Fee Rs.2 lakhs total, Average placement Rs.25+ LPA — best ROI in India', 'MDI Gurugram: Fee Rs.23 lakhs, Average Rs.18 LPA — excellent ROI', 'Jamia Hamdard: Fee Rs.5-6 lakhs total, Average Rs.8 LPA — good ROI for budget', 'Amity Business School: Fee Rs.10-14 lakhs, Average Rs.7 LPA — moderate ROI'] },
        ]
    }
};

function renderSections(sections) {
    return sections.map((sec, i) => (
        <div key={i} className="mb-8">
            {sec.h2 && <h2 className="text-2xl font-black text-gray-900 mb-3 mt-10 border-l-4 border-jcs-brand pl-4">{sec.h2}</h2>}
            {sec.p && <p className="text-gray-600 leading-relaxed text-lg">{sec.p}</p>}
            {sec.list && (
                <ul className="mt-3 space-y-2">
                    {sec.list.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-gray-600">
                            <span className="mt-2 w-2 h-2 rounded-full bg-jcs-brand flex-shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
            )}
            {sec.steps && (
                <ol className="mt-3 space-y-3">
                    {sec.steps.map((step, j) => (
                        <li key={j} className="flex items-start gap-3 text-gray-600">
                            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-jcs-deep text-white text-sm font-bold flex items-center justify-center">{j + 1}</span>
                            {step}
                        </li>
                    ))}
                </ol>
            )}
        </div>
    ));
}

function RelatedPosts({ currentSlug }) {
    const others = Object.keys(POSTS).filter(s => s !== currentSlug).slice(0, 3);
    return (
        <div className="mt-16 border-t border-gray-100 pt-10">
            <h3 className="text-xl font-black text-gray-900 mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {others.map(slug => {
                    const p = POSTS[slug];
                    return (
                        <Link key={slug} to={`/blog/${slug}`} className="block p-5 bg-gray-50 hover:bg-jcs-deep hover:text-white rounded-2xl transition-all group">
                            <span className="text-xs font-bold text-jcs-brand group-hover:text-jcs-brand mb-2 block">{p.category}</span>
                            <span className="font-bold text-sm leading-snug">{p.title}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

const BlogPostPage = () => {
    const { slug } = useParams();
    const post = POSTS[slug];
    if (!post) return <Navigate to="/blog" replace />;

    const canonicalUrl = `${DOMAIN}/blog/${slug}`;
    const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.description,
        "url": canonicalUrl,
        "datePublished": post.date,
        "dateModified": post.date,
        "author": { "@type": "Organization", "name": "JCS Consultancy", "url": DOMAIN },
        "publisher": { "@type": "Organization", "name": "JCS Consultancy", "url": DOMAIN, "logo": { "@type": "ImageObject", "url": `${DOMAIN}/JCS-LOGO1.jpeg` } },
        "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl },
        "breadcrumb": {
            "@type": "BreadcrumbList", "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": `${DOMAIN}/` },
                { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${DOMAIN}/blog` },
                { "@type": "ListItem", "position": 3, "name": post.title, "item": canonicalUrl }
            ]
        }
    };

    useSEO({ title: `${post.title} | JCS Consultancy`, description: post.description, canonical: canonicalUrl, keywords: post.keywords, schema });

    return (
        <PublicLayout>
            <div className="pt-32 pb-14 bg-gradient-to-br from-jcs-deep to-gray-900 text-white">
                <div className="max-w-4xl mx-auto px-4 md:px-8">
                    <Link to="/blog" className="inline-flex items-center gap-2 text-jcs-brand hover:text-white text-sm font-bold mb-6 transition-colors">
                        <FiArrowLeft size={14} /> Back to Blog
                    </Link>
                    <span className="inline-block bg-jcs-brand/20 border border-jcs-brand/30 text-jcs-brand text-xs font-bold px-3 py-1 rounded-full mb-4">{post.category}</span>
                    <h1 className="text-3xl md:text-5xl font-black leading-tight mb-5">{post.title}</h1>
                    <div className="flex flex-wrap items-center gap-5 text-gray-400 text-sm font-semibold">
                        <span className="flex items-center gap-1.5"><FiCalendar size={13} /> {post.dateDisplay}</span>
                        <span className="flex items-center gap-1.5"><FiClock size={13} /> {post.readTime}</span>
                        <span>{post.author}</span>
                    </div>
                </div>
            </div>

            <div className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <article className="lg:col-span-2">
                            {renderSections(post.sections)}
                            <RelatedPosts currentSlug={slug} />
                        </article>
                        <aside className="lg:col-span-1">
                            <div className="sticky top-28 space-y-5">
                                <div className="bg-jcs-deep text-white rounded-3xl p-6">
                                    <h3 className="text-lg font-black mb-2">Get Free Counselling</h3>
                                    <p className="text-gray-300 text-sm mb-5">Talk to an expert about your specific marks, rank, and goals. 100% free, no pressure.</p>
                                    <a href="tel:+919990922119" className="flex items-center justify-center gap-2 bg-jcs-brand text-gray-900 font-black py-3 px-4 rounded-2xl text-sm hover:bg-white transition-all mb-3">
                                        <FiPhone size={14} /> Call: 9990922119
                                    </a>
                                    <a href="https://wa.me/919990922119" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-green-500 text-white font-black py-3 px-4 rounded-2xl text-sm hover:bg-green-400 transition-all">
                                        <FaWhatsapp size={16} /> WhatsApp Us
                                    </a>
                                </div>
                                <div className="bg-gray-50 rounded-3xl p-6">
                                    <h3 className="text-sm font-black text-gray-900 mb-4">Our Services</h3>
                                    <div className="space-y-2">
                                        {[['/jamia-hamdard', 'Jamia Hamdard'], ['/mbbs-admission', 'MBBS Delhi'], ['/btech-admission', 'B.Tech'], ['/nursing-admission', 'Nursing'], ['/mba-bba-admission', 'MBA / BBA'], ['/mbbs-abroad', 'MBBS Abroad']].map(([href, label]) => (
                                            <Link key={href} to={href} className="flex items-center gap-2 text-gray-600 hover:text-jcs-brand text-sm font-semibold transition-colors">
                                                <FiArrowRight size={12} /> {label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default BlogPostPage;
