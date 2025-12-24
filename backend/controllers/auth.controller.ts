import { Request, Response } from "express";
import { hash, genSalt, compare } from "bcryptjs";
import { User } from "../models/User.model";
import { hashToken, signAccessToken, signRefreshToken } from "../utils/tokens";
import { verify } from "jsonwebtoken";

interface DecodedToken{
    id: string,
    iat: number,
    exp: number
};

const validateSignupData = (data: any): boolean => {
    const { fullName, username, email, password, role, bio, profileImage } = data;
    if (!email || !username || !password) {
        return false;
    }
    return true;
};

const profileImageMapper = (gender: string): string => {
    if (!gender) return '';
    if (gender === "female") {
        return `https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 100)}.jpg`;
    };
    return `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`;
};

export const signup = async (req: Request, res: Response) => {
    try {
        const { fullName, username, email, password, profileImage, gender } = req.body;

        const isValid = validateSignupData({ fullName, username, email, password, profileImage, gender });
        if (!isValid) return res.status(400).json({ message: "Missing some fields" });

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ message: "Email is already taken" });

        const existingUsername = await User.findOne({ username });
        if (existingUsername) return res.status(409).json({ message: "Username is already taken" });

        const salt = await genSalt(12);
        const hashPassword = await hash(password, salt);

        const user = new User({
            fullName: fullName || '',
            username: username || '',
            email: email,
            password: hashPassword,
            profileImage: profileImageMapper(gender),
            gender: gender || '',
        });

        const accessToken = signAccessToken({ id: user._id, email: user.email });
        const refreshToken = signRefreshToken({ id: user._id });

        // Hash refresh token and save to DB
        const hashedRefresh = await hashToken(refreshToken);

        user.refreshTokens.push({
            tokenHash: hashedRefresh,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        await user.save();

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // remove password from user object(Auto remove in model itself)

        return res.status(201).json({
            message: "User signed up successfully",
            user,
            accessToken,
        });

    } catch (error: any) {
        console.log(`Error in Signup Controller : ` + error?.message);
        return res.status(500).send(`Error in Signup Controller : ` + error?.message);
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) return res.status(400).json({ message : "Please Provide Email or password"});

        const user = await User.findOne({ email });
        if(!user) return res.status(403).json({ message : "No User found" });

        const isValidPassword = await compare(password, user.password);
        if(!isValidPassword) return res.status(400).json({ message : "Incorrect username or password "});

        const accessToken = signAccessToken({ id: user._id, email: user.email });
        const refreshToken = signRefreshToken({ id: user._id });

        // Hash refresh token and save to DB
        const hashedRefresh = await hashToken(refreshToken);

        user.refreshTokens.push({
            tokenHash: hashedRefresh,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        await user.save();

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(201).json({
            message: "User Login successfully",
            user,
            accessToken,
        });
    } catch (error: any) {
        console.log(`Error in login Controller : ` + error?.message);
        return res.status(500).send(`Error in login Controller : ` + error?.message);
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies?.refreshToken;
        if(!refreshToken) return res.status(400).json({ message : "Can't logout, as you are not logged in"});
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        return res.status(200).json({ message : "User logged out successfully"});
    } catch (error: any) {
        console.log(`Error in logout Controller : ` + error?.message);
        return res.status(500).send(`Error in logout Controller : ` + error?.message);
    }
};

export const generateAccessToken = async (req: Request, res: Response) => {

    const refreshToken = req.cookies?.refreshToken;
    if(!refreshToken) return res.status(403).json({ error : "Access is Forbidden"});

    const secret = process.env.REFRESH_TOKEN_SECRET;
    if(!secret) return res.status(500).json({ error: "Env is not getting Refresh token"})

    const decoded = verify(refreshToken, secret);
    const { id } = decoded as DecodedToken;
    const user = await User.findById(id);
    if(!user) return res.status(403).json({ error: "User not found"});

    const accessToken = signAccessToken({ id: user._id, email: user.email });

    res.status(200).json({ message : "Access token generated successfully", accessToken, user });
};