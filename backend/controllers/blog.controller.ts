import { Request, Response } from "express";
import { Blog } from "../models/Blog.model";

export const getBlogs = async (req : Request, res : Response) => {
    const blogs = await Blog.find({ published: true })
    .limit(10)
    .sort({ createdAt: -1 });

    return res.status(200).json({ 
        message : "Get all blogs", 
        blogs,
    });
};

export const createBlog = async(req : Request, res : Response) => {
    try {
        const { title, content, author, category, tags, publish } = req.body;
        const blog = {
            title,
            content,
            author,
            category,
            tags,
            published: publish ? true : false,
        };
        const newBlog = await Blog.create(blog);
        return res.status(201).json({ 
            message : "Blog created successfully", 
            blog: newBlog
        });
    } catch (error: any) {
        console.log(error.message);
        return res.status(500).json({
            message : "Internal Server Error", 
        });
    };
};