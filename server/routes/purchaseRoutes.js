import express from 'express';
const router = express.Router();
import { purchase } from  '../controllers/purchaseControlloer.js';

router.post('/makeTransaction', purchase);

export const purchaseRoutes = router;
