const Product = require('../models/product');
const User = require('../models/user');

// Create Product
async function createProduct(req, res)  {
    const { name, pictures, category, status, description, price } = req.body;
    const userId = req.user.userId;

    // Validating inputs here...

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const product = new Product({
            name, pictures, category, status, description, price,
            userId, productId: `${user.username}_${Date.now()}`
        });

        await product.save();
        res.status(201).json({ msg: 'Product created successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
}


module.exports = {
    createProduct
};
