import { logout, selectCurrentToken, selectCurrentUser, setCredentials } from "@/features/auth/authSlice";
import type { AuthUser } from "@/types/Signup";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Credentials{
    user: AuthUser | null, 
    accessToken: string
}

export const useAuth = () => {
    const user = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);
    const dispatch = useDispatch();

    const login = async(credentials : Credentials) => {

        return { 
            data: {
                user : null, 
                accessToken: ""
            }
        }
    };

    const isAuthenticated = !!user && !!token;

    // A wrapper function for the actual login logic (using RTK Query or Thunk)
    const doLogin = async (credentials : { user: AuthUser, accessToken: string}) => {
        // 1. Call your RTK Query login mutation or an asyncThunk
        try {
             // Example using a hypothetical RTK Query mutation hook
             const { data } = await login(credentials);
             
             // 2. Dispatch the Redux action to update the state
             dispatch(setCredentials({ user: data.user, accessToken: data.accessToken }));
             return data;

        } catch (error) {
             console.error("Login failed:", error);
             throw error; // Re-throw to handle in the component
        }
    };
    
    // A wrapper function for logout
    const doLogout = () => {
        dispatch(logout());
        // You might also call an RTK Query endpoint here to invalidate the refresh token on the server.
    }; 

    return { 
        user, 
        token, 
        isAuthenticated, 
        doLogin, 
        doLogout,
        // Add loading/error states from your RTK Query mutation here if needed
    };
};