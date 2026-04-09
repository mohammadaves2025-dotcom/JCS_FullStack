import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FiSearch } from 'react-icons/fi';
import ExportButtons from '../components/dashboard/ExportButtons';
// 🚨 Import the new component!
import CustomerDashboard from '../components/dashboard/CustomerDashboard';

const ClientVault = () => {
    const { user } = useContext(AuthContext);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedClient, setSelectedClient] = useState(null);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/clients', { withCredentials: true });
            const extractedClients = Array.isArray(data) ? data : (data.data || data.clients || []);
            setClients(extractedClients);

            // If a dashboard is currently open, update its data so it doesn't close on save
            if (selectedClient) {
                const updatedSelectedClient = extractedClients.find(c => c._id === selectedClient._id);
                if (updatedSelectedClient) setSelectedClient(updatedSelectedClient);
            }
        } catch (error) {
            console.error("Error fetching clients", error);
            setClients([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredClients = clients.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.phone.includes(searchQuery));

    return (
        <div className="max-w-[1400px] mx-auto animate-fade-in-up pb-12">

            {/* Header & Search */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Client Vault</h1>
                    <p className="text-gray-500 font-medium">Manage student profiles, financials, and secure documents.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    {user?.role === 'super-admin' && filteredClients.length > 0 && (
                        <ExportButtons data={filteredClients.map(c => ({ Name: c.name, Phone: c.phone, Status: c.admissionStatus }))} filename="JCS_Clients" />
                    )}
                    <div className="relative w-full md:w-80">
                        <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text" placeholder="Search clients..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:outline-none focus:ring-4 focus:ring-jcs-brand/10 transition-all text-gray-900 font-bold placeholder-gray-400"
                        />
                    </div>
                </div>
            </div>

            {/* Client Grid */}
            {loading ? (
                <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-[3px] border-b-[3px] border-jcs-brand"></div></div>
            ) : filteredClients.length === 0 ? (
                <div className="bg-white p-16 rounded-[3rem] text-center shadow-saas border border-gray-100"><h3 className="text-3xl font-black text-gray-900 mb-3">No Clients Found</h3></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredClients.map(client => (
                        <div key={client._id} onClick={() => setSelectedClient(client)} className="bg-white p-8 rounded-[3rem] shadow-saas hover:shadow-saas-hover transition-all duration-500 border border-gray-100 cursor-pointer group hover:-translate-y-1">
                            <div className="flex items-center gap-5 mb-6">
                                {client.profilePhoto ? (
                                    <img src={client.profilePhoto} alt={client.name} className="w-16 h-16 rounded-[1.5rem] object-cover shadow-inner" />
                                ) : (
                                    <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-jcs-deep to-[#13422E] flex items-center justify-center font-black text-white text-2xl shadow-inner group-hover:scale-105 transition-transform">
                                        {client.name.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-xl font-black text-gray-900 group-hover:text-jcs-deep transition-colors tracking-tight">{client.name}</h3>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{client.targetCourse || 'Course Not Set'}</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider border bg-gray-50 text-gray-600">
                                {client.admissionStatus || 'Pending'}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Render the Dashboard Component when a client is clicked */}
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