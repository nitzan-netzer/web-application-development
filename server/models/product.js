import mongoose from "mongoose";
import {connections} from '../config/db.js'
import { v4 as uuid } from 'uuid';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: String,
    category: { type: String, required: true },
    status: {
        type: String,
        enum: ['available', 'soldOut'],
        default: 'Pending',
        required: true,
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    userId: { type: String, ref: 'User' },
    productId: { type: String, required: false },
    quantity: { type: Number, required: true},
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

productSchema.pre('save', function (next) {
    this.productId = uuid();
    next();
});

export const Product = connections.productsDB.model('Product', productSchema);
