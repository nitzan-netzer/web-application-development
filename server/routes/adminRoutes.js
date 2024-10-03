import express from 'express'
const router = express.Router();
import {blockUser, deleteUser, getAllUsers} from '../controllers/adminController.js'
import {adminMiddleware} from '../middleware/auth.js'

router.delete('/deleteUser', [adminMiddleware,deleteUser])
router.post('/blockUser', [adminMiddleware, blockUser]);
router.get('/allUsers', [adminMiddleware, getAllUsers]);

export const adminRoutes = router;
