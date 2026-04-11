import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FiArchive, FiSearch, FiCalendar, FiUser, FiMoreVertical, FiFilter, FiPlus, FiX, FiCheckCircle } from 'react-icons/fi';

const Archive = () => {
    const { user } = useContext(AuthContext);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBatch, setSelectedBatch] = useState(2025);
    const [searchTerm, setSearchTerm] = useState("");

    // 🟢 NEW: State for the Add Modal
    const [showAddModal, setShowAddModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newRecord, setNewRecord] = useState({
        name: '', email: '', phone: '', course: '', college: '', admissionYear: 2025, finalStatus: 'Admitted', totalFee: ''
    });

    const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    useEffect(() => {
        fetchArchiveData();
    }, [selectedBatch]);

    const fetchArchiveData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${backendURL}/api/archives?year=${selectedBatch}`, { withCredentials: true });
            setRecords(res.data);
        } catch (error) {
            console.error("Error fetching archives", error);
        } finally {
            setLoading(false);
        }
    };

    // 🟢 NEW: Submit Handler for Manual Entry
    const handleAddRecord = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post(`${backendURL}/api/archives`, newRecord, { withCredentials: true });
            setShowAddModal(false);
            setNewRecord({ name: '', email: '', phone: '', course: '', college: '', admissionYear: selectedBatch, finalStatus: 'Admitted', totalFee: '' });
            fetchArchiveData(); // Refresh the list
            alert("Historical record added successfully!");
        } catch (error) {
            console.error("Error adding record", error);
            alert("Failed to add record.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredRecords = records.filter(r =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.course.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-[1400px] mx-auto animate-fade-in-up pb-12 px-4 md:px-0">

            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                        <FiArchive className="text-jcs-brand" /> Records Vault
                    </h1>
                    <p className="text-gray-500 font-medium text-lg mt-1">Historical student data & admission logs.</p>
                </div>

                <div className="flex items-center gap-4">
                    {/* 🟢 NEW: Add Record Button */}
                    {user?.role === 'super-admin' && (
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="bg-jcs-deep text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-900 transition-colors shadow-md"
                        >
                            <FiPlus /> Add Record
                        </button>
                    )}

                    {/* Batch Switcher */}
                    <div className="flex p-1.5 bg-gray-100 rounded-2xl border border-gray-200 shadow-inner">
                        {[2024, 2025].map((year) => (
                            <button
                                key={year}
                                onClick={() => setSelectedBatch(year)}
                                className={`px-6 md:px-8 py-2.5 rounded-xl font-black text-sm tracking-widest transition-all ${selectedBatch === year
                                        ? 'bg-white text-jcs-deep shadow-md'
                                        : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                {year} BATCH
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Summary Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5">
                    <div className="w-12 h-12 bg-jcs-brand/10 text-jcs-brand rounded-2xl flex items-center justify-center text-xl"><FiUser /></div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Students</p>
                        <p className="text-2xl font-black text-gray-900">{records.length}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5 md:col-span-2">
                    <div className="relative w-full">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search historical records..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-jcs-brand outline-none transition-all font-bold text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Records Table */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Student Info</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Program & College</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Admission Year</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="py-20 text-center">
                                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-jcs-brand mx-auto"></div>
                                    </td>
                                </tr>
                            ) : filteredRecords.length > 0 ? (
                                filteredRecords.map((r) => (
                                    <tr key={r._id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center font-black text-sm border border-gray-200">
                                                    {r.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-gray-900 leading-none mb-1">{r.name}</p>
                                                    <p className="text-xs text-gray-400 font-bold">{r.phone || 'No phone recorded'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="font-bold text-gray-800 text-sm">{r.course}</p>
                                            <p className="text-[10px] font-black text-jcs-deep uppercase tracking-tighter">{r.college || 'Direct Admission'}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <FiCalendar className="text-gray-300" />
                                                <span className="font-black text-gray-700">{r.admissionYear}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <span className="bg-green-50 text-green-600 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-green-100 inline-flex items-center gap-1.5">
                                                <FiCheckCircle /> {r.finalStatus}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-20 text-center flex flex-col items-center">
                                        <FiFilter size={40} className="text-gray-200 mb-4" />
                                        <p className="text-gray-400 font-black">No archived records found.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 🟢 NEW: Add Record Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/70 backdrop-blur-sm">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl flex flex-col animate-fade-in-up border border-white/20">
                        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Add Historical Record</h2>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Direct Vault Entry</p>
                            </div>
                            <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"><FiX size={24} /></button>
                        </div>
                        <form onSubmit={handleAddRecord} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Student Name *</label>
                                    <input type="text" required value={newRecord.name} onChange={e => setNewRecord({ ...newRecord, name: e.target.value })} className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-jcs-brand focus:ring-2 focus:ring-jcs-brand/20 outline-none font-bold" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
                                    <input type="tel" value={newRecord.phone} onChange={e => setNewRecord({ ...newRecord, phone: e.target.value })} className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-jcs-brand focus:ring-2 focus:ring-jcs-brand/20 outline-none font-bold" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Course Pursued *</label>
                                    <input type="text" required value={newRecord.course} onChange={e => setNewRecord({ ...newRecord, course: e.target.value })} className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-jcs-brand focus:ring-2 focus:ring-jcs-brand/20 outline-none font-bold" placeholder="e.g. MBBS" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">University / College *</label>
                                    <input type="text" required value={newRecord.college} onChange={e => setNewRecord({ ...newRecord, college: e.target.value })} className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-jcs-brand focus:ring-2 focus:ring-jcs-brand/20 outline-none font-bold" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Admission Batch</label>
                                    <select value={newRecord.admissionYear} onChange={e => setNewRecord({ ...newRecord, admissionYear: Number(e.target.value) })} className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-jcs-brand focus:ring-2 focus:ring-jcs-brand/20 outline-none font-bold cursor-pointer">
                                        <option value={2025}>2025</option>
                                        <option value={2024}>2024</option>
                                        <option value={2023}>2023</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Final Status</label>
                                    <input type="text" value={newRecord.finalStatus} onChange={e => setNewRecord({ ...newRecord, finalStatus: e.target.value })} className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none font-bold text-gray-500" placeholder="e.g. Admitted" />
                                </div>
                            </div>
                            <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                                <button type="button" onClick={() => setShowAddModal(false)} className="px-6 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
                                <button type="submit" disabled={isSubmitting} className="bg-jcs-deep text-white px-8 py-3 rounded-xl font-black hover:bg-gray-900 transition-colors shadow-md disabled:opacity-70 flex items-center gap-2">
                                    {isSubmitting ? 'Saving...' : <><FiCheckCircle /> Save to Vault</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Archive;