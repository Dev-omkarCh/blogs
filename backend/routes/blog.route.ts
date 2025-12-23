import express from 'express';
import { commentOnBlog, createBlog, getBlogById, getBlogs, getBlogsByUser, likeBlog, getBlogAnalytics } from '../controllers/blog.controller';
import protectedRoute from '../middleware/protectedRoute';
const router = express.Router();

router.get('/', getBlogs);
router.get('/user/:userId', protectedRoute, getBlogsByUser);
router.post('/:id/like', likeBlog);
router.post('/:id/comment', commentOnBlog);
router.get('/:id', getBlogById);
router.get('/analytics/:userId', protectedRoute, getBlogAnalytics);
router.post('/create', createBlog);

export default router;