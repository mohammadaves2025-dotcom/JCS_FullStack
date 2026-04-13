import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import ExportButtons from '../components/dashboard/ExportButtons';
import CustomerDashboard from '../components/dashboard/CustomerDashboard';

const ClientVault = () => {
    const { user } = useContext(AuthContext);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedClient, setSelectedClient] = useState(null);

    // 🟢 NEW: Filter states
    const [filterCollege, setFilterCollege] = useState('');
    const [filterCourse, setFilterCourse] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => { fetchClients(); }, []);

    const fetchClients = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/clients', { withCredentials: true });
            const extracted = Array.isArray(data) ? data : (data.data || data.clients || []);
            setClients(extracted);
            if (selectedClient) {
                const updated = extracted.find(c => c._id === selectedClient._id);
                if (updated) setSelectedClient(updated);
            }
        } catch (error) {
            console.error("Error fetching clients", error);
            setClients([]);
        } finally {
            setLoading(false);
        }
    };

    // 🟢 Derive unique colleges and courses for filter dropdowns
    const allColleges = [...new Set(clients.flatMap(c => c.targetColleges || []).filter(Boolean))].sort();
    const allCourses = [...new Set(clients.map(c => c.targetCourse).filter(Boolean))].sort();

    // 🟢 Multi-layered filter
    const filteredClients = clients.filter(c => {
        const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.phone.includes(searchQuery);
        const matchCollege = filterCollege ? (c.targetColleges || []).includes(filterCollege) : true;
        const matchCourse = filterCourse ? c.targetCourse === filterCourse : true;
        return matchSearch && matchCollege && matchCourse;
    });

    const activeFilterCount = [filterCollege, filterCourse].filter(Boolean).length;

    const clearFilters = () => {
        setFilterCollege('');
        setFilterCourse('');
    };

    const statusColors = {
        'Documents Pending': 'bg-orange-50 text-orange-600 border-orange-100',
        'Documents Verified': 'bg-blue-50 text-blue-600 border-blue-100',
        'College Applied': 'bg-purple-50 text-purple-600 border-purple-100',
        'Seat Confirmed': 'bg-green-50 text-green-600 border-green-100',
    };

    return (
        <div className="max-w-[1400px] mx-auto animate-fade-in-up pb-12">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Client Vault</h1>
                    <p className="text-gray-500 font-medium">
                        Manage student profiles, financials, and documents.
                        {filteredClients.length !== clients.length && (
                            <span className="ml-2 text-jcs-brand font-bold">{filteredClients.length} of {clients.length} shown</span>
                        )}
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                    {user?.role === 'super-admin' && filteredClients.length > 0 && (
                        <ExportButtons data={filteredClients.map(c => ({ Name: c.name, Phone: c.phone, Status: c.admissionStatus, Course: c.targetCourse }))} filename="JCS_Clients" />
                    )}

                    {/* Search */}
                    <div className="relative w-full md:w-72">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text" placeholder="Search by name or phone..." value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-gray-100 shadow-sm focus:outline-none focus:ring-4 focus:ring-jcs-brand/10 transition-all text-gray-900 font-semibold placeholder-gray-400 text-sm"
                        />
                    </div>

                    {/* 🟢 Filter Toggle Button */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`relative flex items-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all border shadow-sm ${showFilters || activeFilterCount > 0 ? 'bg-jcs-deep text-white border-jcs-deep' : 'bg-white text-gray-700 border-gray-100 hover:border-gray-300'}`}
                    >
                        <FiFilter size={16} />
                        Filters
                        {activeFilterCount > 0 && (
                            <span className="w-5 h-5 rounded-full bg-jcs-brand text-gray-900 text-[10px] font-black flex items-center justify-center">
                                {activeFilterCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* 🟢 Filter Panel */}
            {showFilters && (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-8 animate-fade-in-up">
                    <div className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Filter by College</label>
                            <select
                                value={filterCollege} onChange={(e) => setFilterCollege(e.target.value)}
                                className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 font-semibold text-sm focus:outline-none focus:border-jcs-brand focus:ring-2 focus:ring-jcs-brand/10 text-gray-900 cursor-pointer"
                            >
                                <option value="">All Colleges</option>
                                {allColleges.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div className="flex-1">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Filter by Course</label>
                            <select
                                value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)}
                                className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 font-semibold text-sm focus:outline-none focus:border-jcs-brand focus:ring-2 focus:ring-jcs-brand/10 text-gray-900 cursor-pointer"
                            >
                                <option value="">All Courses</option>
                                {allCourses.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        {activeFilterCount > 0 && (
                            <button
                                onClick={clearFilters}
                                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-50 text-red-600 font-bold text-sm hover:bg-red-100 transition-colors border border-red-100"
                            >
                                <FiX size={14} /> Clear Filters
                            </button>
                        )}
                    </div>

                    {/* Active filter tags */}
                    {activeFilterCount > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                            {filterCollege && (
                                <span className="inline-flex items-center gap-2 bg-jcs-brand/10 text-jcs-brand text-xs font-black px-3 py-1.5 rounded-full">
                                    College: {filterCollege}
                                    <button onClick={() => setFilterCollege('')} className="hover:text-red-500 transition-colors"><FiX size={10} /></button>
                                </span>
                            )}
                            {filterCourse && (
                                <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-black px-3 py-1.5 rounded-full">
                                    Course: {filterCourse}
                                    <button onClick={() => setFilterCourse('')} className="hover:text-red-500 transition-colors"><FiX size={10} /></button>
                                </span>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Client Grid */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-[3px] border-b-[3px] border-jcs-brand"></div>
                </div>
            ) : filteredClients.length === 0 ? (
                <div className="bg-white p-16 rounded-[3rem] text-center shadow-saas border border-gray-100">
                    <div className="text-5xl mb-4">🔍</div>
                    <h3 className="text-3xl font-black text-gray-900 mb-3">No Clients Found</h3>
                    <p className="text-gray-500 font-medium">Try adjusting your search or filters.</p>
                    {activeFilterCount > 0 && (
                        <button onClick={clearFilters} className="mt-6 px-6 py-3 bg-jcs-brand/10 text-jcs-brand font-bold rounded-xl text-sm hover:bg-jcs-brand/20 transition-colors">
                            Clear all filters
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredClients.map(client => (
                        <div
                            key={client._id}
                            onClick={() => setSelectedClient(client)}
                            className="bg-white p-7 rounded-[2.5rem] shadow-saas hover:shadow-saas-hover transition-all duration-500 border border-gray-100 cursor-pointer group hover:-translate-y-1"
                        >
                            <div className="flex items-center gap-4 mb-5">
                                {client.profilePhoto ? (
                                    <img src={client.profilePhoto} alt={client.name} className="w-14 h-14 rounded-2xl object-cover shadow-sm" />
                                ) : (
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-jcs-deep to-[#13422E] flex items-center justify-center font-black text-white text-xl shadow-sm group-hover:scale-105 transition-transform">
                                        {client.name.charAt(0)}
                                    </div>
                                )}
                                <div className="min-w-0">
                                    <h3 className="text-lg font-black text-gray-900 group-hover:text-jcs-deep transition-colors tracking-tight truncate">{client.name}</h3>
                                    <p className="text-xs text-gray-400 font-bold">{client.phone}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className={`text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider border ${statusColors[client.admissionStatus] || 'bg-gray-50 text-gray-600 border-gray-100'}`}>
                                    {client.admissionStatus || 'Pending'}
                                </span>
                                {client.socialCategory && client.socialCategory !== 'General' && (
                                    <span className="text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider bg-purple-50 text-purple-600 border border-purple-100">
                                        {client.socialCategory}
                                    </span>
                                )}
                            </div>

                            {(client.targetCourse || (client.targetColleges?.length > 0)) && (
                                <div className="pt-4 border-t border-gray-50 space-y-1">
                                    {client.targetCourse && (
                                        <p className="text-xs text-gray-500 font-semibold truncate">📚 {client.targetCourse}</p>
                                    )}
                                    {client.targetColleges?.length > 0 && (
                                        <p className="text-xs text-gray-400 font-semibold truncate">🏛️ {client.targetColleges[0]}{client.targetColleges.length > 1 ? ` +${client.targetColleges.length - 1}` : ''}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {selectedClient && (
                <CustomerDashboard
                    client={selectedClient}
                    onClose={() => setSelectedClient(null)}
                    refreshClients={fetchClients}
                />
            )}
        </div>
    );
};

export default ClientVault;
