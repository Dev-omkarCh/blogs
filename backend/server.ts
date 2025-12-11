import express from 'express';
import {Request, Response} from 'express';
import dotenv from 'dotenv';
import blogRoutes from './routes/blog.route';
import authRoutes from './routes/auth.route';
import connectDb from './db/connectDb';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/blogs/', blogRoutes);
app.use('/api/auth/', authRoutes);

app.get("/", (req : Request ,res : Response)=>{
    return res.send("Hello World");
});

app.listen(PORT, async ()=>{
    await connectDb();
    console.log(`App is runnnig on http://localhost:${PORT}`);
});