import express from 'express';
import { commentOnBlog, createBlog, getBlogById, getBlogs, likeBlog } from '../controllers/blog.controller';
import protectedRoute from '../middleware/protectedRoute';
const router = express.Router();

router.get('/', getBlogs);
router.post('/:id/like', likeBlog);
router.post('/:id/comment', commentOnBlog);
router.get('/:id', getBlogById);
router.post('/create', createBlog);

export default router;