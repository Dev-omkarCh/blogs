import express from 'express';
import { getUserQuery } from '../controllers/query.controller';

const router = express.Router();

router.post('/query/', getUserQuery);

export default router;