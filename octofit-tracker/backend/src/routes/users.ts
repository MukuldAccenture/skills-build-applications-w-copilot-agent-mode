import { Router } from 'express';
import UserModel from '../models/User';

const usersRouter = Router();

usersRouter.get('/', async (_req, res) => {
  const users = await UserModel.find().sort({ name: 1 }).lean();
  res.json(users);
});

export default usersRouter;
