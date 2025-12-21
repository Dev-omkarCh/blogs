import express from 'express';
import { createBlog, getBlogs } from '../controllers/blog.controller';
import protectedRoute from '../middleware/protectedRoute';
const router = express.Router();

router.get('/', getBlogs);
router.post('/create', createBlog);

export default router;