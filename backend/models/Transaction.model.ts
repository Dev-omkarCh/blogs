import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional (if logged in)
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    message: { type: String, maxLength: 200 },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    paymentId: { type: String } // Stripe/PayPal ID
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);