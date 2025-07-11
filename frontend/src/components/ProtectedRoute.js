import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    // Redirect to login, preserving the current location for after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};
// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem('token');
//   return token ? children : <Navigate to="/login" />;
// };

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem('token');
//   const isAuthenticated = !!token;

//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

export default ProtectedRoute;