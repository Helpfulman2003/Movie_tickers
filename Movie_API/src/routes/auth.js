import { Router } from 'express';
import authController from '../controller/auth.js';
import middleware from '../middleware/middleware.js';

const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
authRouter.get('/logout', middleware.verifyToken, authController.logout);
authRouter.put(
  '/update',
  middleware.verifyToken,
  authController.updateEmployee
);

// Chỉ admin mới có quyền truy cập
authRouter.get(
  '/admin',
  middleware.verifyToken,
  middleware.verifyAdmin,
  (req, res) => {
    res.status(200).json({ message: 'Welcome, Admin!' });
  }
);

export default authRouter;
