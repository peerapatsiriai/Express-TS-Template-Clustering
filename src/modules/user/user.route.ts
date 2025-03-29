import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/register', UserController.register);
router.get('/', UserController.getUsers);

export default router;
