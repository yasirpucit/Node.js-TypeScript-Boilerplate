import { Router } from 'express';
import { deleteUser, getUser, login, register, updateUser } from '../controllers/user.controller';

import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/sign-in', login);
router.patch('/', authMiddleware, updateUser);
router.delete('/:userId', authMiddleware, deleteUser);
router.get('/', authMiddleware, getUser);

export default router;
