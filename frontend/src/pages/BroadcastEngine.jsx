import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiRadio, FiUsers, FiFilter, FiMessageSquare, FiMail, FiSend, FiSmartphone } from 'react-icons/fi';

const BroadcastEngine = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Broadcast State
    const [targetAudience, setTargetAudience] = useState('All Active Leads');
    const [channel, setChannel] = useState('WhatsApp');
    const [message, setMessage] = useState('');
    const [subject, setSubject] = useState(''); // Only used for Email
    const [isSending, setIsSending] = useState(false);

    const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            // Fetching both New and Waiting List leads
            const [newRes, waitingRes] = await Promise.all([
                axios.get(backendURL + '/api/inquiries?status=New', { withCredentials: true }),
                axios.get(backendURL + '/api/inquiries?status=Waiting List', { withCredentials: true })
            ]);
            
            const newLeads = Array.isArray(newRes.data) ? newRes.data : (newRes.data.data || []);
            const waitingLeads = Array.isArray(waitingRes.data) ? waitingRes.data : (waitingRes.data.data || []);
            
            setLeads([...newLeads, ...waitingLeads]);
        } catch (error) {
            console.error("Error fetching leads for broadcast", error);
        } finally {
            setLoading(false);
        }
    };

    // 🧮 Calculate Audience Size
    const getFilteredAudience = () => {
        if (targetAudience === 'All Active Leads') return leads;
        if (targetAudience === 'Hot Leads Only') return leads.filter(l => l.temperature === 'Hot');
        if (targetAudience === 'Awaiting Exam Results') return leads.filter(l => l.waitlistReason === 'Awaiting Exam Results');
        if (targetAudience === 'Arranging Funds') return leads.filter(l => l.waitlistReason === 'Arranging Funds');
        return leads;
    };

    const filteredCount = getFilteredAudience().length;

    const handleSimulateSend = () => {
        if (!message.trim()) return alert("Message cannot be empty!");
        if (filteredCount === 0) return alert("Your selected audience is empty!");

        setIsSending(true);
        // Simulate a network delay for sending mass messages
        setTimeout(() => {
            setIsSending(false);
            setMessage('');
            setSubject('');
            alert(`✅ Successfully broadcasted to ${filteredCount} recipients via ${channel}!`);
        }, 2000);
    };

    if (loading) return <div className="flex justify-center items-center h-[70vh]"><div className="animate-spin rounded-full h-16 w-16 border-t-[4px] border-b-[4px] border-jcs-brand"></div></div>;

    return (
        <div className="max-w-[1400px] mx-auto animate-fade-in-up pb-12">
            
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Broadcast Engine</h1>
                <p className="text-gray-500 font-medium text-lg flex items-center gap-2">
                    <FiRadio className="text-jcs-brand" /> Mass communication and automated follow-ups.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* 🟢 LEFT COLUMN: COMPOSER */}
                <div className="lg:col-span-7 space-y-6">
                    
                    {/* Targeting Block */}
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2"><FiFilter /> 1. Audience Targeting</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Filter Pipeline By</label>
                                <select 
                                    value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)}
                                    className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900/20 font-bold text-gray-900 text-sm appearance-none cursor-pointer"
                                >
                                    <option>All Active Leads</option>
                                    <option>Hot Leads Only</option>
                                    <option>Awaiting Exam Results</option>
                                    <option>Arranging Funds</option>
                                </select>
                            </div>
                            
                            {/* Audience Size Metric */}
                            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center"><FiUsers size={20}/></div>
                                <div>
                                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Est. Reach</p>
                                    <p className="text-2xl font-black text-blue-900">{filteredCount} <span className="text-sm text-blue-500 font-bold">Students</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Composer Block */}
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><FiMessageSquare /> 2. Message Composer</h3>
                            
                            {/* Channel Toggles */}
                            <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-200">
                                <button onClick={() => setChannel('WhatsApp')} className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${channel === 'WhatsApp' ? 'bg-[#25D366] text-white shadow-md' : 'text-gray-400 hover:text-gray-900'}`}>
                                    <FiMessageSquare size={14}/> WhatsApp
                                </button>
                                <button onClick={() => setChannel('Email')} className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${channel === 'Email' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-400 hover:text-gray-900'}`}>
                                    <FiMail size={14}/> Email
                                </button>
                            </div>
                        </div>

                        {channel === 'Email' && (
                            <div className="mb-4">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Subject Line</label>
                                <input 
                                    type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Important Update regarding your admission..."
                                    className="w-full p-4 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900/20 font-bold text-sm"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Message Body</label>
                            <textarea 
                                value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here. Use [Name] to auto-insert the student's name."
                                className="w-full p-5 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900/20 font-medium text-sm min-h-[200px] resize-none leading-relaxed"
                            ></textarea>
                        </div>
                        
                        <p className="text-xs text-gray-400 font-bold mt-3">Pro tip: Use <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">[Name]</span> to automatically personalize the message for each student.</p>
                    </div>

                    {/* Send Action */}
                    <button 
                        onClick={handleSimulateSend}
                        disabled={isSending || filteredCount === 0}
                        className={`w-full py-5 rounded-[1.5rem] font-extrabold text-lg flex items-center justify-center gap-3 transition-all shadow-lg ${
                            isSending ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 
                            channel === 'WhatsApp' ? 'bg-[#25D366] text-white hover:bg-[#1DA851]' : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    >
                        {isSending ? (
                            <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Sending Broadcast...</>
                        ) : (
                            <><FiSend size={20} /> Transmit to {filteredCount} {channel} Contacts</>
                        )}
                    </button>
                </div>

                {/* 🟢 RIGHT COLUMN: LIVE PREVIEW */}
                <div className="lg:col-span-5 relative">
                    <div className="sticky top-28 bg-gray-900 p-8 rounded-[3rem] shadow-2xl border border-gray-800 flex flex-col items-center">
                        <div className="w-full flex justify-between items-center mb-8">
                            <h3 className="text-white font-black tracking-tight flex items-center gap-2"><FiSmartphone className="text-gray-400"/> Live Preview</h3>
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest bg-gray-800 px-3 py-1 rounded-full">{channel}</span>
                        </div>

                        {/* iPhone Mockup Frame */}
                        <div className="w-full max-w-[300px] bg-black border-[8px] border-gray-800 rounded-[3rem] h-[550px] relative overflow-hidden shadow-inner flex flex-col">
                            {/* Notch */}
                            <div className="absolute top-0 inset-x-0 h-6 bg-gray-800 rounded-b-3xl w-40 mx-auto z-20"></div>
                            
                            {/* Mockup Header */}
                            <div className={`pt-10 pb-4 px-4 flex items-center gap-3 z-10 ${channel === 'WhatsApp' ? 'bg-[#075E54]' : 'bg-gray-100 border-b border-gray-200'}`}>
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-black text-white shrink-0">
                                    {channel === 'WhatsApp' ? 'JCS' : <FiMail className="text-gray-600"/>}
                                </div>
                                <div className="overflow-hidden">
                                    <p className={`text-sm font-bold truncate ${channel === 'WhatsApp' ? 'text-white' : 'text-gray-900'}`}>
                                        {channel === 'WhatsApp' ? 'Jamia Consultancy' : 'New Email'}
                                    </p>
                                    <p className={`text-[10px] ${channel === 'WhatsApp' ? 'text-white/70' : 'text-gray-500'}`}>
                                        {channel === 'WhatsApp' ? 'Business Account' : 'To: Student'}
                                    </p>
                                </div>
                            </div>

                            {/* Mockup Body */}
                            <div className={`flex-1 p-4 overflow-y-auto ${channel === 'WhatsApp' ? 'bg-[#E5DDD5]' : 'bg-white'}`}>
                                {channel === 'Email' && subject && (
                                    <div className="mb-4 pb-2 border-b border-gray-100">
                                        <p className="text-xs font-black text-gray-900">{subject}</p>
                                    </div>
                                )}
                                
                                {message ? (
                                    <div className={`${channel === 'WhatsApp' ? 'bg-[#DCF8C6] p-3 rounded-2xl rounded-tr-none ml-6 shadow-sm relative text-gray-800' : 'text-gray-700'} text-sm leading-relaxed whitespace-pre-wrap break-words`}>
                                        {message.replace(/\[Name\]/g, 'Aves')}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <p className="text-xs font-bold text-gray-400 text-center px-6">Start typing to see your {channel} preview here.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BroadcastEngine;