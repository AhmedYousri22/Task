import  { createServer }from 'http';
import app from './app'; // Import your Express app
import  DB_CONFIG  from './db.config'; // Import your database configuration




const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
 // res.end('Hello World!\n');
});
// Initialize the MySQL database connection pool
const mysql = require('mysql2/promise');
const db = mysql.createPool(DB_CONFIG);
// Attach the database connection pool to the app object
app.set('db', db);
const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
