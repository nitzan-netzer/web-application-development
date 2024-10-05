import express from 'express'
const router = express.Router();
import {blockUser, deleteUser, getAllUsers, removeBlock} from '../controllers/adminController.js'
import {adminMiddleware} from '../middleware/auth.js'

router.delete('/deleteUser', [adminMiddleware,deleteUser])
router.post('/blockUser', [adminMiddleware, blockUser]);
router.post('/removeBlock', [adminMiddleware, removeBlock]);
router.post('/allUsers', [adminMiddleware, getAllUsers]);

export const adminRoutes = router;
