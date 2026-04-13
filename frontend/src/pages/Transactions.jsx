import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FiPlus, FiX, FiSearch, FiFilter, FiTrendingUp, FiTrendingDown, FiDollarSign, FiCheck } from 'react-icons/fi';

const TYPE_COLORS = {
    'Payment Received': 'bg-green-100 text-green-700 border-green-200',
    'Refund': 'bg-red-100 text-red-700 border-red-200',
    'Discount': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Adjustment': 'bg-blue-100 text-blue-700 border-blue-200',
};
const STATUS_COLORS = {
    'Confirmed': 'bg-green-50 text-green-600',
    'Pending': 'bg-yellow-50 text-yellow-600',
    'Failed': 'bg-red-50 text-red-600',
};
const METHOD_ICONS = { Cash: '💵', 'Bank Transfer': '🏦', UPI: '📲', Cheque: '🧾', Card: '💳', Other: '🔁' };

const StatCard = ({ icon, label, value, sub, color }) => (
    <div className={`bg-white p-6 rounded-3xl border border-gray-100 shadow-saas relative overflow-hidden`}>
        <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-20 ${color}`}></div>
        <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${color} bg-opacity-20`}>{icon}</div>
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{label}</span>
        </div>
        <div className="text-2xl font-black text-gray-900">₹{Number(value).toLocaleString('en-IN')}</div>
        {sub && <div className="text-xs font-bold text-gray-400 mt-1">{sub}</div>}
    </div>
);

