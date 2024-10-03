import jwt from 'jsonwebtoken';
import {adminSecret, mySecret} from '../config/secrets.js'

export const authMiddleware = (req, res, next) => {
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
};
export const adminMiddleware = (req,res,next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try{
        const decoded = jwt.verify(token, adminSecret);
        req.user = decoded.user;
        if(!req.user.isAdmin){
            return res.status(401).json({msg: 'Permission denied'});
        }
        next();
    } catch (err){
        res.status(401).json({ msg: 'Token is not valid' });
    }
}
