import {Request, Response} from 'express';
import { User } from '../models/User.model';

export const getUserProfile = async(req : Request, res : Response) => {
    const id = req?.userId;

    if(!id) return res.send(400).json({ error: "User Id not found"});
    
    const user =  await User.findById(id).select("-password").select("-refreshTokens");
    if(!user) return res.status(400).json({ error: "User Not found" });
    return res.status(200).json(user);
};