import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { FiFolder, FiDollarSign, FiUploadCloud, FiFileText, FiCheckCircle, FiX, FiExternalLink, FiCamera, FiTarget, FiBookOpen, FiUser, FiPhone, FiMail } from 'react-icons/fi';

const CustomerDashboard = ({ client, onClose, refreshClients }) => {
    const { user } = useContext(AuthContext);
    
    const [uploadingDoc, setUploadingDoc] = useState(false);
    const [customDocName, setCustomDocName] = useState('');
    
    // Editable States
    const [editFinancials, setEditFinancials] = useState({ totalAgreedAmount: 0, amountPaid: 0 });
    const [editColleges, setEditColleges] = useState('');
    const [editCourse, setEditCourse] = useState('');
    const [admissionStatus, setAdmissionStatus] = useState('');

    useEffect(() => {
        if (client) {
            setEditFinancials({
                totalAgreedAmount: client.financials?.totalAgreedAmount || 0,
                amountPaid: client.financials?.amountPaid || 0
            });
            setEditColleges(client.targetColleges?.join(', ') || '');
            setEditCourse(client.targetCourse || '');
            setAdmissionStatus(client.admissionStatus || 'Documents Pending');
        }
    }, [client]);

    const saveClientDetails = async (updates, silent = false) => {
        try {
            await axios.put(`/api/clients/${client._id}`, updates, { withCredentials: true });
            refreshClients(); 
            if (!silent) alert("Profile updated successfully!");
        } catch (error) {
            alert("Failed to update client profile.");
        }
    };

    const handleFileUpload = async (e, docType, isProfilePic = false) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!isProfilePic && docType === 'Custom' && !customDocName.trim()) {
            return alert("Please enter a name for this custom document!");
        }

        const formData = new FormData();
        formData.append('document', file);

        setUploadingDoc(true);
        try {
            const uploadRes = await axios.post('/api/upload', formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (isProfilePic) {
                await saveClientDetails({ profilePhoto: uploadRes.data.url }, true);
            } else {
                const finalDocName = docType === 'Custom' ? customDocName : docType;
                const newDoc = { docType: finalDocName, url: uploadRes.data.url, public_id: uploadRes.data.public_id };
                const updatedDocs = [...(client.documents || []), newDoc];
                
                await saveClientDetails({ documents: updatedDocs }, true);
                setCustomDocName(''); 
            }
        } catch (error) {
            console.error(error);
            alert("Upload failed. Check file size (Max 5MB).");
        } finally {
            setUploadingDoc(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-gray-900/70 backdrop-blur-sm">
            <div className="bg-gray-50 rounded-[2rem] w-full max-w-7xl h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-fade-in-up border border-white/20">
                
                {/* 🟢 Premium Header */}
                <div className="px-8 py-6 bg-white border-b border-gray-200 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-6">
                        {/* Avatar */}
                        <div className="relative group/avatar cursor-pointer w-16 h-16 shrink-0">
                            {client.profilePhoto ? (
                                <img src={client.profilePhoto} alt="Profile" className="w-full h-full rounded-2xl object-cover shadow-sm border border-gray-100" />
                            ) : (
                                <div className="w-full h-full rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
                                    <FiUser size={24} />
                                </div>
                            )}
                            <label className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center text-white transition-opacity cursor-pointer backdrop-blur-sm">
                                <FiCamera size={20} />
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'photo', true)} disabled={uploadingDoc} />
                            </label>
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight">{client.name}</h2>
                            <div className="flex gap-4 mt-1 text-sm font-semibold text-gray-500">
                                <span className="flex items-center gap-1.5"><FiPhone className="text-gray-400"/> {client.phone}</span>
                                {client.email && <span className="flex items-center gap-1.5"><FiMail className="text-gray-400"/> {client.email}</span>}
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <select 
                            value={admissionStatus} 
                            onChange={(e) => {
                                setAdmissionStatus(e.target.value);
                                saveClientDetails({ admissionStatus: e.target.value }, true);
                            }}
                            className={`px-4 py-2.5 rounded-xl font-bold text-sm border-0 shadow-sm cursor-pointer focus:ring-4 focus:ring-jcs-brand/20 transition-all ${
                                admissionStatus === 'Seat Confirmed' ? 'bg-green-100 text-green-700' : 'bg-white text-gray-700 border border-gray-200'
                            }`}
                        >
                            <option>Documents Pending</option>
                            <option>Documents Verified</option>
                            <option>College Applied</option>
                            <option>Seat Confirmed</option>
                        </select>
                        <button onClick={onClose} className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors shadow-sm">
                            <FiX size={20} />
                        </button>
                    </div>
                </div>

                {/* 🟢 Body Grid */}
                <div className="flex-1 overflow-y-auto p-8 hide-scrollbar">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
                        
                        {/* COLUMN 1: Academic Profile */}
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-5 flex items-center gap-2"><FiBookOpen /> Academic Targets</h3>
                                
                                {/* Opted Course */}
                                <div className="mb-6">
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Opted Course</label>
                                    <div className="flex gap-2">
                                        <input 
                                            type="text" value={editCourse} onChange={(e) => setEditCourse(e.target.value)} placeholder="e.g. B.Tech CSE"
                                            className="flex-1 p-3 rounded-xl border border-gray-200 bg-gray-50 font-semibold text-sm focus:outline-none focus:border-jcs-brand focus:ring-1 focus:ring-jcs-brand"
                                        />
                                        <button onClick={() => saveClientDetails({ targetCourse: editCourse })} className="bg-gray-900 text-white px-4 rounded-xl font-bold hover:bg-jcs-brand transition-colors text-sm">Save</button>
                                    </div>
                                </div>

                                {/* Target Colleges */}
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Target Colleges (Comma Separated)</label>
                                    <div className="flex gap-2">
                                        <input 
                                            type="text" value={editColleges} onChange={(e) => setEditColleges(e.target.value)} placeholder="e.g. Amity, Sharda"
                                            className="flex-1 p-3 rounded-xl border border-gray-200 bg-gray-50 font-semibold text-sm focus:outline-none focus:border-jcs-brand focus:ring-1 focus:ring-jcs-brand"
                                        />
                                        <button onClick={() => saveClientDetails({ targetColleges: editColleges.split(',').map(c => c.trim()) })} className="bg-gray-900 text-white px-4 rounded-xl font-bold hover:bg-jcs-brand transition-colors text-sm">Save</button>
                                    </div>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {client.targetColleges?.map((college, i) => (
                                            <span key={i} className="bg-jcs-brand/10 text-jcs-brand text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider">{college}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Financial Ledger (Super Admin) */}
                            {user?.role === 'super-admin' && (
                                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-jcs-brand/5 rounded-full blur-2xl"></div>
                                    <h3 className="text-xs font-black text-jcs-deep uppercase tracking-widest mb-5 flex items-center gap-2 relative z-10"><FiDollarSign /> Financial Ledger</h3>
                                    
                                    <div className="space-y-4 mb-5 relative z-10">
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Total Agreed Fee (₹)</label>
                                            <input type="number" value={editFinancials.totalAgreedAmount} onChange={(e) => setEditFinancials({...editFinancials, totalAgreedAmount: e.target.value})} className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 font-black text-gray-900" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Amount Collected (₹)</label>
                                            <input type="number" value={editFinancials.amountPaid} onChange={(e) => setEditFinancials({...editFinancials, amountPaid: e.target.value})} className="w-full p-3 rounded-xl bg-green-50 border border-green-200 font-black text-green-700" />
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-100 relative z-10 mb-4">
                                        <span className="text-xs font-bold text-gray-500">Balance Due:</span>
                                        <span className="text-lg font-black text-red-500">₹{(editFinancials.totalAgreedAmount - editFinancials.amountPaid).toLocaleString('en-IN')}</span>
                                    </div>

                                    <button onClick={() => saveClientDetails({ financials: editFinancials })} className="w-full bg-jcs-deep text-white font-extrabold py-3 rounded-xl shadow-md hover:bg-gray-900 transition-colors relative z-10">
                                        Update Ledger
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* COLUMN 2 & 3: Document Vault */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col h-full">
                            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><FiFolder /> Document Vault</h3>
                                {uploadingDoc && <span className="text-[10px] font-black text-jcs-brand animate-pulse bg-jcs-brand/10 px-3 py-1.5 rounded-full uppercase">Encrypting & Uploading...</span>}
                            </div>
                            
                            <div className="flex-1 overflow-y-auto pr-2 hide-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Uploaded Documents */}
                                    {client.documents?.map((doc, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 rounded-2xl border border-green-100 bg-green-50/50 hover:bg-green-50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center"><FiCheckCircle size={18} /></div>
                                                <span className="font-bold text-sm text-gray-900 truncate max-w-[120px]" title={doc.docType}>{doc.docType}</span>
                                            </div>
                                            <a href={doc.url} target="_blank" rel="noreferrer" className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-white px-3 py-1.5 rounded-lg border border-blue-100 hover:bg-blue-50 transition-colors flex items-center gap-1.5">
                                                Open <FiExternalLink size={12}/>
                                            </a>
                                        </div>
                                    ))}

                                    {/* Missing Core Documents */}
                                    {['10th Marksheet', '12th Marksheet', 'Aadhar Card', 'Passport Photo'].filter(type => !client.documents?.some(d => d.docType === type)).map(docType => (
                                        <div key={docType} className="flex items-center justify-between p-4 rounded-2xl border border-dashed border-gray-300 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-gray-400 flex items-center justify-center"><FiFileText size={18} /></div>
                                                <span className="font-bold text-sm text-gray-500">{docType}</span>
                                            </div>
                                            <label className="cursor-pointer text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:border-jcs-brand hover:text-jcs-brand shadow-sm transition-all">
                                                Upload
                                                <input type="file" accept=".pdf, image/*" className="hidden" onChange={(e) => handleFileUpload(e, docType)} disabled={uploadingDoc} />
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Custom Document Uploader */}
                            <div className="mt-6 pt-5 border-t border-gray-100 bg-gray-50 p-4 rounded-2xl">
                                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Upload Additional Document</h4>
                                <div className="flex gap-3">
                                    <input 
                                        type="text" value={customDocName} onChange={(e) => setCustomDocName(e.target.value)} 
                                        placeholder="e.g. Migration Certificate" 
                                        className="flex-1 p-3 rounded-xl bg-white border border-gray-200 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-jcs-brand/20" 
                                    />
                                    <label className={`cursor-pointer flex items-center justify-center gap-2 px-5 rounded-xl font-bold text-sm transition-all ${customDocName ? 'bg-gray-900 text-white hover:bg-jcs-brand shadow-md' : 'bg-gray-200 text-gray-400 pointer-events-none'}`}>
                                        <FiUploadCloud size={16} /> Browse
                                        <input type="file" accept=".pdf, image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'Custom')} disabled={uploadingDoc || !customDocName} />
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;