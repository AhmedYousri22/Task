import { request, response } from 'express';
import UserService from '../services/user';

class UserController {
  public async createUser(req: request, res: response): Promise<void> {
    try {
      const { username, password } = req.body;
      const user = await UserService.createUser(username, password);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create user' });
    }
  }

  public async getUser(req: request, res: response): Promise<void> {
    try {
      const userId = req.params.id;
      const user = await UserService.getUserById(userId);
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: 'User not found' });
    }
  }

  public async updateUser(req: request, res: response): Promise<void> {
    try {
      const userId = req.params.id;
      const { username, password } = req.body;
      const updatedUser = await UserService.updateUser(userId, username, password);
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update user' });
    }
  }

  public async deleteUser(req: request, res: response): Promise<void> {
    try {
      const userId = req.params.id;
      await UserService.deleteUser(userId);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new UserController();
