import express from 'express';
const router = express.Router();
import { register, login, requestToSell, updatePersonalDetails } from  '../controllers/authController.js';
import {authMiddleware} from '../middleware/auth.js'

router.post('/register', register);

router.post('/login',  login);

router.post('/updatePersonalDetails',  [authMiddleware, updatePersonalDetails]);

router.post('/requestToSell', [authMiddleware, requestToSell])

export const authRoutes = router;
