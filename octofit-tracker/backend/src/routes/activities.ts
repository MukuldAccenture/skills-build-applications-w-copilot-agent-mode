import { Router } from 'express';
import ActivityModel from '../models/Activity';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res) => {
  const activities = await ActivityModel.find()
    .sort({ performedAt: -1 })
    .populate('userId', 'name fitnessLevel')
    .lean();
  res.json(activities);
});

export default activitiesRouter;
