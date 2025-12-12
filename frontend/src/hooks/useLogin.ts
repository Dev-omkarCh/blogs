import { setCredentials } from '@/features/auth/authSlice';
import axios from 'axios';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {

    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const login = async(email : string , password : string) => {

        setLoading(true);
        const success = validation(email, password);
        if(!success) return setLoading(false);

        try{
            const res = await axios.post(`/api/auth/login`,{
                email,
                password,
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
  return { login, loading }
}

function validation(email : string , password : string){
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

export default useLogin; 