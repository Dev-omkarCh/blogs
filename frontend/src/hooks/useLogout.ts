import { setCredentials } from '@/features/auth/authSlice';
import axios from 'axios';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {

    const [ isLoading, setIsLoading ] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const logout = async() => {

        setIsLoading(true);

        try{
            const response = await axios.delete(`/api/auth/logout`);

            console.log(response.data.message || "Logged out successfully");
            toast.success(response.data?.message || "Logged out successfully");

            // localStorage
            localStorage.setItem("authUser",JSON.stringify({}));

            dispatch(setCredentials({ 
                user : null, 
                accessToken: null, 
                isAuthenticated: false 
            }));
            navigate("/login");
        }
        catch(error : any){
            toast.error(error?.message);
        }
        finally{
            setIsLoading(false);
        };
    };
    return { logout, isLoading };
};

export default useLogout; 