import express from 'express'
const router = express.Router();
import {createProduct, updateProduct, deleteProduct, getProduct, getAllProducts, isUserBlocked, getAllProductsByUserId} from '../controllers/productController.js'
import {authMiddleware} from '../middleware/auth.js'
import {createImage} from "../middleware/imageUpload.js";
import {getAllStatisticsOnProducts} from "../controllers/productController.js";

router.post('/create', [authMiddleware, isUserBlocked, createImage, createProduct]);
router.post('/update/:productId', [authMiddleware, isUserBlocked, createImage, updateProduct]);
router.delete('/product/:productId', [authMiddleware, isUserBlocked, deleteProduct]);
router.get('/products/:productId', [authMiddleware, isUserBlocked, getProduct]);
router.get('/allProducts', [authMiddleware, isUserBlocked, getAllProducts]);
router.get('/allProducts/:userId', [authMiddleware, isUserBlocked, getAllProductsByUserId]);
router.get('/getAllStatisticsOnProducts', [authMiddleware, isUserBlocked, getAllStatisticsOnProducts]);

export const productRoutes = router;
