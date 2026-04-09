import React, { useContext, useState } from 'react';
import { Navigate, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiHome, FiUsers, FiFolder, FiLogOut, FiSettings, FiRadio, FiMenu, FiX } from 'react-icons/fi';

const AdminLayout = ({ children }) => {
    const { user, logoutAdmin, loading } = useContext(AuthContext);
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F5F8F6] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-jcs-brand"></div>
            </div>
        );
    }

    if (!user) return <Navigate to="/login" />;

    const menuItems = [
        { name: 'Overview', path: '/admin', icon: FiHome },
        { name: 'Lead Pipeline', path: '/admin/leads', icon: FiUsers },
        { name: 'Client Vault', path: '/admin/clients', icon: FiFolder },
        { name: 'Broadcast', path: '/admin/broadcast', icon: FiRadio },
        { name: 'Inventory', path: '/admin/colleges', icon: FiSettings },
    ];

    return (
        <div className="min-h-screen bg-[#F5F8F6] flex font-sans text-jcs-text selection:bg-jcs-brand selection:text-white relative">

            {/* 🟢 Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-72 bg-white border-r border-gray-100 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">

                {/* Branding & Profile Area */}
                <div className="p-8 flex flex-col items-center border-b border-gray-50">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-jcs-deep to-[#13422E] flex items-center justify-center font-black text-white text-2xl shadow-[0_10px_20px_-10px_rgba(27,81,53,0.5)] mb-4">
                        JCS
                    </div>
                    <h2 className="font-black text-gray-900 tracking-tight text-lg leading-none mb-2">Admin Portal</h2>
                    <span className="text-[10px] font-extrabold text-jcs-brand uppercase tracking-widest bg-jcs-brand/10 px-3 py-1.5 rounded-full">
                        {user.role || 'Super Admin'}
                    </span>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto hide-scrollbar">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${isActive
                                        ? 'bg-jcs-deep text-white shadow-md hover:bg-gray-900'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-jcs-deep'
                                    }`}
                            >
                                <Icon className={`text-xl transition-transform duration-300 ${isActive ? 'text-jcs-brand' : 'group-hover:scale-110'}`} />
                                <span className={`text-sm ${isActive ? 'font-bold' : 'font-semibold'}`}>
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <div className="p-6 border-t border-gray-50">
                    <button
                        onClick={logoutAdmin}
                        className="flex items-center justify-center gap-3 w-full px-5 py-4 text-red-500 font-bold bg-white border border-red-100 hover:bg-red-50 rounded-2xl transition-all hover:shadow-sm"
                    >
                        <FiLogOut className="text-xl" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* 🟢 Mobile Header & Navigation Overlay */}
            <header className="md:hidden fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 z-50 px-4 py-3 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-jcs-deep to-[#13422E] flex items-center justify-center font-black text-white text-sm">
                        JCS
                    </div>
                    <span className="font-black text-gray-900">Admin Portal</span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-gray-600 bg-gray-50 rounded-lg border border-gray-100"
                >
                    {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </header>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm animate-fade-in-up">
                    <div className="absolute right-0 top-[65px] bottom-0 w-64 bg-white shadow-2xl flex flex-col">
                        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                            {menuItems.map((item) => {
                                const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${isActive ? 'bg-jcs-deep text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-jcs-deep'
                                            }`}
                                    >
                                        <Icon className={`text-xl ${isActive ? 'text-jcs-brand' : ''}`} />
                                        <span className={`text-sm ${isActive ? 'font-bold' : 'font-semibold'}`}>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                        <div className="p-6 border-t border-gray-50">
                            <button
                                onClick={logoutAdmin}
                                className="flex items-center justify-center gap-3 w-full px-5 py-4 text-red-500 font-bold bg-red-50 rounded-2xl"
                            >
                                <FiLogOut className="text-xl" /> Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 🟢 Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden pt-16 md:pt-0">
                <div className="flex-1 overflow-y-auto p-6 md:p-10 hide-scrollbar">
                    {/* The specific page content (Dashboard, Pipeline, etc.) injects here */}
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;