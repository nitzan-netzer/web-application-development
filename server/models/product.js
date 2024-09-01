import mongoose from "mongoose";
import {connections} from '../config/db.js'

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pictures: [String],
    category: { type: String, required: true },
    status: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productId: { type: String, unique: true }
});

export const Product = connections.productsDB.model('Product', productSchema);
