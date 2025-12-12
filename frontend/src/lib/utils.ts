import { store, type RootState } from "@/app/store";
import axios, { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useDispatch } from "react-redux";
import { setCredentials, logout } from "@/features/auth/authSlice";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/', // Your backend API entry point
  headers: {
    'Content-Type': 'application/json',
  },
  // Crucial: This setting ensures that the browser includes the HTTP-Only 
  // Refresh Token cookie for requests to the same origin.
  withCredentials: true,
});

export interface InternalAxiosRequestConfig {
    // Add your custom properties here:
    _retry?: boolean;  // Mark as optional (?) and define the type (boolean)
    _sent?: boolean;   // If you are using another property to track if it was sent
    // Add any other custom properties you use on the config object
  }

// 2. Request Interceptor: Attach the token to every request
axiosInstance.interceptors.request.use(
    (config) => {

        const currentState: RootState = store.getState();
        const accessToken = currentState.authUser.token;

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const setupInterceptors = () => {
axiosInstance.interceptors.response.use(
    (response) => response, // Standard successful response, pass it through
    async (error: AxiosError) => {
        const originalRequest = error.config;
        const dispatch = store.dispatch;
        
        // Check for specific token expiry errors (e.g., 403 Forbidden from backend middleware)
        // Ensure this check only runs once for the failed request
        if (error.response?.status === 403 && 
          // (error.response.data as any)?.message === 'Forbidden - Access Token Expired' &&
           originalRequest && !originalRequest._retry) {
            
            originalRequest._retry = true; // Mark the request to prevent infinite loops

            try {
                // Call the dedicated refresh endpoint. The browser automatically sends the HTTP-Only cookie.
                const refreshResponse = await axiosInstance.get('/auth/refresh'); 
                
                const newAccessToken = refreshResponse.data.accessToken;

                // Update the global state with the new token
                dispatch(setCredentials({ accessToken : newAccessToken }));

                // Update the header of the original failed request with the new token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                // Re-send the original request
                return axiosInstance(originalRequest);

            } catch (refreshError: any) {
                // Refresh token has failed (e.g., expired or revoked), force logout
                console.error("Refresh token failed, logging out user:", refreshError);
                logout(); // Clear tokens and redirect
                return Promise.reject(refreshError);
            }
        }
        
        // For other errors (401, 404, etc.), just reject the promise
        return Promise.reject(error);
    }
  );
};

export default axiosInstance;

