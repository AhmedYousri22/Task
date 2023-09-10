import express from 'express';
import UserController from '../controllers/user';
import authenticateJWT from '../middleware/auth';

const router = express.Router();

// POST /users - Create a new user (registration)
router.post('/users', UserController.createUser);

// GET /users/:id - Retrieve a specific user by ID
router.get('/users/:id', UserController.getUser);

// PUT /users/:id - Update user details (requires authentication)
router.put('/users/:id', authenticateJWT, UserController.updateUser);

// DELETE /users/:id - Delete a user (requires authentication)
router.delete('/users/:id', authenticateJWT, UserController.deleteUser);

export default router;
