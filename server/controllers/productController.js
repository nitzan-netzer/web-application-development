import mongoose from "mongoose";
import { Product } from '../models/product.js';
import { User } from '../models/user.js';
import {createImage} from "../middleware/imageUpload.js";

// Create Product
export async function createProduct(req, res, next) {
    const { name, category, status, description, price, userId } = req.body;

    try {

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ msg: 'Invalid userId format' });
        }

        const user = User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const product = new Product({
            name,
            image: req.generatedFileName,
            category,
            status,
            description,
            price,
            userId,
        });

        await product.save();
        res.status(201).json({ msg: 'Product created successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
}

// update Product
export async function updateProduct(req, res) {
    const { name, image, category, status, description, price } = req.body;
    const userId = req.user.userId;
    const { productId } = req.params;

    if (image) {
        createImage();
    }

    // Validate inputs here...

    try {
        // Fetch the user to ensure it exists
        const user = User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Fetch the product to ensure it exists
        const product = await Product.findOne({ productId, userId });
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        // Update the product fields
        product.name = name || product.name;
        product.image = image || product.image;
        product.category = category || product.category;
        product.status = status || product.status;
        product.description = description || product.description;
        product.price = price || product.price;

        // Save the updated product
        await product.save();
        res.status(200).json({ msg: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
}

// Delete Product
export async function deleteProduct(req, res) {
    const userId = req.user.userId;
    const { productId } = req.params;

    try {
        const user = User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const product = await Product.findOne({ productId, userId });
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        await product.remove();
        res.status(200).json({ msg: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
}

export async function getProduct(req, res) {
    const { productId } = req.params;

    try {
        const product = Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.status(200).json({ product });
    }
    catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
}

export async function getAlProducts(req, res) {
    try {
        const products = await Product.find();
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
}
