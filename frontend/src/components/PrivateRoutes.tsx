import { store, type RootState } from '@/app/store';
import { setCredentials } from '@/features/auth/authSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';

const PrivateRoute = () => {
  const { isAuthenticated, token } = useSelector((state: RootState) => state.authUser);
  const [isInitializing, setIsInitializing] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      // Only attempt refresh if we don't have an access token in Redux
      console.log(token);
      if (!token) {
        try {
          const response = await axios.get('/api/auth/refresh');
          console.log(response.data.accessToken);
          console.log(response.data.user);
          dispatch(setCredentials({ 
            accessToken: response.data.accessToken, 
            isAuthenticated: true,
            user: response.data.user
          }));
          setIsInitializing(false); // Validation is done
          return;
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