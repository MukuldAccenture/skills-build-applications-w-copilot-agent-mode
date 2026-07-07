import { Router } from 'express';
import WorkoutModel from '../models/Workout';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res) => {
  const workouts = await WorkoutModel.find().sort({ durationMinutes: 1 }).lean();
  res.json(workouts);
});

export default workoutsRouter;
