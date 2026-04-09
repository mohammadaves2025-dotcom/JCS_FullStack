import React, { createContext, useState } from 'react';
import axios from 'axios';

export const LeadContext = createContext();

export const LeadProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    const submitLead = async (formData) => {
        setLoading(true);
        setErrorMsg('');
        setSuccessMsg('');

        try {
            // Pointing to the backend route we built earlier
            const response = await axios.post(backendURL + '/api/inquiries/', formData);
            setSuccessMsg("Application received! Our counselor will contact you shortly.");
            return true; // Tells the component the submission worked
        } catch (error) {
            setErrorMsg(error.response?.data?.message || "Something went wrong. Please try again.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return (
        <LeadContext.Provider value={{ submitLead, loading, successMsg, errorMsg }}>
            {children}
        </LeadContext.Provider>
    );
};