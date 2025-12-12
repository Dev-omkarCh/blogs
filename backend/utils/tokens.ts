import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcryptJs from 'bcryptjs';

interface AccessTokenPayload{
    id: mongoose.Types.ObjectId, 
    email: string,
}

interface RefreshTokenPayload{
    id: mongoose.Types.ObjectId,
}

/**
 * Signs and generates a new Access Token.
 * @param payload The minimal data to include in the token.
 * @returns The signed JWT string.
 */
export const signAccessToken = (payload : AccessTokenPayload) =>{

    // Ensure the secret is present before signing
    const secret = process.env.ACCESS_TOKEN_SECRET;
    
    if (!secret) {
        throw new Error("ACCESS_TOKEN_SECRET is not defined in environment variables.");
    }

    // jwt.sign returns the JWT string directly
    return jwt.sign(
    payload,
    secret,
    { expiresIn: "15m" }  // example expiry
  );
};

export const signRefreshToken = (payload : RefreshTokenPayload) =>{
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

