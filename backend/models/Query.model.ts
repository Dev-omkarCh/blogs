import mongoose from "mongoose";
/*
        _id: ...,
        name: "Omkar Chikhale",
        email: "omkar@gmail.com",
        query: "This is a sample query",
        status : "PENDING",
        createdAt : new Date().toISOString(),
        updatedAt : new Date().toISOString(),
*/
const querySchema = new mongoose.Schema({
    name : String,
    email : { type: String, required: true },
    query : { type: String, required: true },
    status : {
        type: String,
        enum: ["PENDING", "IN_PROGRESS", "RESOLVED"],
        default: "PENDING",
    },


}, { timestamps : true });

export const Query = mongoose.model("Query", querySchema);