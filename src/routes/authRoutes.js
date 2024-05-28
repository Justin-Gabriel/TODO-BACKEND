import express from 'express';
import validateRequest from '../middleware/validRequest.js';
import { signupSchema, loginSchema } from '../utils/joiSchemas.js';
import { signup, login, validateToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', validateRequest(signupSchema), signup);
router.post('/login', validateRequest(loginSchema), login)
router.post('/validate-token', validateToken)

export default router;