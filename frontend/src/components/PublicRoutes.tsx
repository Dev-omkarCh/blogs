import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { useEffect, useState } from "react";
import { setCredentials } from "@/features/auth/authSlice";
import axiosInstance from "@/lib/utils";

const PublicRoute = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.authUser);
  // Start as true if we aren't sure about auth yet
  const [loading, setLoading] = useState(!isAuthenticated); 
  const dispatch = useDispatch();

  useEffect(() => {
    const getTokens = async () => {
      try {
        const response = await axiosInstance.get('/api/auth/refresh');
        dispatch(setCredentials({
          user: response.data.user,
          isAuthenticated: true,
          token: response.data.accessToken
        }));
      } catch (error: any) {
        // Log error, but don't toast here if it's just a 401 (normal for logged out users)
        console.log("Session not found or expired");
      } finally {
        setLoading(false);
      }
    };

    if (!isAuthenticated) {
      getTokens();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, dispatch]);

  // While checking the server, show the spinner
  if (loading) {
    return (
      <div className='h-screen w-screen flex flex-col justify-center gap-3 text-indigp-590 items-center bg-slate-900'>
        <LoadingSpinner />
      </div>
    );
  }

  // Once loading is done, make the final decision
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute