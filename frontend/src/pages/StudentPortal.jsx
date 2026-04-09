import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiCheckCircle, FiUploadCloud, FiFileText, FiDollarSign, FiAward, FiBookOpen, FiShield, FiArrowLeft, FiLogOut } from 'react-icons/fi';

const StudentPortal = () => {
    const { user, logoutAdmin } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploadingDoc, setUploadingDoc] = useState(false);
    const navigate = useNavigate();

    const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    useEffect(() => {
        fetchMyProfile();
    }, []);

    const fetchMyProfile = async () => {
        try {
            const { data } = await axios.get(backendURL + '/api/clients/my-profile', { withCredentials: true });
            setProfile(data);
        } catch (error) {
            console.error("Error fetching profile", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e, docType) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('document', file);
        setUploadingDoc(true);

        try {
            const uploadRes = await axios.post(backendURL + '/api/upload', formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const newDoc = { docType, url: uploadRes.data.url, public_id: uploadRes.data.public_id };
            const { data } = await axios.put(backendURL + '/api/clients/my-profile/documents', { document: newDoc }, { withCredentials: true });

            setProfile(data);
            alert(`${docType} uploaded successfully!`);
        } catch (error) {
            alert("Upload failed. Please ensure the file is under 5MB.");
        } finally {
            setUploadingDoc(false);
        }
    };

    const handleLogout = async () => {
        await logoutAdmin();
        navigate('/login');
    };

    const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

    if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-[3px] border-b-[3px] border-jcs-brand"></div></div>;

    if (!profile) return (
        <div className="flex flex-col justify-center items-center h-[80vh] text-center px-4">
            <FiShield size={64} className="text-gray-300 mb-4" />
            <h2 className="text-2xl font-black text-gray-900 mb-2">Profile Not Found</h2>
            <p className="text-gray-500 font-medium">Your admission profile is still being generated. Please check back later or contact your counselor.</p>
            <Link to="/" className="mt-6 px-6 py-3 bg-jcs-deep text-white rounded-xl font-bold flex items-center gap-2 hover:bg-gray-900 transition-colors">
                <FiArrowLeft /> Return to Homepage
            </Link>
        </div>
    );

    const statuses = ["Documents Pending", "Documents Verified", "College Applied", "Seat Confirmed"];
    const currentStep = statuses.indexOf(profile.admissionStatus || "Documents Pending");

    // Dynamic Required Documents (Falls back to default 3 if admin hasn't set any)
    const requiredDocsList = profile.requiredDocuments?.length > 0 ? profile.requiredDocuments : ['10th Marksheet', '12th Marksheet', 'Aadhar Card'];

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in-up">

            {/* Top Navigation Bar */}
            <div className="flex justify-between items-center mb-6">
                <Link to="/" className="text-sm font-bold text-gray-500 hover:text-jcs-deep transition-colors flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
                    <FiArrowLeft /> Back to Homepage
                </Link>
                
                <button 
                    onClick={handleLogout}
                    className="text-sm font-bold text-red-500 hover:text-white hover:bg-red-500 transition-colors flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100"
                >
                    <FiLogOut /> Logout
                </button>
            </div>

            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 to-jcs-deep rounded-[2rem] p-8 text-white shadow-xl mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-black mb-1">Welcome, {profile.name.split(' ')[0]}!</h1>
                    <p className="text-white/70 font-medium flex items-center gap-2">
                        <FiAward className="text-jcs-brand" /> Admission Portal
                    </p>
                </div>
            </div>

            {/* Admission Status Stepper */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 mb-8">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Live Admission Tracker</h3>
                <div className="relative flex flex-col md:flex-row justify-between gap-6 md:gap-0">
                    <div className="hidden md:block absolute top-6 left-0 w-full h-1 bg-gray-100 rounded-full z-0"></div>

                    {statuses.map((status, index) => {
                        const isCompleted = index <= currentStep;
                        const isCurrent = index === currentStep;
                        return (
                            <div key={status} className="relative z-10 flex md:flex-col items-center gap-4 md:gap-3 flex-1">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black transition-all ${isCompleted ? 'bg-jcs-brand text-jcs-deep shadow-[0_0_15px_rgba(0,208,132,0.4)]' : 'bg-gray-50 border-2 border-gray-200 text-gray-400'}`}>
                                    {isCompleted ? <FiCheckCircle size={20} /> : index + 1}
                                </div>
                                <div className="text-left md:text-center">
                                    <p className={`font-bold text-sm ${isCurrent ? 'text-jcs-deep' : isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>{status}</p>
                                    {isCurrent && <span className="text-[10px] font-black text-jcs-brand uppercase tracking-widest mt-1 block animate-pulse">Current Status</span>}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Academic & Financial Info */}
                <div className="space-y-8">
                    
                    {/* Personal Details Card */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2"><FiShield /> Personal Details</h3>
                        <div className="space-y-4">
                            <div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Blood Group</span>
                                <span className="font-black text-red-500 text-lg">{profile.bloodGroup || 'Not Provided'}</span>
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Permanent Address</span>
                                <span className="font-bold text-gray-800 text-sm">{profile.address || 'Please contact admin to update address.'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Academic Target Card */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2"><FiBookOpen /> Your Target</h3>
                        <div className="mb-4">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Opted Course</p>
                            <p className="font-black text-xl text-gray-900">{profile.targetCourse || 'To be finalized'}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Target Colleges</p>
                            <div className="flex flex-wrap gap-2">
                                {profile.targetColleges?.length > 0 ? profile.targetColleges.map((col, i) => (
                                    <span key={i} className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1.5 rounded-lg border border-blue-100">{col}</span>
                                )) : <span className="text-sm font-bold text-gray-500">Discussing with counselor</span>}
                            </div>
                        </div>
                    </div>

                    {/* Financial Summary Card */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2"><FiDollarSign /> Financial Summary</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                                <span className="font-bold text-gray-500 text-sm">Total Processing Fee</span>
                                <span className="font-black text-gray-900">{formatCurrency(profile.financials?.totalAgreedAmount || 0)}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                                <span className="font-bold text-gray-500 text-sm">Amount Paid</span>
                                <span className="font-black text-green-600">{formatCurrency(profile.financials?.amountPaid || 0)}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <span className="font-black text-gray-900 text-sm">Balance Due</span>
                                <span className="font-black text-red-500 text-xl">{formatCurrency((profile.financials?.totalAgreedAmount || 0) - (profile.financials?.amountPaid || 0))}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Document Upload Vault */}
                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><FiUploadCloud /> Your Documents</h3>
                        {uploadingDoc && <span className="text-[10px] font-black text-jcs-brand animate-pulse bg-jcs-brand/10 px-3 py-1.5 rounded-full uppercase">Uploading...</span>}
                    </div>

                    <div className="flex-1 space-y-4">
                        {/* Uploaded Documents */}
                        {profile.documents?.map((doc, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-green-100 bg-green-50/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center"><FiCheckCircle size={18} /></div>
                                    <span className="font-bold text-sm text-gray-900">{doc.docType}</span>
                                </div>
                            </div>
                        ))}

                        {/* Missing Documents Request (Dynamic) */}
                        {requiredDocsList.filter(type => !profile.documents?.some(d => d.docType === type)).map(docType => (
                            <div key={docType} className="flex items-center justify-between p-4 rounded-xl border border-dashed border-red-200 bg-red-50/30">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-white border border-red-100 text-red-400 flex items-center justify-center"><FiFileText size={18} /></div>
                                    <div>
                                        <span className="font-bold text-sm text-red-900 block">{docType}</span>
                                        <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Required</span>
                                    </div>
                                </div>
                                <label className="cursor-pointer text-xs font-black uppercase tracking-wider px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 shadow-sm transition-all">
                                    Upload
                                    <input type="file" accept=".pdf, image/*" className="hidden" onChange={(e) => handleFileUpload(e, docType)} disabled={uploadingDoc} />
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentPortal;