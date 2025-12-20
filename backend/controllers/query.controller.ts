import { Request, Response } from "express";
import { Query } from "../models/Query.model";

export const getUserQuery = async (req: Request, res: Response) => {
    const { name, email, query } = req.body;
    try {
        if(!email && !query){
            return res.status(400).json({ message: "Email and query are required" });
        };
        if(!email || !email.includes("@")) {
            return res.status(400).json({ message: "Invalid email format" });
        };
        if(query.length < 10) {
            return res.status(400).json({ message: "Query must be at least 10 characters long" });
        };
        const newQuery = await Query.create({
            name : name ? name : "Anonymous",
            email,
            query,
        });

        return res.status(200).json({ message: "Query Send Successfully", query: newQuery });

    } catch (error) {
        console.error("Error fetching query by ID:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};