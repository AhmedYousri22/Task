import { request, response } from 'express';
import ProductService from '../services/product';

class ProductController {
  public async createProduct(req: request, res: response): Promise<void> {
    try {
      const { title, image, price } = req.body;
      const userId = req.user.id; // Assuming user is authenticated with JWT
      const product = await ProductService.createProduct(userId, title, image, price);
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create product' });
    }
  }

  public async getProducts(req: request, res: response): Promise<void> {
    try {
      const products = await ProductService.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async updateProduct(req: request, res: response): Promise<void> {
    try {
      const productId = req.params.id;
      const { title, image, price } = req.body;
      const updatedProduct = await ProductService.updateProduct(productId, title, image, price);
      res.json(updatedProduct);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update product' });
    }
  }

  public async deleteProduct(req: request, res: response): Promise<void> {
    try {
      const productId = req.params.id;
      await ProductService.deleteProduct(productId);
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new ProductController();
