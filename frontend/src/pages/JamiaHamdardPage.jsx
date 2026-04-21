import React, { useState, useEffect, useRef } from 'react';
import PublicLayout from '../components/public/PublicLayout';
import { FiMapPin, FiAward, FiUsers, FiBook, FiChevronDown, FiChevronUp, FiPhone, FiMail, FiStar, FiSearch, FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useSEO } from '../hooks/useSEO';

// ─── DATA ────────────────────────────────────────────────────────────────────

const STATS = [
    { value: "NAAC A+", label: "Accreditation", icon: "🏆" },
    { value: "#1", label: "NIRF Pharmacy Rank", icon: "🥇" },
    { value: "100 Acres", label: "Lush Campus", icon: "🌿" },
    { value: "1989", label: "Established", icon: "🎓" },
    { value: "9 Hostels", label: "On-Campus Living", icon: "🏠" },
    { value: "450+", label: "Expert Faculty", icon: "👨‍🏫" },
];

const FACULTIES = [
    {
        id: "nursing",
        name: "Faculty of Nursing",
        color: "#FF6B9D",
        bg: "from-pink-50 to-rose-50",
        border: "border-pink-200",
        badge: "bg-pink-100 text-pink-700",
        icon: "🏥",
        courses: [
            "M.Sc. Nursing (Obstetric and Gynaecological Nursing)",
            "M.Sc. Nursing (Mental Health / Psychiatric Nursing)",
            "M.Sc. Nursing (Community Health Nursing)",
            "M.Sc. Nursing (Child Health / Paediatric Nursing)",
            "M.Sc. Nursing (Medical Surgical Nursing)",
            "Diploma in General Nursing and Midwifery",
            "Post Basic B.Sc. Nursing",
            "B.Sc. (Hons.) Nursing",
        ],
    },
    {
        id: "allied",
        name: "Allied Health Sciences",
        color: "#00C9A7",
        bg: "from-teal-50 to-emerald-50",
        border: "border-teal-200",
        badge: "bg-teal-100 text-teal-700",
        icon: "⚕️",
        courses: [
            "Bachelor of Occupational Therapy",
            "Bachelor of Physiotherapy",
            "Bachelor of Medical Laboratory Science",
            "Bachelor of Optometry",
            "Bachelor in Medical & Imaging Technology",
            "Baccalaureate in Anesthesia & Operation Theatre Technology",
            "Bachelor of Cardiovascular Technology",
            "Bachelor of Dialysis Therapy Technology",
            "Master of Occupational Therapy (Musculoskeletal)",
            "Master of Occupational Therapy (Paediatrics)",
            "Master of Physiotherapy (Musculoskeletal)",
            "Master of Physiotherapy (Sports)",
            "Master of Physiotherapy (Cardiopulmonary)",
            "Master of Physiotherapy (Neurology)",
            "Master of Medical Laboratory Science",
            "Master in Medical Radiology and Imaging Technology",
            "Master of Optometry",
            "Master's in Anesthesia and Operation Theatre Technology",
            "Master of Dialysis Therapy",
        ],
    },
    {
        id: "science",
        name: "Biosciences & Chemistry",
        color: "#6C63FF",
        bg: "from-violet-50 to-purple-50",
        border: "border-violet-200",
        badge: "bg-violet-100 text-violet-700",
        icon: "🔬",
        courses: [
            "B.Sc. (Hons.) Biochemistry",
            "B.Sc. (Hons.) Biotechnology",
            "B.Sc. (Hons.) Botany",
            "B.Sc. (Hons.) Chemistry",
            "B.Sc. (Hons.) Clinical Research",
            "B.Sc. (Hons.) Toxicology",
            "B.Sc. Forestry",
            "B.Sc. Material Science & Nano Technology",
            "M.Sc. Biochemistry",
            "M.Sc. Biotechnology",
            "M.Sc. Botany",
            "M.Sc. Chemistry",
            "M.Sc. Toxicology",
            "M.Sc. Clinical Research",
            "M.Sc. Forensic Science",
            "M.Sc. Pharmacovigilance",
            "M.Sc. Microbiology",
        ],
    },
    {
        id: "unani",
        name: "Unani Medicine",
        color: "#F59E0B",
        bg: "from-amber-50 to-yellow-50",
        border: "border-amber-200",
        badge: "bg-amber-100 text-amber-700",
        icon: "🌿",
        courses: [
            "Pre-Tib",
            "Diploma in Unani Pharmacy",
            "Bachelor of Unani Medicine and Surgery (Gen)",
            "Bachelor of Unani Medicine and Surgery (SFS)",
            "Mahir Tib - M.D. (Moalajat)",
            "Mahir Tib - M.D. (Ilmul Advia)",
            "Mahir Tib - M.D. (Tahaffuzi wa Samaji Tib)",
        ],
    },
    {
        id: "humanities",
        name: "Humanities & Social Sciences",
        color: "#EF4444",
        bg: "from-red-50 to-orange-50",
        border: "border-red-200",
        badge: "bg-red-100 text-red-700",
        icon: "📚",
        courses: [
            "B.A. (Hons.) Islamic Studies",
            "B.A. in Politics and Governance",
            "B.A. Public Policy",
            "B.A. Hindustani Music",
            "B.A. Film Making",
            "M.A. Islamic Studies",
            "M.A. Human Rights",
            "M.A. International Studies",
            "M.A. Politics and Governance",
            "M.A. Public Policy",
            "M.A. Federal Studies",
            "B.A. (International Studies & Global Politics)",
            "M.A. Political Science",
            "B.A. English",
            "B.A. Applied Psychology",
        ],
    },
    {
        id: "pharmacy",
        name: "Faculty of Pharmacy",
        color: "#3B82F6",
        bg: "from-blue-50 to-sky-50",
        border: "border-blue-200",
        badge: "bg-blue-100 text-blue-700",
        icon: "💊",
        courses: [
            "Diploma in Pharmacy (D.Pharm)",
            "Bachelor of Pharmacy (B.Pharm - Gen)",
            "Bachelor of Pharmacy (B.Pharm - SFS)",
            "M.Pharm Pharmaceutical Chemistry",
            "M.Pharm Pharmaceutics",
            "M.Pharm Pharmacology",
            "M.Pharm Pharmacognosy",
            "M.Pharm Pharmacy Practice",
            "M.Pharm Pharmaceutical Quality Assurance",
            "M.Pharm Pharmaceutical Biotechnology",
            "M.Pharm Pharmaceutical Analysis",
        ],
    },
    {
        id: "tech",
        name: "Computer Science & Technology",
        color: "#10B981",
        bg: "from-emerald-50 to-green-50",
        border: "border-emerald-200",
        badge: "bg-emerald-100 text-emerald-700",
        icon: "💻",
        courses: [
            "Bachelor of Computer Applications (BCA)",
            "B.Tech Computer Science & Engineering",
            "B.Tech Electronics & Communication Engineering",
            "B.Tech CSE (Artificial Intelligence)",
            "B.Sc. Computer Science",
            "Master of Computer Applications (MCA)",
            "M.Tech CSE (Cyber Forensics & Information Security)",
            "M.Tech Computer Science & Engineering",
            "M.Tech CSE (Data Science)",
            "M.Sc. Computational Biology & Bioinformatics",
            "B.Sc. Computational Mathematics",
        ],
    },
    {
        id: "interdisciplinary",
        name: "Interdisciplinary Sciences",
        color: "#8B5CF6",
        bg: "from-purple-50 to-fuchsia-50",
        border: "border-purple-200",
        badge: "bg-purple-100 text-purple-700",
        icon: "⚗️",
        courses: [
            "B.Sc. Physics",
            "B.Sc. Biomedical Science",
            "B.Tech Food Technology",
            "M.Tech Food Technology",
            "M.Sc. Biomedical Science",
            "M.Sc. Medical Virology",
            "M.Sc. Nutrition and Dietetics",
            "M.Sc. Food Science & Technology",
            "M.Sc. Environmental Sciences",
            "B.Sc. Nutrition and Dietetics",
        ],
    },
    {
        id: "management",
        name: "Management & Commerce",
        color: "#F97316",
        bg: "from-orange-50 to-amber-50",
        border: "border-orange-200",
        badge: "bg-orange-100 text-orange-700",
        icon: "📊",
        courses: [
            "Bachelor of Business Administration (BBA)",
            "Bachelor of Hotel Management",
            "Bachelor of Commerce (B.Com)",
            "Bachelor of Management Studies (Healthcare)",
            "Master of Business Administration (MBA)",
            "MBA (Healthcare & Hospital Management)",
            "MBA (Pharmaceutical Management)",
            "Bachelor of Arts in Journalism and Mass Communication",
            "M.A. Journalism and Mass Communication",
        ],
    },
    {
        id: "law",
        name: "Law & Finance",
        color: "#6366F1",
        bg: "from-indigo-50 to-blue-50",
        border: "border-indigo-200",
        badge: "bg-indigo-100 text-indigo-700",
        icon: "⚖️",
        courses: [
            "BA LL.B (Integrated 5 Years)",
            "LL.M (Constitutional Law)",
            "LL.M (Commercial Law)",
            "B.Sc. Retail Management",
            "Bachelor of Financial Studies",
            "B.Sc. Automotive Manufacturing Technology",
            "B.Sc. Patient Care Management",
            "B.Sc. Logistics and Supply Chain Management",
        ],
    },
];

