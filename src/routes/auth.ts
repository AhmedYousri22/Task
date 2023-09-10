import express from 'express';
import AuthController from '../controllers/auth';

const router = express.Router();

// POST /auth/signup - User registration
router.post('/signup', AuthController.signUp);

// POST /auth/login - User login
router.post('/login', AuthController.login);

// POST /auth/signout - User sign-out (placeholder, you can implement if needed)
router.post('/signout', AuthController.signOut);

export default router;
