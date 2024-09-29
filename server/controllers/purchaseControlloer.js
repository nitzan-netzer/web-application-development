import { Product } from '../models/product.js';
import { User } from '../models/user.js';
import { Transaction } from '../models/transactions.js';

export async function purchase(req, res, next) {
    try {
        const { userId, products } = req.body;

        // Validate user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Validate products and calculate total amount
        let totalAmount = 0;
        const productDetails = [];

        for (const item of products) {
            const { productId, quantity } = item;

            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ error: `Product with ID ${productId} not found` });
            }

            if (quantity <= 0) {
                return res.status(400).json({ error: `Invalid quantity for product with ID ${productId}` });
            }

            if (product.status !== 'available') {
                return res.status(400).json({error: `This product: ${productId} is sold out`})
            }

            if (quantity > product.quantity) {
                return res.status(400).json({error: `This product has only ${quantity} quantity`})
            }

            totalAmount += product.price * quantity;

            product.quantity = product.quantity - quantity;
            if (product.quantity === 0) {
                product.status = 'soldOut';
            }

            productDetails.push({
                productId: product._id,
                quantity,
                price: product.price
            });
        }

        // Create new transaction
        const transaction = new Transaction({
            userId: user._id,
            products: productDetails,
            totalAmount,
        });

        // Save the transaction
        await transaction.save();

        res.status(200).json(transaction);
    } catch (err) {
        next(err);  // Pass errors to the error handler middleware
    }
}
