import jwt from 'jsonwebtoken';
import {adminSecret, mySecret} from '../config/secrets.js'
import {User} from "../models/user.js";

export async function authMiddleware(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, mySecret);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}

export async function adminMiddleware(req,res,next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, adminSecret);

        const { userId } = req.body;
        if (decoded.userId !== userId || !decoded.isAdmin) {
            return res.status(401).json({msg: 'Permission denied'});
        }

        next();
    } catch (err){
        res.status(401).json({ msg: 'Token is not valid' });
    }
}
