import { setCredentials } from '@/features/auth/authSlice';
import type { FormData } from '@/types/Signup';
import axios from 'axios';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const useSignup = () => {

    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const signup = async(data : FormData) => {

        setLoading(true);
        const isValid = validation(data);
        if(!isValid) return setLoading(false);

        try{
            const res = await axios.post(`/api/auth/signup`,{
                username : data.username,
                email : data.email,
                password : data.password,
                profileImage : data.profileImage,
                fullName : data.fullName,
                gender : data.gender,
            });

            const user = res.data?.user;
            const accessToken = res.data?.accessToken;
            console.log(user, accessToken);

            // localStorage
            localStorage.setItem("authUser",JSON.stringify(user));

            dispatch(setCredentials({ user, accessToken }));
            navigate("/dashboard");
        }
        catch(error : any){
            toast.error(error?.message);
        }
        finally{
            setLoading(false);
        }
    }
  return { signup, loading }
}

function validation({ email, password } : FormData){
    if(!email || !password){
        toast.error("Please fill in all Fields");
        return false;
    }
    if(password.length < 6){
        toast.error("Password must be atleast 6 characters");
        return false;
    }
    return true;
};

export default useSignup; 