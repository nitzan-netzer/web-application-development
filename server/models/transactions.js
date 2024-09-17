import mongoose from "mongoose";
import { connections } from '../config/db.js';

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User who made the purchase
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }, // Quantity of each product purchased
        price: { type: Number, required: true } // Price of each product at the time of transaction
    }],
    totalAmount: { type: Number, required: true }, // Total amount of the transaction
    transactionDate: { type: Date, default: Date.now }, // Date and time when the transaction occurred
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

export const Transaction = connections.transactionsDB.model('Transaction', transactionSchema);
