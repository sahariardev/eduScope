import jwt from 'jsonwebtoken';
import {findUserByEmail} from "../services/user.service.js";

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.jwt;

    if(!token) {
        return res.status(401).json({
            message: 'Unauthorized user'
        });
    }

    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userEmail = decodeToken.email
        req.user = await findUserByEmail(req.userEmail);
        next();
    } catch (e) {
        console.log(e);
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
}