const Transactions = () => {
    const { user } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ totalReceived: 0, totalRefunded: 0, net: 0 });
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterMethod, setFilterMethod] = useState('');

    const [form, setForm] = useState({
        clientId: '', type: 'Payment Received', amount: '',
        paymentMethod: 'UPI', referenceNumber: '', description: '', status: 'Confirmed'
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchAll();
        fetchClients();
    }, []);

    const fetchAll = async (params = {}) => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/transactions', { params, withCredentials: true });
            setTransactions(data.transactions || []);
            setStats({ totalReceived: data.totalReceived, totalRefunded: data.totalRefunded, net: data.net });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchClients = async () => {
        try {
            const { data } = await axios.get('/api/clients', { withCredentials: true });
            setClients(Array.isArray(data) ? data : (data.clients || []));
        } catch (e) { console.error(e); }
    };

    const handleSave = async () => {
        if (!form.clientId || !form.amount) return alert('Client and amount are required.');
        setSaving(true);
        try {
            await axios.post('/api/transactions', form, { withCredentials: true });
            setShowModal(false);
            setForm({ clientId: '', type: 'Payment Received', amount: '', paymentMethod: 'UPI', referenceNumber: '', description: '', status: 'Confirmed' });
            fetchAll();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to save transaction.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this transaction?')) return;
        await axios.delete(`/api/transactions/${id}`, { withCredentials: true });
        fetchAll();
    };

    const filtered = transactions.filter(t => {
        const matchSearch = !search || t.clientName?.toLowerCase().includes(search.toLowerCase()) || t.referenceNumber?.includes(search);
        const matchType = !filterType || t.type === filterType;
        const matchMethod = !filterMethod || t.paymentMethod === filterMethod;
        return matchSearch && matchType && matchMethod;
    });

    return (
        <div className="max-w-[1400px] mx-auto animate-fade-in-up pb-12">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Transactions</h1>
                    <p className="text-gray-500 font-medium">Full financial ledger — every payment, refund, and adjustment.</p>
                </div>
                <button onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-6 py-3.5 bg-jcs-deep text-white font-bold rounded-2xl hover:bg-jcs-brand hover:text-gray-900 transition-all shadow-md text-sm">
                    <FiPlus size={18} /> Record Transaction
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard icon="💰" label="Total Received" value={stats.totalReceived} sub="Confirmed payments" color="bg-green-500" />
                <StatCard icon="↩️" label="Total Refunded" value={stats.totalRefunded} sub="Refunds processed" color="bg-red-500" />
                <StatCard icon="📊" label="Net Revenue" value={stats.net} sub="Received minus refunds" color="bg-blue-500" />
            </div>

            {/* Filters */}
            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input type="text" placeholder="Search by client name or reference..." value={search} onChange={e => setSearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm font-semibold text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-jcs-brand/20 focus:border-jcs-brand transition-all" />
                </div>
                <select value={filterType} onChange={e => setFilterType(e.target.value)}
                    className="px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-jcs-brand/20 cursor-pointer">
                    <option value="">All Types</option>
                    {['Payment Received', 'Refund', 'Discount', 'Adjustment'].map(t => <option key={t}>{t}</option>)}
                </select>
                <select value={filterMethod} onChange={e => setFilterMethod(e.target.value)}
                    className="px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-jcs-brand/20 cursor-pointer">
                    <option value="">All Methods</option>
                    {['Cash', 'Bank Transfer', 'UPI', 'Cheque', 'Card', 'Other'].map(m => <option key={m}>{m}</option>)}
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="flex justify-center items-center h-48"><div className="animate-spin rounded-full h-10 w-10 border-t-[3px] border-jcs-brand"></div></div>
                ) : filtered.length === 0 ? (
                    <div className="text-center p-16">
                        <div className="text-5xl mb-4">💳</div>
                        <h3 className="text-xl font-black text-gray-700 mb-2">No Transactions Found</h3>
                        <p className="text-gray-400 font-medium text-sm">Record your first transaction to get started.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    {['Date', 'Client', 'Type', 'Amount', 'Method', 'Reference', 'Status', ''].map(h => (
                                        <th key={h} className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filtered.map(tx => (
                                    <tr key={tx._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-500 whitespace-nowrap">
                                            {new Date(tx.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-black text-sm text-gray-900">{tx.clientName}</div>
                                            <div className="text-xs text-gray-400 font-semibold">{tx.clientPhone}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider border ${TYPE_COLORS[tx.type] || 'bg-gray-100 text-gray-600'}`}>
                                                {tx.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-base font-black ${tx.type === 'Refund' ? 'text-red-600' : 'text-gray-900'}`}>
                                                {tx.type === 'Refund' ? '-' : '+'}₹{tx.amount.toLocaleString('en-IN')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-600">
                                            {METHOD_ICONS[tx.paymentMethod]} {tx.paymentMethod}
                                        </td>
                                        <td className="px-6 py-4 text-xs font-mono text-gray-500 max-w-[120px] truncate">
                                            {tx.referenceNumber || '—'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase ${STATUS_COLORS[tx.status]}`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => handleDelete(tx._id)} className="text-gray-300 hover:text-red-500 transition-colors p-1">
                                                <FiX size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* ── New Transaction Modal ─────────────────────────────────────── */}
            {showModal && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl animate-fade-in-up overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-black text-gray-900">Record Transaction</h3>
                                <p className="text-xs text-gray-400 font-medium mt-1">Log a payment, refund, or adjustment</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
                                <FiX size={16} />
                            </button>
                        </div>
                        <div className="p-8 space-y-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Client *</label>
                                <select value={form.clientId} onChange={e => setForm({ ...form, clientId: e.target.value })}
                                    className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 font-semibold text-sm focus:outline-none focus:border-jcs-brand text-gray-900 cursor-pointer">
                                    <option value="">Select Client...</option>
                                    {clients.map(c => <option key={c._id} value={c._id}>{c.name} — {c.phone}</option>)}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Type</label>
                                    <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                                        className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 font-semibold text-sm focus:outline-none focus:border-jcs-brand text-gray-900 cursor-pointer">
                                        {['Payment Received', 'Refund', 'Discount', 'Adjustment'].map(t => <option key={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Amount (₹) *</label>
                                    <input type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} placeholder="0"
                                        className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 font-black text-gray-900 text-sm focus:outline-none focus:border-jcs-brand" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Payment Method</label>
                                    <select value={form.paymentMethod} onChange={e => setForm({ ...form, paymentMethod: e.target.value })}
                                        className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 font-semibold text-sm focus:outline-none focus:border-jcs-brand text-gray-900 cursor-pointer">
                                        {['Cash', 'Bank Transfer', 'UPI', 'Cheque', 'Card', 'Other'].map(m => <option key={m}>{m}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Status</label>
                                    <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
                                        className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 font-semibold text-sm focus:outline-none focus:border-jcs-brand text-gray-900 cursor-pointer">
                                        {['Confirmed', 'Pending', 'Failed'].map(s => <option key={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Reference Number (UTR / Cheque No.)</label>
                                <input type="text" value={form.referenceNumber} onChange={e => setForm({ ...form, referenceNumber: e.target.value })} placeholder="e.g. UPI/UTR1234567890"
                                    className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 font-semibold text-sm focus:outline-none focus:border-jcs-brand text-gray-900" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Description / Notes</label>
                                <input type="text" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="e.g. First instalment for MBBS application"
                                    className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 font-semibold text-sm focus:outline-none focus:border-jcs-brand text-gray-900" />
                            </div>
                        </div>
                        <div className="px-8 pb-8 flex gap-3">
                            <button onClick={handleSave} disabled={saving}
                                className="flex-1 bg-jcs-deep text-white font-black py-4 rounded-xl hover:bg-jcs-brand hover:text-gray-900 transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                                {saving ? <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div> : <><FiCheck size={16} /> Save Transaction</>}
                            </button>
                            <button onClick={() => setShowModal(false)} className="px-6 py-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Transactions;
