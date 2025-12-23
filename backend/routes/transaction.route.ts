import express from 'express';
import { createDonation, getSupportStats, handleStripeWebhook } from '../controllers/support.controller';
const router = express.Router();

router.get('/stats/:userId', getSupportStats);
router.post('/donate', createDonation);
router.post('/webhook', handleStripeWebhook);

export default router;