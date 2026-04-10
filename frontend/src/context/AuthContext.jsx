import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    // Restore session on page refresh
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('jcs_admin_info');
            if (storedUser) {
                // ✅ Wrapped in try/catch — corrupted localStorage won't crash the app
                const parsed = JSON.parse(storedUser);
                if (parsed && parsed._id && parsed.role) {
                    setUser(parsed);
                    if (parsed.token) {
                        axios.defaults.headers.common['Authorization'] = `Bearer ${parsed.token}`;
                    }
                } else {
                    // Data is malformed — clear it
                    localStorage.removeItem('jcs_admin_info');
                }
            }
        } catch (err) {
            console.warn('Failed to restore session from localStorage. Clearing.', err);
            localStorage.removeItem('jcs_admin_info');
        } finally {
            setLoading(false);
        }
    }, []);

    const loginAdmin = async (email, password) => {
        try {
            const { data } = await axios.post(
                backendURL + '/api/users/login',
                { email: email.trim().toLowerCase(), password },
                { withCredentials: true }
            );
            setUser(data);
            localStorage.setItem('jcs_admin_info', JSON.stringify(data));
            if (data.token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            }
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed. Please try again.',
            };
        }
    };

    const logoutAdmin = async () => {
        try {
            await axios.post(backendURL + '/api/users/logout', {}, { withCredentials: true });
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
