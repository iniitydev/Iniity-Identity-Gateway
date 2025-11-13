import { Router, Request, Response } from 'express';
import * as UserService from '../../services/userService';

const router = Router();

// GET /api/v1/users/:id
router.get('/:id', (req: Request, res: Response) => {
  try {
    const user = UserService.findUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// POST /api/v1/users
router.post('/', (req: Request, res: Response) => {
  try {
    const newUser = UserService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

export default router;
