import mongoose from "mongoose";
/*
    id: ...,
    title: rust,
    excerpt : Exploring the deep architectural patterns that modern engineering teams use to maintain high availability...
    author : Omkar
    category : Backend
    stats: {
        views: 10, # only Auth users are counted
        anoymys: 100, # only Non-Auth users are counted
        likes: 5, # Only Auth users can like
        comments: 24, # Only Auth users can comment
        readTime: 8min
        isHot: blog.latest + ( blog.mostLikes + blog.mostComments + blog.mostAnoymysViews )
        image: ...
        isPopular : blog.mostLikes + blog.mostComments
    }

*/
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
            likes : [mongoose.Types.ObjectId],
            readTime : "5 min",
        }
    },
    comments : {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comment',
        default: []
    }, 
    status : { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    image : { type: String, default: '' },
    published : { type: Boolean, default: false },

}, { timestamps : true });

export const Blog = mongoose.model("Blog", blogSchema);