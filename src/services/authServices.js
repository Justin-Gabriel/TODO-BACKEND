import bcrypt from 'bcrypt';
import { generateToken } from '../utils/token.js'
import User from '../models/userModels.js'

export const signupUser = async (fullName, email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ fullName, email, password: hashedPassword });
        
        const accessToken = generateToken(user._id)
    
        return {user, accessToken}
    } catch (e) {
        if (e.code === 11000 && e.keyPattern.email) {
            throw new Error('Email already exists');
        } else {
            throw new Error(e.message)
        }
    }

}

export const validatePassword = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) return false;
        const matchPassword = await bcrypt.compare(password, user.password)
        return matchPassword ? user : null
    } catch (e) {
        throw new Error(e.message)
    }

}