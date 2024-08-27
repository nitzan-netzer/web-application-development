const express = require('express');
const router = express.Router();
const { createProduct } = require('../controllers/productController');
const authMiddleware = require('../middleware/auth'); // Middleware to authenticate user

router.post('/create', authMiddleware, createProduct);
// productRoutes.post('/create', authMiddleware, updateProduct);

export const productRoutes = router;
