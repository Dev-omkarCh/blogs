// src/components/AppInitializer.tsx (or src/context/AuthContext.tsx)

import type { RootState } from '@/app/store';
import axiosInstance from '@/lib/utils';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
// Assuming useAuth gives you access to the Redux/Context state and dispatch functions

const AppInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Access the state/dispatch functions
    const authUser = useSelector((state: RootState)=> state.authUser);
    
    // 💡 This is the CORRECT place for the token refresh logic 
    // because it runs ONLY when the component first mounts (or when dependencies change).
    useEffect(() => {
        const tryRehydrateSession = async () => {
            // ... (Your existing logic) ...
            console.log(authUser);
            if (authUser) {
                try {
                    // 1. Hit the refresh endpoint (browser sends HTTP-Only cookie)
                    const response = await axiosInstance.get('/api/auth/refresh');
                    
                    const newAccessToken = response.data.accessToken;
                    console.log("newAccessToken", newAccessToken);
                    
                } catch (error) {
                    console.log("Could not rehydrate session, refresh token invalid or expired.");
                } finally {
                    // 3. IMPORTANT: Stop the loading state regardless of success/failure
                    
                }
            } else {
                // If isAuthenticated is true (e.g., first login, no refresh needed yet)
                
            }
        };

        // You should check if the loading state is still true before initiating a refresh
        // This prevents unnecessary calls if a manual logout occurred right before the check
        // if (initial check shows store is empty and loading is true) {
             tryRehydrateSession();
        // }
    }, []); // Removed isAuthenticated from dependencies to avoid loop

    return children;
};

export default AppInitializer;