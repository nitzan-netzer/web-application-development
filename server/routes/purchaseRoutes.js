import express from 'express';
const router = express.Router();
import { purchase } from  '../controllers/purchaseControlloer.js';
import {authMiddleware} from '../middleware/auth.js'

router.post('/makeTransaction', [authMiddleware, purchase]);

export const purchaseRoutes = router;
