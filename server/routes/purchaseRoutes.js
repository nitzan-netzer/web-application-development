import express from 'express';
const router = express.Router();
import { purchase } from  '../controllers/purchaseControlloer.js';
import {adminMiddleware} from '../middleware/auth.js'

router.post('/makeTransaction', [adminMiddleware, purchase]);

export const purchaseRoutes = router;
