import express from 'express';
import { getBlogs } from '../controllers/blog.controller';
const router = express.Router();

router.get('/', getBlogs);

export default router;