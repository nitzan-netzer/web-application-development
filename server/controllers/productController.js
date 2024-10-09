import { Product } from '../models/product.js';
import { User } from '../models/user.js';
import { getAllStatistics } from "../statistics/statisticsQueries.js";
import { getLatLong } from "../utils/utils.js";

export async function isUserBlocked(req, res, next) {
    const { userId } = req.body;
    try {
        const user = await User.find({userId});
        if (user._doc?.isBlocked) {
            return res.status(404).json({ msg: 'User is blocked' });
        }
    }
    catch (e) {
        return res.status(500).json({ msg: e});
    }
    next();
}

export async function createProduct(req, res, next) {
    const { name, category, status, description, price, quantity, userId, image } = req.body;

    try {
        const user = await User.findOne({userId: userId.toString()});

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const address = user.address;
        const location = await getLatLong(address);

        const lat = location?.lat || "0";
        const lng = location?.lng || "0";

        const product = new Product({
            name,
            image: req.generatedFileName || image,
            category,
            quantity,
            status,
            description,
            price,
            userId,
            userName: user._doc.username,
            location: {
                type: 'Point',
                coordinates: [lng, lat]
            }
        });

        const savedProduct = await product.save();
        res.status(201).json({ msg: 'Product created successfully', product: savedProduct });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
    next();
}

export async function updateProduct(req, res, next) {
    console.log("Updating Product");
    const { name, image, category, status, description, price, userId } = req.body;
    console.log(name, image, category, status, description, price);
    const { productId } = req.params;
    console.log(req.params);
    try {
        // Fetch the user to ensure it exists
        const user = await User.findOne({userId});
    
        if (!user) {
            console.log("USER NOT FOUND");
            return res.status(404).json({ msg: 'User not found' });
        }

        // Fetch the product to ensure it exists
        const product = await Product.findOne({ productId, userId });
        if (!product) {
            console.log("USER NOT FOUND");
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
        const savedProduct = await product.save();
        res.status(200).json({ msg: 'Product updated successfully', product: savedProduct });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }

    next();
}

export async function deleteProduct(req, res) {
    const { userId } = req.body;
    const { productId } = req.params;

    try {
        const user = await User.findOne({userId});
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        let product = await Product.findOne({ productId, userId });
        if (!product && user._doc.isAdmin) {
            product = await Product.findOne({ productId })

            if (!product) {
                return res.status(404).json({ msg: 'Product not found' });
            }
        }

        // await product.delete();
        await Product.deleteOne({ productId });
        res.status(200).json({ msg: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
}

export async function getProduct(req, res) {
    const { productId } = req.params;

    try {
        const product = Product.findOne({productId});
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.status(200).json({ product });
    }
    catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
}

export async function getAllProducts(req, res) {
    try {
        const products = await Product.find();
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
}

export async function getAllProductsByUserId(req, res) {
    try {
        const { userId } = req.params;
        const products = await Product.find({userId});
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
}

export async function getAllStatisticsOnProducts(req, res) {
    try {
        const statistics = await getAllStatistics();
        res.status(200).json({ statistics });
    }
    catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
}

