import express from 'express';
import { register, login, getMe } from './auth.controller';
import { protect } from '../../middlewares/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

export const AuthRoutes = router;