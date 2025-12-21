import axios from 'axios';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface CreateBlogParams {
    content : any;
    title : string;
    author : string;
    category : string;
    tags : string[];
    publish : boolean;
}

const useCreateBlog = () => {

    const [ isLoading, setIsLoading ] = useState(false);
    const navigate = useNavigate();
    
    const createBlog = async({ content, title, author, category, tags, publish } : CreateBlogParams) => {

        if(!title || content.length < 2 || !author || tags.length < 1){
            toast.error("Title, Content and Author are required");
            return;
        }

        setIsLoading(true);
        try{
            
            const res = await axios.post(`/api/blogs/create`,{
                content : content,
                title : title,
                author : author,
                category : category,
                tags : tags,
                publish : publish,
            });
            const blog = res.data?.blog;
            console.log(blog);
            toast.success("Blog Created Successfully");
            navigate(`/blogs`);
        }
        catch(error : any){
            toast.error(error?.message);
        }
        finally{
            setIsLoading(false);
        };
    };
    return { createBlog, isLoading }
};

export default useCreateBlog; 