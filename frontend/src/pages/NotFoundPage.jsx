import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { FiArrowRight, FiHome } from 'react-icons/fi';

const NotFoundPage = () => {
  useSEO({
    title: '404 — Page Not Found | JCS Consultancy',
    description: 'The page you are looking for does not exist. Return to JCS Consultancy homepage for expert college admission guidance in Delhi NCR.',
    noIndex: true,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-jcs-deep to-gray-900 flex items-center justify-center text-white px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-black text-jcs-brand mb-4">404</div>
        <h1 className="text-3xl font-black mb-3">Page Not Found</h1>
        <p className="text-gray-300 mb-8">
          The page you are looking for doesn't exist or has been moved. Let us help you find what you need.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="flex items-center justify-center gap-2 bg-jcs-brand text-gray-900 font-black px-6 py-3 rounded-2xl hover:bg-white transition-all">
            <FiHome size={16} /> Go Home
          </Link>
          <Link to="/contact" className="flex items-center justify-center gap-2 border border-white/30 text-white font-bold px-6 py-3 rounded-2xl hover:bg-white/10 transition-all">
            Contact Us <FiArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 text-left">
          {[['/jamia-hamdard','Jamia Hamdard'],['/mbbs-admission','MBBS Admissions'],['/btech-admission','B.Tech Admissions'],['/nursing-admission','Nursing Admissions']].map(([href, label]) => (
            <Link key={href} to={href} className="flex items-center gap-2 text-gray-400 hover:text-jcs-brand text-sm font-semibold transition-colors">
              <FiArrowRight size={12} /> {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
