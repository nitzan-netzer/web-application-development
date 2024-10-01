import express from 'express'
const router = express.Router();
import {blockUser, deleteUser} from '../controllers/adminController.js'
import {adminMiddleware} from '../middleware/auth.js'

router.delete('/deleteUser', [adminMiddleware,deleteUser])
router.post('/blockUser', [adminMiddleware, blockUser]);

export const adminRoutes = router;
