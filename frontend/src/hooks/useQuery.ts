import type { ContactForm } from '@/components/home/ContactForm';
import axios from 'axios';
import { useState } from 'react'
import toast from 'react-hot-toast';

const useQuery = () => {

    const [ isLoading, setIsLoading ] = useState(false);
    
    const sendQuery = async(contactForm: ContactForm) => {

        setIsLoading(true);
        // const isValid = validation(contactForm.email, contactForm.query);
        // if(!isValid) return setIsLoading(false);

        try{
            const response = await axios.post(`/api/queries/query/`,{
                name: contactForm.name,
                email: contactForm.email,
                query: contactForm.query,
            });
            console.log(response.data?.query);
            toast.success(response.data.message || "Query send successfully");
        }
        catch(error : any){
            toast.error(error?.message);
            toast.error(error?.message || "Failed to send query");
        }
        finally{
            setIsLoading(false);
        }
    };

    return { sendQuery, isLoading };
}

// function validation(email : string , password : string){
//     if(!email || !password){
//         toast.error("Please fill in all Fields");
//         return false;
//     }
//     if(password.length < 6){
//         toast.error("Password must be atleast 6 characters");
//         return false;
//     }
//     return true;
// };

export default useQuery; 