import mysql from 'mysql2/promise'; // Import the mysql2 library
import DB_CONFIG from '../db.config'; // Import your database configuration

class ProductService {
  public async createProduct(userId: number, title: string, image: string, price: number): Promise<number> {
    const connection = await mysql.createConnection('DB_CONFIG');

    try {
      // Insert the new product into the database
      const [insertedProduct] = await connection.execute(
        'INSERT INTO products (user_id, title, image, price) VALUES (?, ?, ?, ?)',
        [userId, title, image, price]
      );

      return insertedProduct.insertId;
    } catch (error) {
      throw error;
    } finally {
      connection.end(); // Close the database connection when done
    }
  }

  public async getProducts(): Promise<any[]> {
    const connection = await mysql.createConnection('DB_CONFIG');

    try {
      // Retrieve a list of products from the database
      const [products] = await connection.execute('SELECT * FROM products');
      return products;
    } catch (error) {
      throw error;
    } finally {
      connection.end(); // Close the database connection when done
    }
  }

  public async getProductById(productId: number): Promise<any | null> {
    const connection = await mysql.createConnection('DB_CONFIG');

    try {
      // Retrieve a specific product by its ID from the database
      const [product] = await connection.execute('SELECT * FROM products WHERE id = ?', [productId]);

      if (product.length === 0) {
        return null; // Product not found
      }

      return product[0];
    } catch (error) {
      throw error;
    } finally {
      connection.end(); // Close the database connection when done
    }
  }

  public async updateProduct(productId: number, title: string, image: string, price: number): Promise<void> {
    const connection = await mysql.createConnection('DB_CONFIG');

    try {
      // Update a specific product by its ID in the database
      await connection.execute(
        'UPDATE products SET title = ?, image = ?, price = ? WHERE id = ?',
        [title, image, price, productId]
      );
    } catch (error) {
      throw error;
    } finally {
      connection.end(); // Close the database connection when done
    }
  }

  public async deleteProduct(productId: number): Promise<void> {
    const connection = await mysql.createConnection('DB_CONFIG');

    try {
      // Delete a specific product by its ID from the database
      await connection.execute('DELETE FROM products WHERE id = ?', [productId]);
    } catch (error) {
      throw error;
    } finally {
      connection.end(); // Close the database connection when done
    }
  }
}

export default new ProductService();
