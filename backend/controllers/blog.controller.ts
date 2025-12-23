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
export const getDashboardStats = async (req: Request, res: Response) => {
    const userId = req.userId;
    try {
        const stats = await Blog.aggregate([
            { $match: { userId: userId } },
            {
                $group: {
                    _id: null,
                    totalViews: { $sum: "$stats.views" },
                    totalLikes: { $sum: { $size: "$likes" } },
                    publishedCount: { $sum: { $cond: [{ $eq: ["$status", "published"] }, 1, 0] } },
                    draftCount: { $sum: { $cond: [{ $eq: ["$status", "draft"] }, 1, 0] } }
                }
            }
        ]);
        res.status(200).json(stats[0] || { totalViews: 0, totalLikes: 0, publishedCount: 0, draftCount: 0 });
    } catch (err : any) {
        res.status(500).json({ error: err.message });
    }
};

// Get Category Distribution (For the Analytics Tab)
export const getCategoryAnalytics = async (req: Request, res: Response) => {
    const userId = req.userId;
    try {
        const categories = await Blog.aggregate([
            { $match: { userId: userId } },
            { $group: { _id: "$category", count: { $sum: 1 }, views: { $sum: "$stats.views" } } },
            { $sort: { views: -1 } }
        ]);
        res.status(200).json(categories);
    } catch (err : any) {
        res.status(500).json({ error: err.message });
    }
};

// Get Recent Activity (For the Recent Activity List)
export const getRecentActivity = async (req: Request, res: Response) => {
    const userId = req.userId;
    try {
        const recent = await Blog.find({ userId: userId })
            .sort({ updatedAt: -1 })
            .limit(5)
            .select('title image category stats status updatedAt');
        res.status(200).json(recent);
    } catch (err : any) {
        res.status(500).json({ error: err.message });
    }
};


export const getWeeklyEngagement = async (req: Request, res: Response) => {
    try {

        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        const userId = req.userId;
        console.log(userId);

        if(!userId){
            console.log("userId not exists");
            return res.status(400).json({ message: "Login required to get weekly engagement" });
        }

        const engagement = await Blog.aggregate([
            { 
                $match: { 
                    userId: new mongoose.Types.ObjectId(userId),
                    createdAt: { $gte: lastWeek } 
                } 
            },
            {
                $group: {
                    _id: { $dayOfWeek: "$createdAt" }, // 1 (Sun) to 7 (Sat)
                    totalViews: { $sum: "$stats.views" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        // Logic: Map the 1-7 result to a standard Mon-Sun array for the frontend
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const formattedData = days.map((day, index) => {
            const dayData = engagement.find(item => item._id === index + 1);
            return {
                day: day,
                views: dayData ? dayData.totalViews : 0
            };
        });

        res.status(200).json(formattedData);
    } catch (err : any) {
        res.status(500).json({ error: err.message });
    }
};
