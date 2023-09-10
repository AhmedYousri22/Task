interface User {
    id: number;        // Unique identifier for the user.
    username: string;  // User's username.
    password: string;  // User's hashed password (for security reasons, do not store plaintext passwords).
  }
  
  export default User;
  