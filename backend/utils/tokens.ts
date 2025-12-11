import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcryptJs from 'bcryptjs';

interface Payload{
    id: mongoose.Types.ObjectId, 
    email?: string,
}

export const signAccessToken = (payload : Payload) =>{
    return jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET || '',
    { expiresIn: "15m" }  // example expiry
  );
};

export const signRefreshToken = (payload : Payload) =>{
    return jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET || '',
    { expiresIn: "7d" }   // example expiry
    );
};

export const hashToken = async (token : string) => {
    const salt = await bcryptJs.genSalt(10);
    return bcryptJs.hash(token, salt); 
};

