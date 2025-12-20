import { setCredentials } from '@/features/auth/authSlice';
import type { FormData } from '@/types/Signup';
import axios from 'axios';
import { use, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const useSignup = () => {

    const [ isLoading, setIsLoading ] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const signup = async(signupData : FormData) => {

        setIsLoading(true);
        const isValid = validation(signupData);
        if(!isValid) return setIsLoading(false);

        try{
            const res = await axios.post(`/api/auth/signup`,{
                username : signupData.username,
                email : signupData.email,
                password : signupData.password,
                fullName : signupData.fullName,
                gender : signupData.gender,
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
            setIsLoading(false);
        }
    }
  return { signup, isLoading }
}

function validation({ fullName, gender, email, password, username } : FormData){
    if(fullName.length < 3){
        toast.error("Full Name must be atleast 3 characters");
        return false;
    }
    if(gender === ""){
        toast.error("Please select a gender");
        return false;
    }
    if(gender !== "male" && gender !== "female" && gender !== "non-binary" && gender !== "private"){
        toast.error("Please select a valid gender");
        return false;
    }
    if(username.length < 3){
        toast.error("Username must be atleast 3 characters");
        return false;
    }
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