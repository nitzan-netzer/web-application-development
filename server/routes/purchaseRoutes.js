import express from 'express';
const router = express.Router();
import { purchase } from  '../controllers/purchaseControlloer.js';

router.post('/purchase', purchase);

export const purchaseRoutes = router;
