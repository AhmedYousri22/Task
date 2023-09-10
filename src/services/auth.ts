import mysql from 'mysql2/promise'; // Import the mysql2 library
import jwt from 'jsonwebtoken';
import  JWT_SECRET  from '../db.config'; // Import your JWT secret

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'Task',
};

class AuthService {
  // ...

  public async signUp(username: string, password: string): Promise<string> {
    const connection = await mysql.createConnection(dbConfig);

    try {
      // Check if the user with the same username already exists
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE username = ?',
        [username]
      );

      if (rows.length > 0) {
        throw new Error('Username already exists');
      }

      // Hash the password (you should use a proper password hashing library)
      // For example, you can use bcrypt
      const hashedPassword = 'hashed_password_here'; // Replace with actual hashing logic

      // Insert the new user into the database
      const [insertedUser] = await connection.execute(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hashedPassword]
      );

      // Generate a JWT token upon successful registration
      const user = { id: insertedUser.insertId, username };
      const token = jwt.sign(user, JWT_SECRET);
      return token;
    } catch (error) {
      throw error;
    } finally {
      connection.end(); // Close the database connection when done
    }
  }

  public async login(username: string, password: string): Promise<string> {
    const connection = await mysql.createConnection(dbConfig);

    try {
      // Retrieve the user from the database by username
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE username = ?',
        [username]
      );

      if (rows.length === 0) {
        throw new Error('User not found');
      }

      // Here, you should compare the hashed password with the provided password
      // You should use a proper password hashing library like bcrypt for this
      // Replace 'hashed_password_in_db' with the actual hashed password in the database
      const hashedPasswordInDb = 'hashed_password_in_db'; // Replace with actual hashed password

      // For example, using bcrypt:
      // const passwordsMatch = await bcrypt.compare(password, hashedPasswordInDb);
      // if (!passwordsMatch) {
      //   throw new Error('Invalid password');
      // }

      // For simplicity, let's assume the password is valid (replace this with proper password comparison)
      // If the password is valid, generate a JWT token
      const user = { id: rows[0].id, username };
      const token = jwt.sign(user, JWT_SECRET);
      return token;
    } catch (error) {
      throw error;
    } finally {
      connection.end(); // Close the database connection when done
    }
  }

  // ...
}

export default new AuthService();
