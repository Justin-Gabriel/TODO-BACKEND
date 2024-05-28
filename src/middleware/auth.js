import jwt from 'jsonwebtoken';
import User from '../models/userModels.js';

const auth = () => async (req, res, next) => {
    const authorization = req.headers.authorization

    if (!authorization) {
        return res.status(401).json({data: null , message: "Authorization token required", error: true})
    }

    const token = authorization.split(' ')[1]?.trim();
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: id }).select('_id');
        if (!user) {
            return res.status(401).json({data: null, message: "User not found", error: true})
        }
        req.userId = user._id
        next()
    } catch (e) {
        res.json({data: null, message: "request is not authorized", error: true})
    }
} 

export default auth;