import mongoose from "mongoose";
import {connections} from '../config/db.js'

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    picture: String,
    category: { type: String, required: true },
    status: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // default id key in User model (_id)
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true, // This will automatically reference _id
        required: true
    }
});

// The 'pre' hook ensures productId is set to _id before saving
productSchema.pre('save', function (next) {
    if (!this.productId) {
        this.productId = this._id;
    }
    next();
});

export const Product = connections.productsDB.model('Product', productSchema);
