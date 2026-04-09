import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FiPhone, FiMessageSquare, FiCalendar, FiCheckCircle, FiTrendingUp, FiMapPin, FiBookOpen, FiX, FiTrash2, FiChevronDown, FiClock } from 'react-icons/fi';
import CustomerDashboard from '../components/dashboard/CustomerDashboard';

const LeadPipeline = () => {
    const { user } = useContext(AuthContext);
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('New');

    // Modal & Dashboard States
    const [showConvertModal, setShowConvertModal] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);
    const [dashboardClient, setDashboardClient] = useState(null);

    // Note & Dropdown States
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [tempNote, setTempNote] = useState('');
    const [waDropdownId, setWaDropdownId] = useState(null); // Tracks which WhatsApp menu is open

    const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    useEffect(() => {
        fetchLeads();
    }, [statusFilter]);

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(backendURL + `/api/inquiries?status=${statusFilter}`, { withCredentials: true });
            const extractedLeads = Array.isArray(data) ? data : (data.data || data.inquiries || data.leads || []);
            setLeads(extractedLeads);
        } catch (error) {
            console.error("Error fetching leads", error);
            setLeads([]);
        } finally {
            setLoading(false);
        }
    };

    const updateLead = async (id, updates) => {
        try {
            await axios.put(backendURL + `/api/inquiries/${id}`, updates, { withCredentials: true });
            setLeads(leads.map(lead => lead._id === id ? { ...lead, ...updates } : lead));
            setEditingNoteId(null);
        } catch (error) {
            alert("Failed to update lead.");
        }
    };

    // 🟢 SNOOZE ENGINE LOGIC
    const snoozeFollowUp = (id, days, e) => {
        e.stopPropagation();
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + days);
        // Format to YYYY-MM-DD for the input
        const formattedDate = futureDate.toISOString().split('T')[0];
        updateLead(id, { nextFollowUpDate: formattedDate, status: 'Waiting List' });
    };

    // 🟢 ONE-CLICK WHATSAPP TEMPLATES
    const sendWhatsApp = (phone, name, type, e) => {
        e.stopPropagation();
        let msg = "";

        if (type === 'Brochure') {
            msg = `Hi ${name},\n\nAs discussed, here is the brochure and details for the college program. Let me know when you are free to review them!\n\nBest,\nJamia Consultancy`;
        } else if (type === 'FollowUp') {
            msg = `Hi ${name},\n\nJust checking in on your admission status. Do you have 5 minutes for a quick call today to discuss your options?`;
        } else if (type === 'Offer') {
            msg = `Hi ${name},\n\nGreat news! We have secured a special early-bird management quota offer for you. Let's connect ASAP before the seats fill up.`;
        } else {
            msg = `Hi ${name},`;
        }

        window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(msg)}`, '_blank');
        setWaDropdownId(null); // Close the menu
    };

    // Conversion & Deletion logic remains the same...
    const handleConvert = async () => {
        if (!selectedLead) return;
        try {
            await axios.post(backendURL + `/api/inquiries/${selectedLead._id}/convert`, {}, { withCredentials: true });
            setShowConvertModal(false);
            setSelectedLead(null);
            fetchLeads();
        } catch (error) {
            alert(error.response?.data?.message || "Conversion failed.");
        }
    };

    const handleDeleteLead = async (id, name, e) => {
        e.stopPropagation();
        if (window.confirm(`⚠️ WARNING: Are you sure you want to permanently delete ${name}? This cannot be undone.`)) {
            try {
                await axios.delete(backendURL + `/api/inquiries/${id}`, { withCredentials: true });
                setLeads(leads.filter(lead => lead._id !== id));
            } catch (error) {
                alert("Failed to delete lead.");
            }
        }
    };

    const openDashboardForLead = async (lead) => {
        if (statusFilter !== 'Converted') return;
        try {
            const { data } = await axios.get(backendURL + '/api/clients', { withCredentials: true });
            const clients = Array.isArray(data) ? data : (data.data || data.clients || []);
            const clientRecord = clients.find(c => c.inquiryId === lead._id);
            if (clientRecord) setDashboardClient(clientRecord);
        } catch (error) {
            alert("Could not load the client dashboard.");
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Not Set';
        return new Date(dateString).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    };

    return (
        <div className="max-w-7xl mx-auto animate-fade-in-up pb-12" onClick={() => setWaDropdownId(null)}>

            {/* Header & Glassmorphism Tabs */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-1">Lead Pipeline</h1>
                    <p className="text-gray-500 font-medium">Manage inquiries and drive conversions.</p>
                </div>

                <div className="flex bg-white rounded-full p-1.5 shadow-sm border border-gray-100 w-full md:w-auto overflow-x-auto hide-scrollbar">
                    {['New', 'Waiting List', 'Converted'].map(status => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`flex-1 md:flex-none whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${statusFilter === status
                                ? 'bg-jcs-deep text-white shadow-md'
                                : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Lead Cards Grid */}
            {loading ? (
                <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-[3px] border-b-[3px] border-jcs-brand"></div></div>
            ) : leads.length === 0 ? (
                <div className="bg-white p-12 rounded-[2.5rem] border border-gray-100 text-center shadow-saas">
                    <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl"><FiCheckCircle /></div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No leads found</h3>
                    <p className="text-gray-500 font-medium">There are no inquiries matching the "{statusFilter}" status.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {leads.map(lead => (
                        <div
                            key={lead._id}
                            onClick={() => openDashboardForLead(lead)}
                            className={`bg-white rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col md:flex-row gap-8 items-start md:items-center group ${statusFilter === 'Converted' ? 'cursor-pointer hover:-translate-y-1 hover:border-jcs-brand/30' : ''}`}
                        >
                            {/* 🟢 CORE INFO & TEMPERATURE */}
                            <div className="flex-1 w-full">
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <h3 className="text-2xl font-black text-gray-900 group-hover:text-jcs-deep transition-colors">{lead.name}</h3>

                                    {/* Temperature Selector */}
                                    {statusFilter !== 'Converted' ? (
                                        <select
                                            value={lead.temperature || "Unassigned"}
                                            onChange={(e) => updateLead(lead._id, { temperature: e.target.value })}
                                            onClick={(e) => e.stopPropagation()}
                                            className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest cursor-pointer outline-none appearance-none shadow-sm transition-colors ${lead.temperature === 'Hot' ? 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100' :
                                                    lead.temperature === 'Warm' ? 'bg-orange-50 text-orange-600 border border-orange-100 hover:bg-orange-100' :
                                                        lead.temperature === 'Cold' ? 'bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100' :
                                                            'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'
                                                }`}
                                        >
                                            <option value="Unassigned">⚪ Set Temp</option>
                                            <option value="Hot">🔥 Hot</option>
                                            <option value="Warm">☀️ Warm</option>
                                            <option value="Cold">❄️ Cold</option>
                                        </select>
                                    ) : (
                                        <span className="bg-jcs-brand/10 text-jcs-brand text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest">Converted</span>
                                    )}
                                </div>

                                <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-gray-500">
                                    <span className="flex items-center gap-2"><FiBookOpen className="text-gray-400" /> {lead.interestedCourse}</span>
                                    <span className="flex items-center gap-2"><FiMapPin className="text-gray-400" /> {lead.preferredCity}</span>
                                </div>
                            </div>

                            {/* 🟢 FOLLOW UP & SNOOZE ENGINE */}
                            <div className="flex-1 w-full bg-gray-50 p-5 rounded-[1.5rem] border border-gray-100" onClick={(e) => e.stopPropagation()}>

                                <div className="flex justify-between items-center mb-3">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                                            <FiCalendar className="text-jcs-brand" /> Next Action Date
                                        </span>
                                        <span className="text-sm font-black text-gray-900">{formatDate(lead.nextFollowUpDate)}</span>
                                    </div>

                                    {statusFilter !== 'Converted' && (
                                        <div className="flex flex-col items-end gap-2">
                                            {/* Snooze Buttons */}
                                            <div className="flex gap-1">
                                                <button onClick={(e) => snoozeFollowUp(lead._id, 1, e)} className="text-[10px] font-bold px-2 py-1 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm" title="Snooze 1 Day">+1D</button>
                                                <button onClick={(e) => snoozeFollowUp(lead._id, 3, e)} className="text-[10px] font-bold px-2 py-1 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm" title="Snooze 3 Days">+3D</button>
                                                <button onClick={(e) => snoozeFollowUp(lead._id, 7, e)} className="text-[10px] font-bold px-2 py-1 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm" title="Snooze 1 Week">+1W</button>
                                            </div>
                                            <input
                                                type="date"
                                                onChange={(e) => updateLead(lead._id, { nextFollowUpDate: e.target.value, status: 'Waiting List' })}
                                                className="text-[10px] font-bold uppercase p-1.5 rounded-lg border border-gray-200 text-gray-600 cursor-pointer focus:outline-none focus:border-jcs-brand"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Inline Note Editor (Next Action) */}
                                {editingNoteId === lead._id ? (
                                    <div className="flex gap-2 mt-2 border-t border-gray-200 pt-3">
                                        <input
                                            type="text" autoFocus value={tempNote} onChange={(e) => setTempNote(e.target.value)}
                                            className="w-full text-sm p-3 rounded-xl border-none focus:ring-2 focus:ring-jcs-brand shadow-inner bg-white"
                                            placeholder="What is the next action step?..."
                                        />
                                        <button onClick={() => updateLead(lead._id, { adminNotes: tempNote })} className="bg-jcs-deep text-white px-4 rounded-xl text-sm font-bold shadow-md hover:bg-gray-900 transition-colors">
                                            Save
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => { if (statusFilter !== 'Converted') { setEditingNoteId(lead._id); setTempNote(lead.adminNotes); } }}
                                        className={`mt-2 border-t border-gray-200 pt-3 text-sm font-medium p-2 rounded-xl transition-all flex items-start gap-3 ${statusFilter !== 'Converted' ? 'text-gray-700 cursor-pointer hover:bg-white hover:shadow-sm' : 'text-gray-400'}`}
                                        title={statusFilter !== 'Converted' ? "Click to set next action" : "Notes locked"}
                                    >
                                        <FiClock className="mt-0.5 shrink-0 text-gray-400" />
                                        {lead.adminNotes ? lead.adminNotes : <span className="text-gray-400 italic">Click to log next action / notes...</span>}
                                    </div>
                                )}
                            </div>

                            {/* 🟢 QUICK ACTIONS & WHATSAPP TEMPLATES */}
                            <div className="flex flex-row md:flex-col items-center gap-3 w-full md:w-auto mt-2 md:mt-0" onClick={(e) => e.stopPropagation()}>
                                <div className="flex gap-3 w-full md:w-auto">
                                    <a href={`tel:${lead.phone}`} className="flex-1 md:flex-none w-12 h-12 rounded-2xl bg-white border border-gray-100 text-gray-600 flex items-center justify-center hover:border-jcs-deep hover:text-jcs-deep transition-all shadow-sm" title="Call">
                                        <FiPhone />
                                    </a>

                                    {/* WhatsApp Super-Button */}
                                    <div className="relative flex-1 md:flex-none">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setWaDropdownId(waDropdownId === lead._id ? null : lead._id); }}
                                            className="w-full md:w-12 h-12 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all shadow-sm"
                                            title="Send WhatsApp Template"
                                        >
                                            <FiMessageSquare />
                                        </button>

                                        {waDropdownId === lead._id && (
                                            <div className="absolute bottom-full mb-2 right-0 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-fade-in-up">
                                                <div className="p-3 bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 flex items-center gap-2">
                                                    <FiMessageSquare /> Select Template
                                                </div>
                                                <button onClick={(e) => sendWhatsApp(lead.phone, lead.name, 'Brochure', e)} className="w-full text-left px-4 py-3 text-sm font-bold text-gray-700 hover:bg-[#25D366]/10 hover:text-[#25D366] transition-colors border-b border-gray-50">
                                                    📄 Send Brochure
                                                </button>
                                                <button onClick={(e) => sendWhatsApp(lead.phone, lead.name, 'FollowUp', e)} className="w-full text-left px-4 py-3 text-sm font-bold text-gray-700 hover:bg-[#25D366]/10 hover:text-[#25D366] transition-colors border-b border-gray-50">
                                                    👋 Quick Follow-up
                                                </button>
                                                <button onClick={(e) => sendWhatsApp(lead.phone, lead.name, 'Offer', e)} className="w-full text-left px-4 py-3 text-sm font-bold text-gray-700 hover:bg-[#25D366]/10 hover:text-[#25D366] transition-colors">
                                                    🔥 Discount Offer
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Super Admin Delete */}
                                    {user?.role === 'super-admin' && (
                                        <button
                                            onClick={(e) => handleDeleteLead(lead._id, lead.name, e)}
                                            className="flex-1 md:flex-none w-12 h-12 rounded-2xl bg-white border border-red-100 text-red-400 flex items-center justify-center hover:bg-red-500 hover:border-red-500 hover:text-white transition-all shadow-sm"
                                            title="Permanently Delete Lead"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    )}
                                </div>

                                {/* Super Admin Convert */}
                                {user?.role === 'super-admin' && statusFilter !== 'Converted' && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedLead(lead); setShowConvertModal(true); }}
                                        className="w-full bg-gradient-to-r from-jcs-brand to-jcs-brand-light text-jcs-deep font-black text-sm py-3 px-6 rounded-2xl shadow-glow hover:shadow-[0_10px_30px_-10px_rgba(0,208,132,0.6)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                                    >
                                        <FiTrendingUp size={16} className="stroke-[3]" /> CONVERT
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Convert Modal & Customer Dashboard Modals remain exactly the same as before... */}
            {showConvertModal && selectedLead && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 max-w-md w-full shadow-2xl animate-fade-in-up border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-jcs-brand/10 rounded-full blur-3xl pointer-events-none"></div>
                        <button onClick={() => setShowConvertModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 transition-colors z-10"><FiX size={24} /></button>
                        <div className="w-20 h-20 bg-jcs-brand/10 text-jcs-brand rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner relative z-10"><FiTrendingUp /></div>
                        <h2 className="text-3xl font-black text-center text-gray-900 mb-3 relative z-10">Convert Lead?</h2>
                        <p className="text-center text-gray-500 text-sm mb-10 font-medium relative z-10">
                            You are moving <strong className="text-gray-900">{selectedLead.name}</strong> to the Client Vault. This opens their secure profile and financial ledger.
                        </p>
                        <div className="flex gap-4 relative z-10">
                            <button onClick={() => setShowConvertModal(false)} className="flex-1 bg-gray-50 text-gray-600 font-bold py-4 rounded-2xl hover:bg-gray-100 transition-colors border border-gray-200">Cancel</button>
                            <button onClick={handleConvert} className="flex-1 bg-jcs-deep text-white font-extrabold py-4 rounded-2xl hover:bg-gray-900 transition-colors shadow-lg">Confirm</button>
                        </div>
                    </div>
                </div>
            )}

            {dashboardClient && (
                <CustomerDashboard client={dashboardClient} onClose={() => setDashboardClient(null)} refreshClients={fetchLeads} />
            )}
        </div>
    );
};

export default LeadPipeline;