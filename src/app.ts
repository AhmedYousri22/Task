import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import AuthRoutes from './routes/auth';
import ProductRoutes from './routes/product';
import UserRoutes from './routes/user';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/auth', AuthRoutes);
app.use('/products', ProductRoutes);
app.use('/users', UserRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
