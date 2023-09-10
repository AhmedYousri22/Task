import mysql from 'mysql2/promise'; // Import the mysql2 library
import DB_CONFIG from '../db.config'; // Import your database configuration

class UserService {
  public async createUser(username: string, password: string): Promise<number> {
    const connection = await mysql.createConnection('DB_CONFIG');

    try {
      // Insert the new user into the database
      const [insertedUser] = await connection.execute(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, password]
      );

      return insertedUser.insertId;
    } catch (error) {
      throw error;
    } finally {
      connection.end(); // Close the database connection when done
    }
  }

  public async getUserById(userId: number): Promise<any | null> {
    const connection = await mysql.createConnection('DB_CONFIG');

    try {
      // Retrieve a specific user by their ID from the database
      const [user] = await connection.execute('SELECT * FROM users WHERE id = ?', [userId]);

      if (user.length === 0) {
        return null; // User not found
      }

      return user[0];
    } catch (error) {
      throw error;
    } finally {
      connection.end(); // Close the database connection when done
    }
  }

  public async updateUser(userId: number, username: string, password: string): Promise<void> {
    const connection = await mysql.createConnection('DB_CONFIG');

    try {
      // Update a specific user by their ID in the database
      await connection.execute(
        'UPDATE users SET username = ?, password = ? WHERE id = ?',
        [username, password, userId]
      );
    } catch (error) {
      throw error;
    } finally {
      connection.end(); // Close the database connection when done
    }
  }

  public async deleteUser(userId: number): Promise<void> {
    const connection = await mysql.createConnection('DB_CONFIG');

    try {
      // Delete a specific user by their ID from the database
      await connection.execute('DELETE FROM users WHERE id = ?', [userId]);
    } catch (error) {
      throw error;
    } finally {
      connection.end(); // Close the database connection when done
    }
  }
}

export default new UserService();
