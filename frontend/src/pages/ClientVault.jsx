import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import ExportButtons from '../components/dashboard/ExportButtons';
import CustomerDashboard from '../components/dashboard/CustomerDashboard';

const WhatsAppIcon = ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

const ClientVault = () => {
    const { user } = useContext(AuthContext);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedClient, setSelectedClient] = useState(null);

    const [filterAdmission, setFilterAdmission] = useState('');
    const [filterLeadStatus, setFilterLeadStatus] = useState('');
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

    const filteredClients = clients.filter(c => {
        const query = searchQuery.toLowerCase();
        const matchSearch =
            c.name.toLowerCase().includes(query) ||
            c.phone.includes(query) ||
            (c.targetCourse && c.targetCourse.toLowerCase().includes(query)) ||
            (c.targetColleges && c.targetColleges.some(col => col.toLowerCase().includes(query)));

        const matchAdmission = filterAdmission ? c.admissionStatus === filterAdmission : true;
        const matchLead = filterLeadStatus ? c.temperature === filterLeadStatus : true;

        return matchSearch && matchAdmission && matchLead;
    });

    const activeFilterCount = [filterAdmission, filterLeadStatus].filter(Boolean).length;

    const clearFilters = () => {
        setFilterAdmission('');
        setFilterLeadStatus('');
    };

    const statusColors = {
        'COLLEGE FORM APPLIED': 'bg-purple-50 text-purple-600 border-purple-100',
        'WAITING FOR ALLOTMENT': 'bg-blue-50 text-blue-600 border-blue-100',
        'SEAT CONFIRMED': 'bg-green-50 text-green-600 border-green-100',
        'PAYMENT': 'bg-rose-50 text-rose-600 border-rose-100',
        'INTERESTED': 'bg-teal-50 text-teal-600 border-teal-100',
        'FOLLOW UP 1': 'bg-amber-50 text-amber-600 border-amber-100',
        'FOLLOW UP 2': 'bg-orange-50 text-orange-600 border-orange-100',
    };

    return (
        <div className="max-w-[1400px] mx-auto animate-fade-in-up pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Client Vault</h1>
                    <p className="text-gray-500 font-medium">
                        Manage admissions and follow-ups.
                        {filteredClients.length !== clients.length && (
                            <span className="ml-2 text-jcs-brand font-bold">{filteredClients.length} of {clients.length} shown</span>
                        )}
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                    {user?.role === 'super-admin' && filteredClients.length > 0 && (
                        <ExportButtons
                            data={filteredClients.map(c => ({
                                Name: c.name,
                                Phone: c.phone,
                                'Admission Stage': c.admissionStatus,
                                'Lead Status': c.temperature,
                                Course: c.targetCourse
                            }))}
                            filename="JCS_Clients"
                        />
                    )}

                    <div className="relative w-full md:w-72">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text" placeholder="Search name, phone, course..." value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-gray-100 shadow-sm focus:outline-none focus:ring-4 focus:ring-jcs-brand/10 transition-all text-gray-900 font-semibold placeholder-gray-400 text-sm"
                        />
                    </div>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`relative flex items-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all border shadow-sm ${showFilters || activeFilterCount > 0 ? 'bg-jcs-deep text-white border-jcs-deep' : 'bg-white text-gray-700 border-gray-100 hover:border-gray-300'}`}
                    >
                        <FiFilter size={16} /> Filters
                        {activeFilterCount > 0 && (
                            <span className="w-5 h-5 rounded-full bg-jcs-brand text-gray-900 text-[10px] font-black flex items-center justify-center">{activeFilterCount}</span>
                        )}
                    </button>
                </div>
            </div>

            {showFilters && (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-8 animate-fade-in-up">
                    <div className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Lead Status (Temp)</label>
                            <select
                                value={filterLeadStatus} onChange={(e) => setFilterLeadStatus(e.target.value)}
                                className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 font-semibold text-sm focus:outline-none focus:border-jcs-brand text-gray-900 cursor-pointer"
                            >
                                <option value="">All Lead Statuses</option>
                                <option value="INTERESTED">INTERESTED</option>
                                <option value="FOLLOW UP 1">FOLLOW UP 1</option>
                                <option value="FOLLOW UP 2">FOLLOW UP 2</option>
                            </select>
                        </div>

                        <div className="flex-1">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Admission Stage</label>
                            <select
                                value={filterAdmission} onChange={(e) => setFilterAdmission(e.target.value)}
                                className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 font-semibold text-sm focus:outline-none focus:border-jcs-brand text-gray-900 cursor-pointer"
                            >
                                <option value="">All Stages</option>
                                <option value="COLLEGE FORM APPLIED">COLLEGE FORM APPLIED</option>
                                <option value="WAITING FOR ALLOTMENT">WAITING FOR ALLOTMENT</option>
                                <option value="SEAT CONFIRMED">SEAT CONFIRMED</option>
                                <option value="PAYMENT">PAYMENT</option>
                            </select>
                        </div>

                        {activeFilterCount > 0 && (
                            <button onClick={clearFilters} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-50 text-red-600 font-bold text-sm hover:bg-red-100 transition-colors border border-red-100">
                                <FiX size={14} /> Clear
                            </button>
                        )}
                    </div>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-[3px] border-b-[3px] border-jcs-brand"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredClients.map(client => (
                        <div
                            key={client._id}
                            onClick={() => setSelectedClient(client)}
                            className="bg-white p-7 rounded-[2.5rem] shadow-saas hover:shadow-saas-hover transition-all duration-500 border border-gray-100 cursor-pointer group hover:-translate-y-1 flex flex-col"
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

                                    <div className="flex items-center gap-2 mt-0.5">
                                        <p className="text-xs text-gray-500 font-bold">{client.phone}</p>
                                        {client.targetCourse && (
                                            <>
                                                <span className="text-gray-300">•</span>
                                                <span className="text-xs font-black text-jcs-brand uppercase tracking-wider">{client.targetCourse}</span>
                                            </>
                                        )}
                                    </div>

                                    <p className="text-[10px] text-gray-400 font-bold mt-1">

                                        Update: {new Date(client.updatedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className={`text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider border ${statusColors[client.admissionStatus] || 'bg-gray-50 text-gray-600 border-gray-100'}`}>
                                    {client.admissionStatus || 'Applied'}
                                </span>
                                <span className={`text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider border ${statusColors[client.temperature] || 'bg-gray-50 text-gray-600 border-gray-100'}`}>
                                    {client.temperature || 'INTERESTED'}
                                </span>
                            </div>

                            <div className="pt-4 border-t border-gray-50 flex flex-col gap-2 flex-1">
                                {client.targetColleges?.length > 0 && (
                                    <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-2.5">
                                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Target College</p>
                                        <p className="text-sm font-bold text-blue-700 truncate">
                                            🏛️ {client.targetColleges.join(', ')}
                                        </p>
                                    </div>
                                )}

                                {client.guardianDetails?.name && (
                                    <div className="flex justify-between items-center bg-gray-50 rounded-lg p-2.5 mt-auto">
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Guardian</p>
                                            <p className="text-xs font-bold text-gray-700">{client.guardianDetails.name}</p>
                                        </div>
                                        {client.guardianDetails.phone && (
                                            <span className="text-xs font-bold text-gray-500">📞 {client.guardianDetails.phone}</span>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Quick Action WhatsApp Footer */}
                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
                                <div className="flex -space-x-2">
                                    {client.documents?.slice(0, 3).map((_, i) => (
                                        <div key={i} className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[8px]" title="Document Uploaded">📄</div>
                                    ))}
                                    {client.documents?.length > 3 && (
                                        <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[8px] font-bold">+{client.documents.length - 3}</div>
                                    )}
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const cleanPhone = client.phone.replace(/\D/g, '');
                                        window.open(`https://wa.me/91${cleanPhone}`, '_blank');
                                    }}
                                    className="p-2.5 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all shadow-sm"
                                    title="Message on WhatsApp"
                                >
                                    <WhatsAppIcon size={16} />
                                </button>
                            </div>
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