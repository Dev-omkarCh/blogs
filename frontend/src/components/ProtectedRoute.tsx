// src/components/ProtectedRoute.tsx

import type { RootState } from '@/app/store';
import axiosInstance from '@/lib/utils';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';// Assuming you have your RootState type

const ProtectedRoute = () => {
  // 1. Get Authentication State from Redux
  const accessToken = useSelector((state: RootState) => state.accessToken);
  const isLoading = false;
  
  const location = useLocation(); // To remember the attempted path

  // Handle Loading State (Session Rehydration Check)
  if (isLoading) {
    // Show a global spinner or loading screen while the app checks for the Refresh Token
    return <div>Loading session...</div>; 
  }

  // 3. Determine Authentication Status
  const isAuthenticated = !!accessToken;

  // If authenticated, render the child routes (e.g., Dashboard)
  if (isAuthenticated) {
    return <Outlet />;
  } 
  
  const fetchRefreshToken = async() =>{
    const response = await axiosInstance.get("/api/auth/refresh");
    console.log(response.data);
  }

  useEffect(()=>{
    fetchRefreshToken();
  },[]);
  
  // If NOT authenticated, redirect to the login page
  // The 'state' property allows the login page to redirect the user back 
  // to '/dashboard' after they successfully log in.
  return <Navigate to="/login" replace state={{ from: location }} />;
};

export default ProtectedRoute;