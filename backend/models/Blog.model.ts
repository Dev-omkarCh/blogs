import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title : { type: String, required: true },
    content : { type: [], required: true },
    author : { type: String, required: true },
    userId : {
        type : mongoose.Types.ObjectId,
        ref: 'User',
        required : true,
    },
    tags : [String],
    category : { type: String, required: true },
    stats : { 
        type: Object, 
        default: {
            views : 0,
            anonymous : 0,
            readTime : "5 min",
        }
    },
    likes : {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    comments : {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comment',
        default: []
    }, 
    status : { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    image : { 
        type: String,
        default: ''
    },
    published : { type: Boolean, default: false },

}, { timestamps : true });

export const Blog = mongoose.model("Blog", blogSchema);