import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { currentUser } = useAuth();

  // Log the current user to see if it is being set
  console.log('Current User in ProtectedRoute:', currentUser);

  return currentUser ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default ProtectedRoute;
