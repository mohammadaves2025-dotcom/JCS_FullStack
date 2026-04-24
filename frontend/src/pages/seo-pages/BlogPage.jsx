import React from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/public/PublicLayout';
import { useSEO } from '../../hooks/useSEO';
import { FiArrowRight, FiCalendar, FiUser } from 'react-icons/fi';

const BLOG_POSTS = [
  {
    slug: "how-to-get-admission-in-jamia-hamdard",
    title: "How to Get Admission in Jamia Hamdard University in 2026",
    excerpt: "Complete guide covering all courses, eligibility criteria, entrance tests, management quota options, and step-by-step admission process for Jamia Hamdard University.",
    date: "April 15, 2026",
    author: "JCS Admissions Team",
    category: "Jamia Hamdard",
    readTime: "6 min read",
    color: "from-green-600 to-jcs-deep",
  },
  {
    slug: "best-courses-in-jamia-hamdard-after-12th",
    title: "Best Courses in Jamia Hamdard After 12th — Science, Commerce & Arts",
    excerpt: "Discover the top undergraduate courses at Jamia Hamdard for students from Science, Commerce and Arts backgrounds — with future scope and salary insights.",
    date: "April 10, 2026",
    author: "JCS Admissions Team",
    category: "Course Guidance",
    readTime: "7 min read",
    color: "from-purple-600 to-blue-700",
  },
  {
    slug: "mbbs-admission-delhi-low-rank",
    title: "MBBS Admission in Delhi with Low NEET Rank — A Complete Guide",
    excerpt: "Low NEET score? Don't give up on your dream of becoming a doctor. Here are all the legitimate options for securing an MBBS seat in Delhi NCR.",
    date: "April 5, 2026",
    author: "JCS Admissions Team",
    category: "MBBS",
    readTime: "8 min read",
    color: "from-red-600 to-orange-600",
  },
  {
    slug: "top-nursing-colleges-in-delhi",
    title: "Top Nursing Colleges in Delhi NCR for 2026 Admissions",
    excerpt: "A comprehensive ranking of the best B.Sc Nursing and GNM colleges in Delhi, including Jamia Hamdard Faculty of Nursing — fees, eligibility & placement.",
    date: "March 28, 2026",
    author: "JCS Admissions Team",
    category: "Nursing",
    readTime: "5 min read",
    color: "from-pink-600 to-rose-700",
  },
  {
    slug: "btech-colleges-low-rank-delhi",
    title: "Best B.Tech Colleges for Low Rank Students in Delhi NCR",
    excerpt: "Didn't score high in JEE? These are the top engineering colleges in Delhi NCR that accept students through management quota and state counselling.",
    date: "March 22, 2026",
    author: "JCS Admissions Team",
    category: "Engineering",
    readTime: "6 min read",
    color: "from-blue-600 to-indigo-700",
  },
  {
    slug: "mba-colleges-delhi-ncr",
    title: "Top MBA Colleges in Delhi NCR — Fees, Rankings & Admission Process",
    excerpt: "Planning to do an MBA from Delhi? Here's a detailed comparison of the best MBA colleges in Delhi NCR, including admission requirements and expected ROI.",
    date: "March 15, 2026",
    author: "JCS Admissions Team",
    category: "MBA",
    readTime: "7 min read",
    color: "from-gray-700 to-gray-900",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "JCS Consultancy Blog — College Admission Guides",
  "url": "https://www.jamiaconsultancyservices.in/blog",
  "description": "Expert guides on college admissions in Delhi NCR — Jamia Hamdard, MBBS, B.Tech, MBA, Nursing and more.",
  "publisher": {
    "@type": "Organization",
    "name": "JCS Consultancy",
    "url": "https://www.jamiaconsultancyservices.in",
    "logo": { "@type": "ImageObject", "url": "https://www.jamiaconsultancyservices.in/JCS-LOGO1.jpeg" }
  },
  "blogPost": BLOG_POSTS.map(p => ({
    "@type": "BlogPosting",
    "headline": p.title,
    "description": p.excerpt,
    "url": `https://www.jamiaconsultancyservices.in/blog/${p.slug}`,
    "datePublished": p.date,
    "author": { "@type": "Organization", "name": p.author },
  }))
};

const BlogPage = () => {
  useSEO({
    title: "College Admission Blog | Jamia Hamdard, MBBS, B.Tech Guides | JCS",
    description: "Expert college admission guides for Jamia Hamdard, MBBS Delhi, B.Tech, MBA, Nursing. Low rank admission tips, course comparisons & more from JCS Consultancy.",
    canonical: "https://www.jamiaconsultancyservices.in/blog",
    keywords: "jamia hamdard admission guide, mbbs admission tips, college admission blog delhi, low rank admission guide, btech nursing mba admission",
    schema,
  });

  return (
    <PublicLayout>
      {/* Hero */}
      <div className="pt-32 pb-16 bg-gradient-to-br from-jcs-deep to-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <span className="inline-block border border-jcs-brand/30 bg-jcs-brand/10 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 text-jcs-brand">
            Admission Guides & Tips
          </span>
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
            JCS Admission Blog
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Expert guides on college admissions across Delhi NCR — Jamia Hamdard, MBBS, B.Tech, MBA, Nursing & more.
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <article key={post.slug} className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Card Top Color Bar */}
                <div className={`h-2 bg-gradient-to-r ${post.color}`}></div>
                <div className="p-6">
                  <span className="inline-block bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
                    {post.category}
                  </span>
                  <h2 className="font-black text-gray-900 text-lg leading-snug mb-3 group-hover:text-jcs-brand transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400 font-semibold border-t border-gray-100 pt-4">
                    <span className="flex items-center gap-1.5"><FiCalendar size={12} /> {post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Link to={`/blog/${post.slug}`} className="mt-4 flex items-center gap-1.5 text-jcs-brand text-xs font-black hover:underline">
                    Read Full Article <FiArrowRight size={12} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 bg-jcs-deep rounded-3xl p-10 text-white text-center">
            <h2 className="text-3xl font-black mb-3">Need Personalised Admission Guidance?</h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Our blog covers general guidance. For personalised counselling based on your marks, rank, and goals — talk to a JCS expert directly.
            </p>
            <a href="tel:+919990922119" className="inline-flex items-center gap-2 bg-jcs-brand text-gray-900 font-black px-8 py-4 rounded-2xl hover:bg-white transition-all">
              Free Counselling Call <FiArrowRight />
            </a>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default BlogPage;
