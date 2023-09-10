import { request, response } from 'express';
import AuthService from '../services/auth';

class AuthController {
  public async signUp(req: request, res: response): Promise<void> {
    try {
      const { username, password } = req.body;
      const user = await AuthService.signUp(username, password);
      res.json({ user });
    } catch (error) {
      res.status(400).json({ error: 'Sign-up failed' });
    }
  }

  public async login(req: request, res: response): Promise<void> {
    try {
      const { username, password } = req.body;
      const token = await AuthService.login(username, password);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: 'Authentication failed' });
    }
  }

  public async signOut(req: request, res: response): Promise<void> {
    try {
      // Implement sign-out logic here (e.g., invalidating tokens, if necessary).
      res.json({ message: 'Sign-out successful' });
    } catch (error) {
      res.status(500).json({ error: 'Sign-out failed' });
    }
  }
}

export default new AuthController();
