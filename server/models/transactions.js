import mongoose from "mongoose";
import { connections } from '../config/db.js';

const transactionSchema = new mongoose.Schema({
    userId: { type: String, ref: 'User', required: true },
    products: [{
        productId: { type: String, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    transactionDate: { type: Date, default: Date.now },
}, { timestamps: true });

export const Transaction = connections.transactionsDB.model('Transaction', transactionSchema);
