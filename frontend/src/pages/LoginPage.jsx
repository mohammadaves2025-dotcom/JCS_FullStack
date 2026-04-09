import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiLock, FiMail, FiShield, FiArrowLeft } from 'react-icons/fi';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // 🚨 Use loginAdmin from your context, NOT dispatch
    const { user, loginAdmin } = useContext(AuthContext);
    const navigate = useNavigate();

    // 🚦 Traffic Controller: Auto-redirect if already logged in
    useEffect(() => {
        if (user) {
            if (user.role === 'super-admin' || user.role === 'counselor') {
                navigate('/admin');
            } else {
                navigate('/portal');
            }
        }
    }, [user, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // 🟢 Call the function defined in your AuthContext
        const result = await loginAdmin(email, password);

        if (result.success) {
            // Success! The useEffect above will handle the navigation 
            // once the 'user' state updates in the Context.
        } else {
            setError(result.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F8F6] flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-xl p-10 border border-gray-100">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-jcs-deep text-white rounded-[1.5rem] mb-6">
                        <FiShield size={28} />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 mb-1">Portal Login</h1>
                    <p className="text-sm text-gray-500 font-medium">Access your secure dashboard</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm mb-6 border border-red-100 text-center font-bold">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                        <div className="relative">
                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-jcs-brand focus:outline-none font-bold shadow-sm"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
                        <div className="relative">
                            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-jcs-brand focus:outline-none font-bold shadow-sm"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-jcs-deep text-white font-extrabold text-lg py-4 rounded-2xl shadow-lg hover:bg-gray-900 transition-all flex justify-center items-center gap-3"
                    >
                        {loading ? "Authenticating..." : "SIGN IN TO PORTAL"}
                    </button>
                </form>

                
                {/* 🟢 NEW: Back to Website Button */}
                <div className="mt-8 text-center">
                    <Link to="/" className="text-xs font-bold text-gray-400 hover:text-jcs-deep transition-colors uppercase tracking-widest flex items-center justify-center gap-2">
                        <FiArrowLeft size={14} /> Back to Website
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;