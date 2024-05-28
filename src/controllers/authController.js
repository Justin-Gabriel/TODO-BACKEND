import jwt from 'jsonwebtoken';
import { signupUser, validatePassword } from '../services/authServices.js'
import { generateToken } from '../utils/token.js';

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        const user = await signupUser(fullName, email, password);
        res.status(201).json({ data: { token: user?.accessToken }, message: ' SignUp successfully', error: false})
    } catch (e) {
        res.json({data: null , message: e.message, error: true})
    }

}

export const login = async (req, res) => { 
    const { email, password } = req.body;
    try {
        const user = await validatePassword(email, password);
        if (!user) {
            return res.json({ data: null, message: 'Invalid login credentials', error: true})
        }
        const token = generateToken(user._id);
        res.status(200).json({ data: {token}, message: 'Login successfully', error: false });
    } catch (e) {
        res.json({data: null , message: e.message, error: true})
    }


}

export const validateToken = async (req, res) => { 
    const { token } = req.body;
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if (!user) {
            return res.status(401).json({ data : { valid : false}, message: 'Access denied', error: true})
        } else {
            return res.status(200). json({data : { valid: true}, message: 'Access granted', error: false} )
        }
    } catch (e) {
        return res.status(401).json({ data: { valid: false }, message: 'Access denied', error: true })
    }

}