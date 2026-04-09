import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FiTrendingUp, FiUsers, FiDollarSign, FiAward, FiActivity, FiArrowUpRight, FiClock, FiCalendar, FiTarget, FiPhone, FiMessageSquare, FiX, FiCheckCircle } from 'react-icons/fi';

const Overview = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    
    // Aggregated Data State
    const [stats, setStats] = useState({
        totalRevenue: 0,
        collectedRevenue: 0,
        activeLeads: 0,
        hotLeads: [],
        todaysTasks: [], // 🟢 NEW: Today's Follow-ups
        totalConverted: 0,
        availableSeats: 0
    });

    // 🟢 NEW: Quick Action Modal State
    const [selectedLead, setSelectedLead] = useState(null);

    const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const [leadsRes, clientsRes, collegesRes] = await Promise.all([
                axios.get(backendURL + '/api/inquiries', { withCredentials: true }),
                axios.get(backendURL + '/api/clients', { withCredentials: true }),
                axios.get(backendURL + '/api/colleges', { withCredentials: true })
            ]);

            const leads = Array.isArray(leadsRes.data) ? leadsRes.data : (leadsRes.data.data || []);
            const clients = Array.isArray(clientsRes.data) ? clientsRes.data : (clientsRes.data.data || []);
            const colleges = Array.isArray(collegesRes.data) ? collegesRes.data : (collegesRes.data.data || []);

            let totalRev = 0;
            let collectedRev = 0;
            clients.forEach(c => {
                totalRev += (c.financials?.totalAgreedAmount || 0);
                collectedRev += (c.financials?.amountPaid || 0);
            });

            // Calculate active and hot leads
            const activeLeadsCount = leads.filter(l => l.status !== 'Converted' && l.status !== 'Dead').length;
            const hotLeadsArray = leads.filter(l => l.temperature === 'Hot' && l.status !== 'Converted').slice(0, 5);

            // 🟢 CALCULATE TODAY'S TASKS
            // Get today's date in YYYY-MM-DD format based on local time
            const localToday = new Date();
            const offset = localToday.getTimezoneOffset() * 60000;
            const todayStr = (new Date(localToday - offset)).toISOString().split('T')[0];
            
            const todaysTasksArray = leads.filter(l => 
                l.nextFollowUpDate && 
                l.nextFollowUpDate.startsWith(todayStr) && 
                l.status !== 'Converted' && 
                l.status !== 'Dead'
            ).slice(0, 5); // Show top 5 tasks for the day

            let seatsLeft = 0;
            colleges.forEach(col => {
                col.programs?.forEach(prog => {
                    seatsLeft += (prog.availableSeats || 0);
                });
            });

            setStats({
                totalRevenue: totalRev,
                collectedRevenue: collectedRev,
                activeLeads: activeLeadsCount,
                hotLeads: hotLeadsArray,
                todaysTasks: todaysTasksArray,
                totalConverted: clients.length,
                availableSeats: seatsLeft
            });

        } catch (error) {
            console.error("Error fetching dashboard data", error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
    const todayFormatted = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    if (loading) {
        return <div className="flex justify-center items-center h-[70vh]"><div className="animate-spin rounded-full h-16 w-16 border-t-[4px] border-b-[4px] border-jcs-brand shadow-[0_0_15px_rgba(0,208,132,0.5)]"></div></div>;
    }

    const conversionRate = ((stats.totalConverted / (stats.activeLeads + stats.totalConverted || 1)) * 100).toFixed(1);

    return (
        <div className="max-w-[1400px] mx-auto animate-fade-in-up pb-12">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Command Center</h1>
                    <p className="text-gray-500 font-medium text-lg">Welcome back, <span className="text-jcs-deep font-bold">{user?.name?.split(' ')[0] || 'Admin'}</span>.</p>
                </div>
                <div className="bg-white px-5 py-2.5 rounded-full border border-gray-100 shadow-sm flex items-center gap-2 text-sm font-bold text-gray-500">
                    <FiCalendar className="text-jcs-brand" />
                    {todayFormatted}
                </div>
            </div>

            {/* TOP ROW: KEY METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Revenue Card */}
                {user?.role === 'super-admin' ? (
                    <div className="bg-gradient-to-br from-gray-900 via-[#13422E] to-jcs-deep p-8 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(27,81,53,0.6)] text-white relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(27,81,53,0.8)] transition-all duration-500">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-jcs-brand opacity-20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10 shadow-inner"><FiDollarSign size={24} className="text-green-300" /></div>
                            <span className="bg-green-500/20 text-green-300 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-green-500/30 flex items-center gap-1.5 shadow-[0_0_10px_rgba(74,222,128,0.2)]">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Live
                            </span>
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-white/60 font-bold text-xs uppercase tracking-widest mb-1">Total Pipeline Value</h3>
                            <h2 className="text-4xl font-black tracking-tight mb-2">{formatCurrency(stats.totalRevenue)}</h2>
                            <div className="inline-flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
                                <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Collected</span>
                                <span className="text-sm font-black text-green-400">{formatCurrency(stats.collectedRevenue)}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4"><FiDollarSign className="text-gray-300" size={28} /></div>
                        <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest">Financials</h3>
                        <p className="text-gray-900 font-black text-sm mt-1">Super Admin Access Only</p>
                    </div>
                )}

                {/* Active Leads */}
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 group hover:-translate-y-1 relative overflow-hidden">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 rounded-full blur-2xl group-hover:bg-blue-100 transition-colors duration-500"></div>
                    <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100 group-hover:scale-110 transition-transform duration-300"><FiUsers size={22} strokeWidth={2.5} /></div>
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-1">Active Pipeline</h3>
                        <div className="flex items-baseline gap-2"><h2 className="text-4xl font-black text-gray-900 tracking-tight">{stats.activeLeads}</h2><span className="text-sm text-gray-400 font-bold uppercase tracking-wider">Leads</span></div>
                    </div>
                </div>

                {/* Converted Clients */}
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 group hover:-translate-y-1 relative overflow-hidden">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-jcs-brand/5 rounded-full blur-2xl group-hover:bg-jcs-brand/10 transition-colors duration-500"></div>
                    <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className="w-12 h-12 bg-jcs-brand/10 text-jcs-brand rounded-2xl flex items-center justify-center border border-jcs-brand/20 group-hover:scale-110 transition-transform duration-300"><FiAward size={22} strokeWidth={2.5} /></div>
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-1">Total Conversions</h3>
                        <div className="flex items-baseline gap-2"><h2 className="text-4xl font-black text-gray-900 tracking-tight">{stats.totalConverted}</h2><span className="text-sm text-gray-400 font-bold uppercase tracking-wider">Clients</span></div>
                    </div>
                </div>

                {/* Seat Inventory */}
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 group hover:-translate-y-1 relative overflow-hidden">
                    <div className="absolute -bottom-8 -right-8 text-gray-50 opacity-60 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700"><FiActivity size={140} /></div>
                    <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center border border-purple-100 group-hover:scale-110 transition-transform duration-300"><FiTarget size={22} strokeWidth={2.5} /></div>
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-1">Available Seats</h3>
                        <div className="flex items-baseline gap-2"><h2 className="text-4xl font-black text-gray-900 tracking-tight">{stats.availableSeats}</h2><span className="text-sm text-gray-400 font-bold uppercase tracking-wider">Quotas</span></div>
                    </div>
                </div>
            </div>

            {/* BOTTOM ROW: SPLIT VIEW */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* LEFT: Pipeline Health Visualization */}
                <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden h-full">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gray-50 rounded-full blur-3xl opacity-50 pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
                    
                    <div className="flex justify-between items-center mb-10 relative z-10">
                        <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2"><FiTrendingUp className="text-jcs-brand"/> Conversion Funnel</h3>
                        <div className="bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 flex items-center gap-3 shadow-inner">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Close Rate</span>
                            <span className="text-lg font-black text-jcs-deep">{conversionRate}%</span>
                        </div>
                    </div>
                    
                    <div className="space-y-8 relative z-10">
                        {/* Funnel Bar 1: Raw Leads */}
                        <div className="relative group">
                            <div className="flex justify-between items-end mb-2">
                                <div><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Stage 1</span><span className="text-sm font-bold text-gray-900">Total Inquiries</span></div>
                                <span className="text-2xl font-black text-gray-900">{stats.activeLeads + stats.totalConverted}</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-2xl h-6 overflow-hidden shadow-inner p-1"><div className="bg-gray-300 h-full w-full rounded-xl"></div></div>
                        </div>

                        {/* Funnel Bar 2: Active Pipeline */}
                        <div className="relative group pl-4 md:pl-8 border-l-2 border-dashed border-gray-200">
                            <div className="flex justify-between items-end mb-2">
                                <div><span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-0.5">Stage 2</span><span className="text-sm font-bold text-blue-900">Active Pipeline</span></div>
                                <span className="text-2xl font-black text-blue-600">{stats.activeLeads}</span>
                            </div>
                            <div className="w-full bg-blue-50 rounded-2xl h-6 overflow-hidden shadow-inner p-1 border border-blue-100">
                                <div className="bg-gradient-to-r from-blue-400 to-blue-500 h-full rounded-xl transition-all duration-1000 ease-out" style={{ width: `${((stats.activeLeads / (stats.activeLeads + stats.totalConverted)) * 100) || 0}%` }}></div>
                            </div>
                        </div>

                        {/* Funnel Bar 3: Closed Deals */}
                        <div className="relative group pl-8 md:pl-16 border-l-2 border-dashed border-gray-200">
                            <div className="flex justify-between items-end mb-2">
                                <div><span className="text-[10px] font-black text-jcs-brand uppercase tracking-widest block mb-0.5">Stage 3</span><span className="text-sm font-bold text-jcs-deep">Closed Deals (Converted)</span></div>
                                <span className="text-2xl font-black text-jcs-deep">{stats.totalConverted}</span>
                            </div>
                            <div className="w-full bg-green-50 rounded-2xl h-6 overflow-hidden shadow-inner p-1 border border-green-100">
                                <div className="bg-gradient-to-r from-jcs-brand to-jcs-brand-light h-full rounded-xl transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(0,208,132,0.6)]" style={{ width: `${((stats.totalConverted / (stats.activeLeads + stats.totalConverted)) * 100) || 0}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Action Center (Stacked Tasks & Hot Leads) */}
                <div className="flex flex-col gap-6">
                    
                    {/* 🟢 WIDGET 1: Today's Tasks */}
                    <div className="bg-gradient-to-b from-blue-50/50 to-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-blue-100/50 flex flex-col relative overflow-hidden flex-1">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 opacity-[0.03] rounded-full blur-2xl pointer-events-none"></div>
                        <div className="flex justify-between items-center mb-6 relative z-10 border-b border-blue-100 pb-4">
                            <h3 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
                                <FiCheckCircle className="text-blue-500" /> Today's Tasks
                            </h3>
                            <span className="bg-blue-100 text-blue-600 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase">{stats.todaysTasks.length} Due</span>
                        </div>

                        <div className="flex-1 space-y-3 relative z-10">
                            {stats.todaysTasks.length > 0 ? (
                                stats.todaysTasks.map((lead, idx) => (
                                    <div key={idx} onClick={() => setSelectedLead(lead)} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center font-black text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors border border-gray-100">{lead.name.charAt(0)}</div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-sm group-hover:text-blue-500 transition-colors">{lead.name}</h4>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5 truncate max-w-[150px]">{lead.adminNotes || 'Follow Up Required'}</p>
                                            </div>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors"><FiArrowUpRight size={16} /></div>
                                    </div>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-white/60 rounded-3xl border border-dashed border-gray-200">
                                    <p className="text-sm font-bold text-gray-900">All caught up!</p>
                                    <p className="text-xs font-medium text-gray-500 mt-1">No follow-ups scheduled for today.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* WIDGET 2: Priority Hot Leads */}
                    <div className="bg-gradient-to-b from-red-50/50 to-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-red-100/50 flex flex-col relative overflow-hidden flex-1">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-400 opacity-[0.03] rounded-full blur-2xl pointer-events-none"></div>
                        <div className="flex justify-between items-center mb-6 relative z-10 border-b border-red-100 pb-4">
                            <h3 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                                Priority Hot Leads
                            </h3>
                            <span className="bg-red-100 text-red-600 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase">{stats.hotLeads.length} Hot</span>
                        </div>

                        <div className="flex-1 space-y-3 relative z-10">
                            {stats.hotLeads.length > 0 ? (
                                stats.hotLeads.map((lead, idx) => (
                                    <div key={idx} onClick={() => setSelectedLead(lead)} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-red-200 transition-all cursor-pointer group flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center font-black text-gray-400 group-hover:bg-red-50 group-hover:text-red-500 transition-colors border border-gray-100">{lead.name.charAt(0)}</div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-sm group-hover:text-red-500 transition-colors">{lead.name}</h4>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{lead.interestedCourse || 'No Course Set'}</p>
                                            </div>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors group-hover:rotate-45 duration-300"><FiArrowUpRight size={16} /></div>
                                    </div>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-white/60 rounded-3xl border border-dashed border-gray-200">
                                    <p className="text-sm font-bold text-gray-900">Inbox Zero!</p>
                                    <p className="text-xs font-medium text-gray-500 mt-1 max-w-[200px]">Tag leads as 'Hot' in the pipeline to pin them here.</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* 🟢 NEW: QUICK ACTION LEAD MODAL */}
            {selectedLead && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 max-w-md w-full shadow-2xl animate-fade-in-up border border-white/20 relative overflow-hidden">
                        
                        <button onClick={() => setSelectedLead(null)} className="absolute top-6 right-6 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-200 transition-colors z-10"><FiX size={20} /></button>
                        
                        <div className="mb-6 flex items-center gap-4">
                            <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-md">{selectedLead.name.charAt(0)}</div>
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 tracking-tight">{selectedLead.name}</h2>
                                <span className={`text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest mt-1 inline-block ${selectedLead.temperature === 'Hot' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                                    {selectedLead.temperature === 'Hot' ? '🔥 Hot Lead' : 'Lead Profile'}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Interested In</p>
                                <p className="font-bold text-sm text-gray-900">{selectedLead.interestedCourse || 'Not specified'}</p>
                            </div>
                            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1 flex items-center gap-1.5"><FiClock /> Next Action / Notes</p>
                                <p className="font-bold text-sm text-blue-900">{selectedLead.adminNotes || 'No notes added yet.'}</p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <a href={`tel:${selectedLead.phone}`} className="flex-1 bg-gray-900 text-white font-extrabold py-4 rounded-xl hover:bg-jcs-deep transition-all shadow-md flex items-center justify-center gap-2">
                                <FiPhone /> Call Now
                            </a>
                            <a href={`https://wa.me/91${selectedLead.phone}`} target="_blank" rel="noreferrer" className="flex-1 bg-[#25D366] text-white font-extrabold py-4 rounded-xl hover:bg-[#1DA851] transition-all shadow-md flex items-center justify-center gap-2">
                                <FiMessageSquare /> WhatsApp
                            </a>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Overview;