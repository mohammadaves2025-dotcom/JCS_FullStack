import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    // Check if admin is already logged in when they refresh the page
    useEffect(() => {
        const storedUser = localStorage.getItem('jcs_admin_info');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const loginAdmin = async (email, password) => {
        try {
            // Points to the backend auth route we built
            const { data } = await axios.post(backendURL + '/api/users/login', { email, password });
            setUser(data);
            localStorage.setItem('jcs_admin_info', JSON.stringify(data));
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const logoutAdmin = async () => {
        try {
            await axios.post(backendURL + '/api/users/logout');
            setUser(null);
            localStorage.removeItem('jcs_admin_info');
        } catch (error) {
            console.error('Logout error', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loginAdmin, logoutAdmin, loading }}>
            {children}
        </AuthContext.Provider>
    );
};