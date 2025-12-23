import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
    id: string;
    email: string;
    // JWT standard claims like 'iat' and 'exp' are also present
}

const protectedRoute = (req: Request, res : Response, next : NextFunction) =>{
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // Type checking ensures authHeader is treated as a string or undefined
    if (typeof authHeader !== 'string' || !authHeader.startsWith('Bearer')) {
        return res.status(403).json({ message: 'Unauthorized - Missing or Malformed Access Token' });
    }

    // Extract the Access Token
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - Invalid Access Token Format' });
    }

    // Verify the Access Token
    try {
        // Use 'as TokenPayload' to assert the type of the decoded payload
        const decoded = jwt.verify(
            token, 
            process.env.ACCESS_TOKEN_SECRET as string // Asserts the secret is defined and a string
        ) as TokenPayload;
        // 4. Token is valid, attach user info to the request object
        // The Request interface extension allows these properties
        req.userId = decoded.id;
        req.email = decoded.email;

        // Move to the next middleware or the route handler
        next(); 
        
    } catch (err: any) {
        
        if (err.name === 'TokenExpiredError') {
             // Access Token has expired
             return res.status(403).json({ message: 'Forbidden - Access Token Expired' });
        }
        
        // General invalid token (bad signature, etc.)
        return res.status(403).json({ message: 'Forbidden - Invalid Access Token' });
    }
}

export default protectedRoute;