const GALLERY_IMGS = [
    {
        url: "https://cache.careers360.mobi/media/article_images/2024/8/9/jamia-hamdrad-top-pharmacy-college-featured-image1.png",
        caption: "Iconic Main Campus",
    },
    {
        url: "https://images.shiksha.com/mediadata/images/1510233985phpV5oHin.jpeg",
        caption: "Research Laboratories",
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Jamia_Hamdard_University_Campus.jpg/1280px-Jamia_Hamdard_University_Campus.jpg",
        caption: "Sprawling 100-Acre Campus",
    },
];

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
const Hero = () => (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Deep layered background */}
        <div className="absolute inset-0 bg-[#0a1628]" />
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #00D084 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #6C63FF 0%, transparent 70%)', transform: 'translate(30%, 30%)' }} />

        {/* University campus image overlay */}
        <div className="absolute inset-0 opacity-20"
            style={{
                backgroundImage: `url('https://cache.careers360.mobi/media/article_images/2024/8/9/jamia-hamdrad-top-pharmacy-college-featured-image1.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                mixBlendMode: 'luminosity'
            }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/60 via-[#0a1628]/40 to-[#0a1628]/90" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 md:px-8 max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full mb-8">
                <span className="w-2 h-2 rounded-full bg-[#00D084] animate-pulse inline-block" />
                Admissions Open 2026 · Apply via JCS
            </div>

            {/* University Logo Area */}
            <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl md:text-4xl shadow-xl">
                    🎓
                </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-[1.05] tracking-tight">
                Jamia Hamdard
                <span className="block text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #00D084, #00E59B)' }}>
                    University
                </span>
            </h1>

            <p className="text-base md:text-xl text-white/70 font-medium mb-3 max-w-2xl mx-auto">
                Institute of Eminence · New Delhi, India
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
                {["NAAC A+", "NIRF #1 Pharmacy", "UGC Approved", "QS Ranked"].map(tag => (
                    <span key={tag} className="text-xs font-bold text-white/80 bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://wa.me/919990922119?text=I%20want%20admission%20in%20Jamia%20Hamdard%20University"
                    target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-3 bg-[#00D084] hover:bg-[#00E59B] text-white font-extrabold text-base px-8 py-4 rounded-2xl transition-all duration-300 shadow-[0_10px_30px_rgba(0,208,132,0.4)] hover:shadow-[0_15px_40px_rgba(0,208,132,0.5)] hover:-translate-y-0.5">
                    <FaWhatsapp size={20} /> Apply on WhatsApp
                </a>
                <a href="tel:+919990922119"
                    className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white font-extrabold text-base px-8 py-4 rounded-2xl border border-white/30 transition-all duration-300 backdrop-blur-sm">
                    <FiPhone size={18} /> Call: 9990922119
                </a>
            </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
            <FiChevronDown size={28} />
        </div>
    </section>
);

// ─── STATS STRIP ─────────────────────────────────────────────────────────────
const StatsStrip = () => (
    <section className="bg-[#092619] py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {STATS.map(s => (
                    <div key={s.label} className="text-center group">
                        <div className="text-2xl mb-1">{s.icon}</div>
                        <div className="text-xl md:text-2xl font-black text-[#00D084] leading-tight">{s.value}</div>
                        <div className="text-xs font-semibold text-white/50 uppercase tracking-wide mt-0.5">{s.label}</div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// ─── ABOUT SECTION ─────────────────────────────────────────────────────────────
const About = () => (
    <section className="py-20 bg-[#FAFCFB]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Text */}
                <div>
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-[#00D084] mb-4 block">About the University</span>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
                        A Legacy of Excellence
                        <span className="block text-[#092619]">in Healthcare Education</span>
                    </h2>
                    <p className="text-gray-600 text-base leading-relaxed mb-5">
                        Founded in 1963 as Hamdard Tibbi College and granted Deemed University status in 1989, Jamia Hamdard has grown into one of India's most respected institutions. In 2019, the Ministry of Education conferred upon it the prestigious <strong>Institute of Eminence</strong> status.
                    </p>
                    <p className="text-gray-600 text-base leading-relaxed mb-8">
                        Spread across a lush 100-acre campus in South Delhi — just 15 km from AIIMS — the university uniquely bridges traditional Unani medicine with cutting-edge sciences, pharmacy, nursing, law, technology, and management.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: "Two On-Campus Hospitals", sub: "700 + 100 bed capacity", icon: "🏥" },
                            { label: "Institute of Eminence", sub: "Ministry of Education, 2019", icon: "⭐" },
                            { label: "Sun Pharma Partnership", sub: "120 MPharm internships", icon: "🤝" },
                            { label: "Metro Connected", sub: "Tughlakabad & Govindpuri", icon: "🚇" },
                        ].map(f => (
                            <div key={f.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-2xl mb-2">{f.icon}</div>
                                <div className="text-sm font-bold text-gray-900">{f.label}</div>
                                <div className="text-xs text-gray-500 mt-0.5">{f.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Photo collage */}
                <div className="relative h-[480px] hidden lg:block">
                    <div className="absolute top-0 left-0 w-[72%] h-[60%] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                        <img
                            src="https://cache.careers360.mobi/media/article_images/2024/8/9/jamia-hamdrad-top-pharmacy-college-featured-image1.png"
                            alt="Jamia Hamdard main building"
                            className="w-full h-full object-cover"
                            onError={e => { e.target.style.background = '#092619'; e.target.alt = ''; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#092619]/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white font-bold text-sm">Main Campus</div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-[58%] h-[55%] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                        <div className="w-full h-full bg-gradient-to-br from-[#092619] to-[#13422E] flex flex-col items-center justify-center text-white p-6 text-center">
                            <div className="text-5xl mb-3">🎓</div>
                            <div className="text-2xl font-black text-[#00D084]">35+ Years</div>
                            <div className="text-sm font-medium text-white/70 mt-1">of Academic Excellence</div>
                            <div className="mt-4 text-xs text-white/50 leading-relaxed">Pharmacy · Medicine · Nursing · Technology · Law · Management</div>
                        </div>
                    </div>
                    {/* Floating badge */}
                    <div className="absolute top-[38%] right-[20%] bg-[#00D084] text-white rounded-2xl px-4 py-3 shadow-lg font-black text-sm text-center z-10 rotate-3">
                        <div className="text-xl">#1</div>
                        <div className="text-xs font-bold">NIRF Pharmacy</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// ─── COURSES SECTION ─────────────────────────────────────────────────────────
const CoursesSection = () => {
    const [openFaculty, setOpenFaculty] = useState(null);
    const [search, setSearch] = useState('');

    const filtered = FACULTIES.map(f => ({
        ...f,
        courses: f.courses.filter(c => c.toLowerCase().includes(search.toLowerCase())),
    })).filter(f => f.courses.length > 0 || search === '');

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="text-center mb-12">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-[#00D084] mb-3 block">Courses We Handle</span>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                        100+ Programmes Across
                        <span className="text-[#092619]"> 10 Faculties</span>
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto text-base mb-8">
                        Jamia Consultancy Services manages admissions for all the programmes listed below. Click any faculty to explore courses.
                    </p>

                    {/* Search */}
                    <div className="relative max-w-md mx-auto">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search any course..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-12 pr-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#00D084] focus:outline-none font-semibold text-sm shadow-sm"
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    {filtered.map(faculty => {
                        const isOpen = openFaculty === faculty.id;
                        return (
                            <div key={faculty.id} className={`rounded-2xl border ${faculty.border} bg-gradient-to-r ${faculty.bg} overflow-hidden transition-all duration-300`}>
                                {/* Header */}
                                <button
                                    onClick={() => setOpenFaculty(isOpen ? null : faculty.id)}
                                    className="w-full flex items-center justify-between p-5 text-left hover:opacity-90 transition-opacity"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-11 h-11 rounded-xl bg-white/80 border border-white shadow-sm flex items-center justify-center text-2xl flex-shrink-0">
                                            {faculty.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-black text-gray-900 text-base md:text-lg">{faculty.name}</h3>
                                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${faculty.badge}`}>
                                                {faculty.courses.length} courses
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 ml-4">
                                        {isOpen
                                            ? <FiChevronUp size={22} className="text-gray-600" />
                                            : <FiChevronDown size={22} className="text-gray-600" />
                                        }
                                    </div>
                                </button>

                                {/* Course list */}
                                {isOpen && (
                                    <div className="px-5 pb-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {faculty.courses.map(course => (
                                                <div key={course} className="flex items-start gap-3 bg-white/70 border border-white rounded-xl px-4 py-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#00D084] mt-2 flex-shrink-0" />
                                                    <span className="text-sm font-semibold text-gray-800">{course}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <a
                                            href={`https://wa.me/919990922119?text=I%20want%20admission%20in%20${faculty.name}%20at%20Jamia%20Hamdard`}
                                            target="_blank" rel="noreferrer"
                                            className="mt-5 inline-flex items-center gap-2 bg-[#092619] text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-[#13422E] transition-colors"
                                        >
                                            <FaWhatsapp size={16} />
                                            Enquire about {faculty.name}
                                        </a>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

// ─── WHY JAMIA HAMDARD ────────────────────────────────────────────────────────
const WhySection = () => (
    <section className="py-20 bg-[#FAFCFB]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-14">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#00D084] mb-3 block">Why Choose This University</span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                    What Sets Jamia Hamdard Apart
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    {
                        icon: "🥇",
                        title: "India's #1 in Pharmacy",
                        desc: "Consistently ranked #1 by NIRF in the Pharmacy category, with world-class research output and Sun Pharma collaborations.",
                        color: "bg-amber-50 border-amber-200",
                    },
                    {
                        icon: "🏥",
                        title: "Two Teaching Hospitals",
                        desc: "On-campus Hakeem Abdul Hameed Centenary Hospital (700 beds) and Majeedia Unani Hospital (100 beds, NABH accredited).",
                        color: "bg-red-50 border-red-200",
                    },
                    {
                        icon: "🌿",
                        title: "Unique Unani Heritage",
                        desc: "One of India's only universities offering both modern medicine and traditional Unani education at the highest level.",
                        color: "bg-green-50 border-green-200",
                    },
                    {
                        icon: "🎓",
                        title: "Institute of Eminence",
                        desc: "Awarded by the Ministry of Education in 2019 — placing Jamia Hamdard in India's most elite institutional category.",
                        color: "bg-violet-50 border-violet-200",
                    },
                    {
                        icon: "🚇",
                        title: "Prime Delhi Location",
                        desc: "100-acre campus in Hamdard Nagar, South Delhi — 15 km from AIIMS, connected via Tughlakabad metro on the Violet Line.",
                        color: "bg-blue-50 border-blue-200",
                    },
                    {
                        icon: "📚",
                        title: "28,000+ Rare Books",
                        desc: "The Hakim Mohammed Said Central Library houses a vast collection including rare Arabic manuscripts and ancient texts.",
                        color: "bg-teal-50 border-teal-200",
                    },
                ].map(card => (
                    <div key={card.title} className={`rounded-2xl border p-6 ${card.color} hover:shadow-md transition-shadow`}>
                        <div className="text-4xl mb-4">{card.icon}</div>
                        <h3 className="font-black text-gray-900 text-lg mb-2">{card.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{card.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// ─── ADMISSION PROCESS ────────────────────────────────────────────────────────
const AdmissionProcess = () => (
    <section className="py-20 bg-[#092619] overflow-hidden relative">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #00D084 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            <div className="text-center mb-14">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#00D084] mb-3 block">How It Works</span>
                <h2 className="text-3xl md:text-4xl font-black text-white">
                    Your Admission Journey
                </h2>
                <p className="text-white/50 mt-3 max-w-xl mx-auto text-sm">
                    From enquiry to enrolled — JCS handles every step of your Jamia Hamdard admission process.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { step: "01", title: "Contact JCS", desc: "WhatsApp or call us with your preferred course and educational background.", icon: "📞" },
                    { step: "02", title: "Free Counselling", desc: "Our experts assess your eligibility and guide you to the best-fit programme at Jamia Hamdard.", icon: "🎯" },
                    { step: "03", title: "Documentation", desc: "We help you prepare all documents — certificates, medical records, entrance scores, and application forms.", icon: "📋" },
                    { step: "04", title: "Seat Secured", desc: "We handle university liaison and confirm your seat. You just show up on Day 1 ready to study.", icon: "🎓" },
                ].map(step => (
                    <div key={step.step} className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                        <div className="text-5xl font-black text-white/10 absolute top-4 right-5 select-none">{step.step}</div>
                        <div className="text-3xl mb-4">{step.icon}</div>
                        <h3 className="font-black text-white text-lg mb-2">{step.title}</h3>
                        <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                ))}
            </div>

            <div className="text-center mt-12">
                <a
                    href="https://wa.me/919990922119?text=I%20want%20to%20enquire%20about%20Jamia%20Hamdard%20University%20admission"
                    target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-3 bg-[#00D084] hover:bg-[#00E59B] text-white font-extrabold text-base px-10 py-4 rounded-2xl transition-all duration-300 shadow-[0_10px_30px_rgba(0,208,132,0.4)]"
                >
                    <FaWhatsapp size={20} />
                    Start Your Application Today
                    <FiArrowRight size={18} />
                </a>
            </div>
        </div>
    </section>
);

// ─── CONTACT STRIP ───────────────────────────────────────────────────────────
const ContactStrip = () => (
    <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
            <div className="rounded-3xl bg-gradient-to-br from-[#092619] to-[#13422E] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 justify-between shadow-xl">
                <div>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-2">Ready to join Jamia Hamdard?</h3>
                    <p className="text-white/60 text-sm max-w-sm">
                        Seats are limited. Get expert guidance from Jamia Consultancy Services and secure your spot today.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                    <a href="https://wa.me/919990922119" target="_blank" rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-[#00D084] text-white font-bold px-7 py-3.5 rounded-2xl hover:bg-[#00E59B] transition-colors text-sm shadow-lg">
                        <FaWhatsapp size={18} /> WhatsApp Us
                    </a>
                    <a href="tel:+919990922119"
                        className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-7 py-3.5 rounded-2xl hover:bg-white/20 transition-colors text-sm border border-white/20">
                        <FiPhone size={16} /> 9990922119
                    </a>
                </div>
            </div>
        </div>
    </section>
);

// ─── PAGE ASSEMBLY ─────────────────────────────────────────────────────────────
const JamiaHamdardPage = () => {
    useSEO({
        title: "Jamia Hamdard Admission 2026 | All Courses | JCS Consultancy",
        description: "Complete admission guidance for Jamia Hamdard University — MBBS, B.Tech, MBA, BBA, Nursing, B.Pharm, Allied Health Sciences & more. NAAC A+ | NIRF #1 Pharmacy. Call JCS: 9990922119.",
        canonical: "https://jcsconsultancy.in/jamia-hamdard",
        keywords: "jamia hamdard admission, jamia hamdard courses, jamia hamdard university delhi, jamia hamdard mbbs nursing pharmacy btech",
        schema: {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Hamdard University (Jamia Hamdard)",
            "description": "NAAC A+ accredited deemed university in New Delhi. Top ranked in Pharmacy (NIRF #1). Offers MBBS, Nursing, Pharmacy, Engineering, Management & Allied Health courses.",
            "url": "https://jcsconsultancy.in/jamia-hamdard",
            "address": { "@type": "PostalAddress", "addressLocality": "New Delhi", "addressRegion": "Delhi", "addressCountry": "IN" },
        }
    });
    return (
        <PublicLayout>
            <Hero />
            <StatsStrip />
            <About />
            <CoursesSection />
            <WhySection />
            <AdmissionProcess />
            <ContactStrip />
        </PublicLayout>
    );
};

export default JamiaHamdardPage;
