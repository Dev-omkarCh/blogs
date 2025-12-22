import type { RootState } from '@/app/store';
import { setCredentials } from '@/features/auth/authSlice';
import axiosInstance from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const PrivateRoute = () => {
  const { isAuthenticated, token : accessToken } = useSelector((state: RootState) => state.authUser);
  const [isInitializing, setIsInitializing] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      // Only attempt refresh if we don't have an access token in Redux
      if (!accessToken) {
        try {
          const response = await axiosInstance.get('/api/auth/refresh');
          dispatch(setCredentials({ 
            accessToken: response.data.accessToken, 
            isAuthenticated: true 
          }));
        } catch (error) {
          // Refresh token was invalid or missing; stay logged out
          dispatch(setCredentials({ isAuthenticated: false }));
        }
      }
      setIsInitializing(false); // Validation is done
    };

    initializeAuth();
  }, []);

  if (isInitializing) {
    return <LoadingSpinner size='100' />; // Don't redirect yet!
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;