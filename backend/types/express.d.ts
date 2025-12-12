import { Request } from 'express';

// Extend the Express Request interface
declare module 'express-serve-static-core' {
    interface Request {
        userId: string;
        email: string; // Assuming role is also part of your token payload
    }
}