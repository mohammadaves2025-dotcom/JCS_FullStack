import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FiArchive, FiSearch, FiCalendar, FiUser, FiBook, FiMoreVertical, FiFilter } from 'react-icons/fi';

const Archive = () => {
    const { user } = useContext(AuthContext);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBatch, setSelectedBatch] = useState(2025);
    const [searchTerm, setSearchTerm] = useState("");

    const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    useEffect(() => {
        fetchArchiveData();
    }, [selectedBatch]);

    const fetchArchiveData = async () => {
        setLoading(true);
        try {
            // Fetching from your new dedicated Archive API
            const res = await axios.get(`${backendURL}/api/archives?year=${selectedBatch}`, { withCredentials: true });
            setRecords(res.data);
        } catch (error) {
            console.error("Error fetching archives", error);
        } finally {
            setLoading(false);
        }
    };

    // Filter results locally for the search bar
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

                {/* Batch Switcher */}
                <div className="flex p-1.5 bg-gray-100 rounded-2xl border border-gray-200 shadow-inner">
                    {[2024, 2025].map((year) => (
                        <button
                            key={year}
                            onClick={() => setSelectedBatch(year)}
                            className={`px-8 py-2.5 rounded-xl font-black text-sm tracking-widest transition-all ${selectedBatch === year
                                    ? 'bg-white text-jcs-deep shadow-md'
                                    : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {year} BATCH
                        </button>
                    ))}
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
                            placeholder="Search by name or course..."
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
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Action</th>
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
                                                <div className="w-10 h-10 rounded-xl bg-jcs-deep text-white flex items-center justify-center font-black text-sm">
                                                    {r.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-gray-900 leading-none mb-1">{r.name}</p>
                                                    <p className="text-xs text-gray-400 font-bold">{r.email || r.phone}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="font-bold text-gray-800 text-sm">{r.course}</p>
                                            <p className="text-[10px] font-black text-jcs-brand uppercase tracking-tighter">{r.college || 'Direct Admission'}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <FiCalendar className="text-gray-300" />
                                                <span className="font-black text-gray-700">{r.admissionYear}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors">
                                                <FiMoreVertical />
                                            </button>
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
        </div>
    );
};

export default Archive;