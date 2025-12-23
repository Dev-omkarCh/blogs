import { Request, Response } from "express";
import { Blog } from "../models/Blog.model";
import { Comment } from "../models/Commet.model";
import { tech } from "../utils/getImageUrl";
import { User } from "../models/User.model";
import mongoose from "mongoose";

export const getBlogs = async (req : Request, res : Response) => {
    const blogs = await Blog.find({ published: true })
    .limit(5)
    .sort({ createdAt: -1 })
    .populate({
        path: 'userId',
        model: User,
        select: 'username profileImage fullName'
    });

    return res.status(200).json({ 
        message : "Get all blogs", 
        blogs,
    });
};

export const createBlog = async (req : Request, res : Response) => {
    try {
        const { title, content, author, category, tags, publish, userId } = req.body;
        const randomNum = Math.floor(Math.random() * tech.length);
        const blog = {
            title,
            content,
            author,
            category,
            tags,
            published: publish ? true : false,
            image : tech[randomNum] || "",
            status: publish ? "published" : "draft",
            userId,
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

export const getBlogById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        if (blog.comments && blog.comments.length > 0) {
            (await blog.populate('comments')).populate('users');
        }
        console.log(blog);
        return res.status(200).json({ message: "Blog found", blog });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getBlogsByUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        // convert userId to mongoose ObjectId
        const blogs = await Blog.find({ userId : new mongoose.Types.ObjectId(userId) });

        return res.status(200).json({ message: "Blogs fetched", blogs });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const likeBlog = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId } = req.body; // Assuming userId is sent in the request body
        if(!userId){
            return res.status(400).json({ message: "Login required to like a blog" });
        }
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        blog?.likes?.push(userId);
        blog.markModified('likes');

        await blog.save();
        return res.status(200).json({ message: "Blog liked", blog });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const commentOnBlog = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId, comment } = req.body; // Assuming userId and comment are sent in the request body
        
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        if(!userId){
            return res.status(400).json({ message: "Login required to comment on a blog" });
        }
        const newComment = await Comment.create({
            blogId: blog._id,
            userId: userId,
            comment: comment,
        });
        blog.comments.push(newComment._id);
        blog.markModified('comments');

        const user = await User.findById(userId);
        if (!user) return res.status(400).json({ message: "No User found " });

        const populatedComment = await newComment.populate({
            path: "userId",
            model: User,   // Good: This fixes the MissingSchemaError
            select: "username profileImage fullName" // Use 'select' for specific fields
        });


        await blog.save();
        return res.status(200).json({ message: "Comment added", newComment : populatedComment });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    };
};

//  Dashboard Stats (For the Overview Tab)
export const getBlogAnalytics = async (req: Request, res : Response) => {
    try {
        const userId = req.params.userId;

        // 1. Fetch all blogs for the user
        const blogs = await Blog.find({ userId : new mongoose.Types.ObjectId(userId) });

        // 2. Aggregate Totals
        let totalViews = 0;
        let totalLikes = 0;
        let totalComments = 0;
        let totalAnonymous = 0;
        
        const categoryDistribution: { [key: string]: number } = {};

        blogs.forEach(blog => {
            totalViews += (blog.stats?.views || 0);
            totalAnonymous += (blog.stats?.anonymous || 0);
            totalLikes += (blog.likes?.length || 0);
            totalComments += (blog.comments?.length || 0);

            // Calculate Category Distribution
            categoryDistribution[blog.category] = (categoryDistribution[blog.category] || 0) + 1;
        });

        // 3. Find Top Performing Blog
        const topBlog = [...blogs].sort((a, b) => (b.stats?.views || 0) - (a.stats?.views || 0))[0];

        // 4. Monthly Aggregation (Example: Last 6 months)
        // In a real app, you'd aggregate this using MongoDB $group by month
        const activityData = [
            { name: 'Jul', views: totalViews * 0.1 }, 
            { name: 'Aug', views: totalViews * 0.15 },
            { name: 'Sep', views: totalViews * 0.25 },
            { name: 'Oct', views: totalViews * 0.2 },
            { name: 'Nov', views: totalViews * 0.3 }
        ];

        

        res.status(200).json({
            summary: {
                totalViews,
                totalLikes,
                totalComments,
                totalAnonymous,
                blogCount: blogs.length,
            },
            categoryDistribution,
            topBlog,
            activityData
        });
    } catch (error : any) {
        res.status(500).json({ message: "Analytics Error", error: error.message });
    }
};
