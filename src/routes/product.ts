import express from 'express';
import ProductController from '../controllers/product';
import authenticateJWT from '../middleware/auth';

const router = express.Router();

// POST /products - Create a new product (requires authentication)
router.post('/products', authenticateJWT, ProductController.createProduct);

// GET /products - Retrieve a list of products
router.get('/products', ProductController.getProducts);

// GET /products/:id - Retrieve a specific product by ID
router.get('/products/:id', ProductController.getProducts);

// PUT /products/:id - Update a product by ID (requires authentication)
router.put('/products/:id', authenticateJWT, ProductController.updateProduct);

// DELETE /products/:id - Delete a product by ID (requires authentication)
router.delete('/products/:id', authenticateJWT, ProductController.deleteProduct);

export default router;
