import express from 'express';
const router = express.Router();
import { register, login, requestToSell } from  '../controllers/authController.js';
import {adminMiddleware} from '../middleware/auth.js'

router.post('/register', register);

router.post('/login',  login);

router.post('/requestToSell', [adminMiddleware, requestToSell])

export const authRoutes = router;
