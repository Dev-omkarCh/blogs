// backend/server.ts

// Importing necessary modules
import express from 'express';
import {Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookie from "cookie-parser";

// Routes imports
import blogRoutes from './routes/blog.route';
import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route';
import queryRoutes from './routes/query.route';
import supportRoutes from './routes/transaction.route';

// Database connection import
import connectDb from './db/connectDb';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define the exact origin(s) allowed
// TODO: Add your production domain(s) later
const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];

const corsOptions: cors.CorsOptions = {
    // Dynamically set the ACAO header based on the request's origin

    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, or same-origin requests)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
             
        }
    },
    
    // Must be set to true when credentials (cookies) are being sent
    credentials: true,
    
    // methods and headers allowed in the preflight request
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Apply the CORS middleware
app.use(cors(corsOptions));
app.use(cookie());

app.use('/api/blogs/', blogRoutes);
app.use('/api/auth/', authRoutes);
app.use('/api/users/', userRoutes);
app.use('/api/queries/', queryRoutes);
app.use('/api/support/', supportRoutes);

app.get("/", (req : Request ,res : Response)=>{
    return res.send("Hello World");
});

app.listen(PORT, async ()=>{
    await connectDb();
    console.log(`App is runnnig on http://localhost:${PORT}`);
});