import { Request, Response } from "express";
import { blogs } from "../dummy/blogs";

export const getBlogs = (req : Request, res : Response) => {
    console.log("get Blogs");
    return res.status(200).json({ 
        message : "Get all blogs", 
        blogs,
    });
};