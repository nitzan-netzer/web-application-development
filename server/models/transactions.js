import mongoose from "mongoose";
import { connections } from '../config/db.js';

const transactionSchema = new mongoose.Schema({
    userId: { type: String, ref: 'User', required: true },
    sellerUserName: { type: String, required: false},
    productId: { type: String, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    priceForOne: { type: Number, required: true },
    priceForMany: { type: Number, required: true },
    transactionDate: { type: Date, default: Date.now },
}, { timestamps: true });

export const Transaction = connections.transactionsDB.model('Transaction', transactionSchema);
