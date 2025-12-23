import { Request, Response } from "express";
import Transaction from "../models/Transaction.model";
import mongoose from "mongoose";
import stripe, { Stripe } from 'stripe';(process.env.STRIPE_SECRET_KEY!);


// --- 1. GET SUPPORT DATA ---
export const getSupportStats = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        // Fetch 5 most recent completed donations
        const recentSupporters = await Transaction.find({ 
            receiverId: new mongoose.Types.ObjectId(userId), 
            status: 'completed' 
        })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('senderId', 'username image');

        // Calculate total amount raised
        const totalRaised = await Transaction.aggregate([
            { $match: { receiverId: new mongoose.Types.ObjectId(userId), status: 'completed' } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        res.status(200).json({
            recentSupporters,
            totalAmount: totalRaised[0]?.total || 0,
            supportCount: recentSupporters.length
        });
    } catch (error: any) {
        res.status(500).json({ message: "Error fetching support stats", error: error.message });
    }
};

// --- 2. CREATE PAYMENT INTENT (Stripe Example) ---
// Note: You would need the 'stripe' package installed

export const createDonation = async (req: Request, res: Response) => {
    try {
        const { amount, message, receiverId, senderId } = req.body;

        // 1. Create a pending transaction in your DB
        const transaction = await Transaction.create({
            amount,
            message,
            receiverId,
            senderId, // Can be null if anonymous
            status: 'pending'
        });

        // 2. Create Stripe Payment Intent
        // const paymentIntent = await stripe.paymentIntents.create({
        //     amount: amount * 100, // Stripe works in cents
        //     currency: 'usd',
        //     metadata: { transactionId: transaction._id.toString() }
        // });

        res.status(200).json({
            // clientSecret: paymentIntent.client_secret,
            transactionId: transaction._id
        });
    } catch (error: any) {
        res.status(500).json({ message: "Payment initialization failed", error: error.message });
    }
};

// --- 3. WEBHOOK (To finalize transaction) ---
export const handleStripeWebhook = async (req: Request, res: Response) => {
    // This is called by Stripe after successful payment
    const event = req.body;

    if (event.type === 'payment_intent.succeeded') {
        const intent = event.data.object;
        await Transaction.findByIdAndUpdate(intent.metadata.transactionId, {
            status: 'completed',
            paymentId: intent.id
        });
    }
    res.json({ received: true });
};