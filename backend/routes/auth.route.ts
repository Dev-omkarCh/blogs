import express from 'express';
import { generateAccessToken, login, logout, signup } from '../controllers/auth.controller';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.delete('/logout', logout);
router.get('/refresh', generateAccessToken);

export default router;