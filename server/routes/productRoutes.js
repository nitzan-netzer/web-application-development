import express from 'express'
const router = express.Router();
import {createProduct, updateProduct, deleteProduct} from '../controllers/productController.js'
import {authMiddleware} from '../middleware/auth.js'
import {createImage} from "../middleware/imageUpload.js";

router.post('/create', [authMiddleware, createImage, createProduct]);
router.post('/update', authMiddleware, updateProduct);
router.delete('/product/:productId', authMiddleware, deleteProduct);

export const productRoutes = router;
