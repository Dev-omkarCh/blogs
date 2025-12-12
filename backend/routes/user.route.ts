import express from 'express';
import protectedRoute from '../middleware/protectedRoute';
import { getUserProfile } from '../controllers/user.controller';

const router = express.Router();

router.get('/profile',protectedRoute, getUserProfile);

export default router;