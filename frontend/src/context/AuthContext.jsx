import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    // Restore session on page refresh
    useEffect(() => {
        const storedUser = localStorage.getItem('jcs_admin_info');
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUser(parsed);
            // Re-attach Authorization header if token exists
            if (parsed.token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${parsed.token}`;
            }
        }
        setLoading(false);
    }, []);

    const loginAdmin = async (email, password) => {
        try {
            const { data } = await axios.post(backendURL + '/api/users/login', { email, password });
            setUser(data);
            localStorage.setItem('jcs_admin_info', JSON.stringify(data));
            // Set Bearer token globally for all subsequent axios requests
            if (data.token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            }
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
        } catch (error) {
            console.error('Logout error', error);
        } finally {
            setUser(null);
            localStorage.removeItem('jcs_admin_info');
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    return (
        <AuthContext.Provider value={{ user, loginAdmin, logoutAdmin, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
