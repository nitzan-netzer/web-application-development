import express from 'express'
const router = express.Router();
import {createProduct} from '../controllers/productController.js'
import {authMiddleware} from '../middleware/auth.js'   // Middleware to authenticate user

router.post('/create', authMiddleware, createProduct);
// productRoutes.post('/create', authMiddleware, updateProduct);

export const productRoutes = router;
