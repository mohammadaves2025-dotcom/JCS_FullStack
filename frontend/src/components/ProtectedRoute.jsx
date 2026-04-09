import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useContext(AuthContext);

    // 1. While we are checking if the user is logged in, show nothing or a spinner
    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-jcs-brand"></div>
            </div>
        );
    }

    // 2. If not logged in at all, kick them to login page
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // 3. If logged in but role isn't allowed (e.g. Student trying to see Admin)
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // If an admin accidentally hits a student route, or vice-versa, redirect to their home
        return user.role === 'student' ? <Navigate to="/portal" replace /> : <Navigate to="/admin" replace />;
    }

    // 4. Everything is fine, let them in!
    return children;
};

export default ProtectedRoute;