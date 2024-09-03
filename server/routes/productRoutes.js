import express from 'express'
const router = express.Router();
import {createProduct, updateProduct, deleteProduct} from '../controllers/productController.js'
import {authMiddleware} from '../middleware/auth.js'

router.post('/create', createProduct);
router.post('/update', authMiddleware, updateProduct);
router.delete('/product/:productId', authMiddleware, deleteProduct);

export const productRoutes = router;
