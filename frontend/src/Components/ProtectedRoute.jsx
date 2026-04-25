import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdmin }) => {
    const token = localStorage.getItem('auth-token');
    const role = localStorage.getItem('user-role');

    if (!token) {
        // Not logged in
        return <Navigate to="/login" />;
    }

    if (isAdmin && role !== 'admin') {
        // Logged in but not an admin trying to access admin route
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
