import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import  JWT_SECRET from '../db.config'; // Make sure to define your JWT secret in a configuration file.

const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      res.status(403).json({ error: 'Invalid token' });
      return;
    }
    req.user = user;
    next();
  });
};

export default authenticateJWT;
