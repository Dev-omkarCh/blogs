import mongoose from "mongoose";

const commetScheme = new mongoose.Schema({
    blogId : { 
        type: mongoose.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    userId : {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    author : { type: String },
    comment : { type: String, required: true },
    
}, { timestamps : true });

export const Comment = mongoose.model("Comment", commetScheme);