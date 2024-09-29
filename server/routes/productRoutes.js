import express from 'express'
const router = express.Router();
import {createProduct, updateProduct, deleteProduct, getProduct, getAllProducts} from '../controllers/productController.js'
import {authMiddleware} from '../middleware/auth.js'
import {createImage} from "../middleware/imageUpload.js";
import {getAllStatisticsOnProducts} from "../controllers/productController.js";

router.post('/create', [authMiddleware, createImage, createProduct]);
router.post('/update', [authMiddleware, updateProduct]);
router.delete('/product/:productId', [authMiddleware, deleteProduct]);
router.get('/products/:productId', [authMiddleware, getProduct]);
router.get('/allProducts', [authMiddleware, getAllProducts]);
router.get('/getAllStatisticsOnProducts', [authMiddleware, getAllStatisticsOnProducts]);

export const productRoutes = router;
