import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FiSearch, FiMapPin, FiPlus, FiMinus, FiAward, FiSettings, FiGrid, FiX, FiCheckCircle, FiEdit3, FiActivity, FiDollarSign, FiTrash2 } from 'react-icons/fi';

const CollegeInventory = () => {
    const { user } = useContext(AuthContext);
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    // Dynamic State for Modals (Supports multiple courses per college)
    const [newCol, setNewCol] = useState({
        name: '', city: '', state: '', type: 'Private University', estimatedDonation: '',
        programs: [{ name: '', totalSeats: '' }]
    });
    const [editingCol, setEditingCol] = useState(null);

    const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    useEffect(() => {
        fetchColleges();
    }, []);

    const fetchColleges = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(backendURL + '/api/colleges', { withCredentials: true });
            setColleges(data);
        } catch (error) {
            console.error("Error fetching colleges", error);
        } finally {
            setLoading(false);
        }
    };

    // 🟢 DYNAMIC FORM HANDLERS
    const handleProgramChange = (index, field, value, isEditing = false) => {
        const targetState = isEditing ? editingCol : newCol;
        const setTargetState = isEditing ? setEditingCol : setNewCol;

        const updatedPrograms = [...targetState.programs];
        updatedPrograms[index][field] = value;
        setTargetState({ ...targetState, programs: updatedPrograms });
    };

    const addProgramRow = (isEditing = false) => {
        const targetState = isEditing ? editingCol : newCol;
        const setTargetState = isEditing ? setEditingCol : setNewCol;
        setTargetState({ ...targetState, programs: [...targetState.programs, { name: '', totalSeats: '' }] });
    };

    const removeProgramRow = (index, isEditing = false) => {
        const targetState = isEditing ? editingCol : newCol;
        const setTargetState = isEditing ? setEditingCol : setNewCol;
        const updatedPrograms = targetState.programs.filter((_, i) => i !== index);
        setTargetState({ ...targetState, programs: updatedPrograms });
    };

    // 🟢 SUBMIT HANDLERS
    const handleAddCollege = async (e) => {
        e.preventDefault();
        try {
            // Clean up the programs array to ensure numbers are parsed
            const payload = {
                ...newCol,
                programs: newCol.programs.filter(p => p.name).map(p => ({
                    name: p.name,
                    totalSeats: parseInt(p.totalSeats) || 0
                }))
            };

            await axios.post(backendURL + '/api/colleges', payload, { withCredentials: true });
            setNewCol({ name: '', city: '', state: '', type: 'Private University', estimatedDonation: '', programs: [{ name: '', totalSeats: '' }] });
            setShowAddModal(false);
            fetchColleges();
        } catch (error) {
            alert(error.response?.data?.message || "Failed to add college.");
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...editingCol,
                programs: editingCol.programs.filter(p => p.name).map(p => ({
                    ...p,
                    totalSeats: parseInt(p.totalSeats) || 0
                }))
            };

            await axios.put(backendURL + `/api/colleges/${editingCol._id}`, payload, { withCredentials: true });
            setShowEditModal(false);
            setEditingCol(null);
            fetchColleges();
        } catch (error) {
            alert("Failed to update college.");
        }
    };

    // 🟢 SEAT INVENTORY UPDATER
    const handleSeatAdjustment = async (collegeId, programId, seatsSold) => {
        try {
            const { data } = await axios.patch(backendURL + `/api/colleges/${collegeId}/inventory`, { programId, seatsSold }, { withCredentials: true });

            // Instantly update UI with the response from the server
            setColleges(colleges.map(col => col._id === collegeId ? data : col));
        } catch (error) {
            alert(error.response?.data?.message || "Inventory update failed.");
        }
    };

    const filteredColleges = colleges.filter(col =>
        col.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        col.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        col.programs.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="max-w-[1400px] mx-auto animate-fade-in-up pb-12 relative">

            {/* Header & Search */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">College Network</h1>
                    <p className="text-gray-500 font-medium flex items-center gap-2"><FiActivity className="text-jcs-brand" /> Live Management Quota Inventory</p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    {user?.role === 'super-admin' && (
                        <button onClick={() => setShowAddModal(true)} className="bg-gray-900 text-white font-extrabold py-3.5 px-8 rounded-2xl shadow-lg hover:bg-jcs-deep hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                            <FiPlus size={20} className="stroke-[3]" /> Add Institution
                        </button>
                    )}
                    <div className="relative w-full md:w-80">
                        <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input type="text" placeholder="Search institutions or courses..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:outline-none focus:border-gray-300 focus:ring-4 focus:ring-gray-100 transition-all text-gray-900 font-bold placeholder-gray-400" />
                    </div>
                </div>
            </div>

            {/* Inventory Grid */}
            {loading ? (
                <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-[3px] border-b-[3px] border-jcs-brand"></div></div>
            ) : filteredColleges.length === 0 ? (
                <div className="bg-white p-16 rounded-[3rem] text-center shadow-sm border border-gray-100">
                    <div className="w-24 h-24 bg-gray-50 text-gray-300 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner"><FiGrid /></div>
                    <h3 className="text-3xl font-black text-gray-900 mb-3">No Colleges Found</h3>
                    <p className="text-gray-500 font-medium">Try adjusting your search criteria or add a new institution.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {filteredColleges.map(col => (
                        <div key={col._id} className="bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 group flex flex-col h-full relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gray-50 to-transparent opacity-50 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>

                            {/* College Header */}
                            <div className="flex justify-between items-start mb-8 relative z-10">
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 bg-gray-900 rounded-[1.5rem] flex items-center justify-center text-white text-2xl font-black shadow-md group-hover:bg-jcs-deep transition-colors duration-300 shrink-0">
                                        {col.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-gray-900 tracking-tight mb-1.5">{col.name}</h3>
                                        <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                            <span className="flex items-center gap-1.5"><FiMapPin size={12} className="text-gray-300" /> {col.city}, {col.state}</span>
                                            <span className="flex items-center gap-1.5"><FiAward size={12} className="text-gray-300" /> {col.type}</span>
                                        </div>
                                    </div>
                                </div>
                                {user?.role === 'super-admin' && (
                                    <button onClick={() => { setEditingCol({ ...col }); setShowEditModal(true); }} className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all shadow-sm shrink-0">
                                        <FiSettings size={18} />
                                    </button>
                                )}
                            </div>

                            {col.estimatedDonation && (
                                <div className="bg-green-50/50 border border-green-100 rounded-xl p-3 flex items-center gap-3 mb-6 w-max relative z-10">
                                    <div className="bg-green-100 text-green-600 p-2 rounded-lg"><FiDollarSign size={16} /></div>
                                    <div>
                                        <span className="text-[10px] font-black text-green-600/70 uppercase tracking-widest block">Est. Donation</span>
                                        <span className="text-sm font-bold text-green-800">{col.estimatedDonation}</span>
                                    </div>
                                </div>
                            )}

                            {/* 🟢 PER-COURSE INVENTORY TRACKER */}
                            <div className="flex-1 flex flex-col gap-4 relative z-10">
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Course Quotas</h4>
                                {col.programs.map(prog => {
                                    const percentage = prog.totalSeats > 0 ? (prog.availableSeats / prog.totalSeats) * 100 : 0;
                                    const isLow = percentage <= 20 && prog.availableSeats > 0;
                                    const isSoldOut = prog.availableSeats === 0;

                                    return (
                                        <div key={prog._id} className="p-5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all duration-300">
                                            <div className="flex justify-between items-center mb-4">
                                                <h4 className="font-bold text-gray-800 text-sm tracking-wide">{prog.name}</h4>

                                                {/* Seat Adjustment Controls */}
                                                <div className={`flex items-center gap-1 bg-white p-1 rounded-xl shadow-sm border ${isSoldOut ? 'border-red-100' : 'border-gray-200'}`}>
                                                    <button
                                                        onClick={() => handleSeatAdjustment(col._id, prog._id, 1)} // Deduct Seat
                                                        disabled={isSoldOut || user?.role !== 'super-admin'}
                                                        className="w-8 h-8 rounded-lg bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-500 disabled:opacity-30 disabled:hover:bg-gray-50 transition-colors flex items-center justify-center"
                                                    >
                                                        <FiMinus size={16} />
                                                    </button>

                                                    <div className="w-12 text-center flex flex-col justify-center">
                                                        {isSoldOut ? (
                                                            <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">Full</span>
                                                        ) : (
                                                            <span className={`font-black text-base leading-none ${isLow ? 'text-orange-500' : 'text-gray-900'}`}>
                                                                {prog.availableSeats}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <button
                                                        onClick={() => handleSeatAdjustment(col._id, prog._id, -1)} // Add/Refund Seat
                                                        disabled={prog.availableSeats >= prog.totalSeats || user?.role !== 'super-admin'}
                                                        className="w-8 h-8 rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-200 hover:text-gray-900 disabled:opacity-30 disabled:hover:bg-gray-50 transition-colors flex items-center justify-center"
                                                    >
                                                        <FiPlus size={16} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="flex items-center gap-4">
                                                <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-700 ease-out ${isSoldOut ? 'bg-red-500' : isLow ? 'bg-orange-400' : 'bg-jcs-brand'}`}
                                                        style={{ width: `${percentage}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest w-12 text-right">
                                                    {prog.totalSeats} Max
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* 🟢 Add College Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 max-w-xl w-full shadow-2xl animate-fade-in-up border border-white/20 relative overflow-hidden max-h-[90vh] overflow-y-auto hide-scrollbar">
                        <button onClick={() => setShowAddModal(false)} className="absolute top-6 right-6 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors z-10"><FiX size={20} /></button>
                        <div className="mb-8">
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">New Institution</h2>
                            <p className="text-gray-500 text-sm font-medium">Add a college and define its course-specific quotas.</p>
                        </div>
                        <form onSubmit={handleAddCollege} className="space-y-4 relative z-10">
                            <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">College Name</label><input type="text" required value={newCol.name} onChange={(e) => setNewCol({ ...newCol, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 font-bold text-sm focus:border-gray-400 focus:outline-none" /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">City</label><input type="text" required value={newCol.city} onChange={(e) => setNewCol({ ...newCol, city: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 font-bold text-sm focus:border-gray-400 focus:outline-none" /></div>
                                <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">State</label><input type="text" required value={newCol.state} onChange={(e) => setNewCol({ ...newCol, state: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 font-bold text-sm focus:border-gray-400 focus:outline-none" /></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Type</label>
                                    <select value={newCol.type} onChange={(e) => setNewCol({ ...newCol, type: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 font-bold text-sm focus:border-gray-400 focus:outline-none"><option>Private University</option><option>Deemed-to-be University</option><option>State University</option></select>
                                </div>
                                <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Est. Donation</label><input type="text" value={newCol.estimatedDonation} onChange={(e) => setNewCol({ ...newCol, estimatedDonation: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-green-50 border border-green-100 font-bold text-green-800 text-sm focus:border-green-400 focus:outline-none" placeholder="e.g. ₹15L - ₹20L" /></div>
                            </div>

                            {/* Dynamic Program Inputs */}
                            <div className="pt-4 border-t border-gray-100 mt-4">
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Course Quotas</h4>
                                {newCol.programs.map((prog, index) => (
                                    <div key={index} className="flex gap-3 mb-3 items-center">
                                        <input type="text" placeholder="Course (e.g. MBBS)" required value={prog.name} onChange={(e) => handleProgramChange(index, 'name', e.target.value)} className="flex-1 px-4 py-3 rounded-xl bg-white border border-gray-200 font-bold text-sm focus:border-gray-400 focus:outline-none" />
                                        <input type="number" placeholder="Seats" required min="1" value={prog.totalSeats} onChange={(e) => handleProgramChange(index, 'totalSeats', e.target.value)} className="w-24 px-4 py-3 rounded-xl bg-white border border-gray-200 font-black text-sm text-center focus:border-gray-400 focus:outline-none" />
                                        {index > 0 && <button type="button" onClick={() => removeProgramRow(index)} className="p-3 text-red-400 hover:text-red-600 bg-red-50 rounded-xl"><FiTrash2 /></button>}
                                    </div>
                                ))}
                                <button type="button" onClick={() => addProgramRow(false)} className="text-xs font-black text-jcs-brand hover:text-jcs-deep flex items-center gap-1 mt-2 uppercase tracking-wider"><FiPlus /> Add Another Course</button>
                            </div>
                            <button type="submit" className="w-full bg-gray-900 text-white font-extrabold py-4 rounded-xl hover:bg-jcs-deep transition-all shadow-md mt-6">Save College</button>
                        </form>
                    </div>
                </div>
            )}

            {/* 🟢 Edit College Modal (Similar logic for brevity) */}
            {showEditModal && editingCol && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 max-w-xl w-full shadow-2xl animate-fade-in-up border border-white/20 relative overflow-hidden max-h-[90vh] overflow-y-auto hide-scrollbar">
                        <button onClick={() => setShowEditModal(false)} className="absolute top-6 right-6 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors z-10"><FiX size={20} /></button>
                        <div className="mb-8">
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Edit {editingCol.name}</h2>
                        </div>
                        <form onSubmit={handleEditSubmit} className="space-y-4 relative z-10">
                            <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">College Name</label><input type="text" required value={editingCol.name} onChange={(e) => setEditingCol({ ...editingCol, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 font-bold text-sm focus:border-gray-400 focus:outline-none" /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">City</label><input type="text" required value={editingCol.city} onChange={(e) => setEditingCol({ ...editingCol, city: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 font-bold text-sm focus:border-gray-400 focus:outline-none" /></div>
                                <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">State</label><input type="text" required value={editingCol.state} onChange={(e) => setEditingCol({ ...editingCol, state: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 font-bold text-sm focus:border-gray-400 focus:outline-none" /></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Type</label>
                                    <select value={editingCol.type} onChange={(e) => setEditingCol({ ...editingCol, type: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 font-bold text-sm focus:border-gray-400 focus:outline-none"><option>Private University</option><option>Deemed-to-be University</option><option>State University</option></select>
                                </div>
                                <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Est. Donation</label><input type="text" value={editingCol.estimatedDonation} onChange={(e) => setEditingCol({ ...editingCol, estimatedDonation: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-green-50 border border-green-100 font-bold text-green-800 text-sm focus:border-green-400 focus:outline-none" /></div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 mt-4">
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Course Quotas</h4>
                                {editingCol.programs.map((prog, index) => (
                                    <div key={index} className="flex gap-3 mb-3 items-center">
                                        <input type="text" placeholder="Course (e.g. MBBS)" required value={prog.name} onChange={(e) => handleProgramChange(index, 'name', e.target.value, true)} className="flex-1 px-4 py-3 rounded-xl bg-white border border-gray-200 font-bold text-sm focus:border-gray-400 focus:outline-none" />
                                        <input type="number" placeholder="Total Seats" required min="1" value={prog.totalSeats} onChange={(e) => handleProgramChange(index, 'totalSeats', e.target.value, true)} className="w-24 px-4 py-3 rounded-xl bg-white border border-gray-200 font-black text-sm text-center focus:border-gray-400 focus:outline-none" />
                                        {/* Note: Cannot remove existing programs easily here without handling availableSeats logic, so just allowing editing or adding new ones */}
                                        <button type="button" onClick={() => removeProgramRow(index, true)} className="p-3 text-red-400 hover:text-red-600 bg-red-50 rounded-xl"><FiTrash2 /></button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => addProgramRow(true)} className="text-xs font-black text-jcs-brand hover:text-jcs-deep flex items-center gap-1 mt-2 uppercase tracking-wider"><FiPlus /> Add Another Course</button>
                            </div>

                            <button type="submit" className="w-full bg-gray-900 text-white font-extrabold py-4 rounded-xl hover:bg-jcs-deep transition-all shadow-md mt-6">Save Changes</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CollegeInventory;