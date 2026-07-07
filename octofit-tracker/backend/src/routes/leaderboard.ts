import { Router } from 'express';
import LeaderboardModel from '../models/Leaderboard';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res) => {
  const leaderboard = await LeaderboardModel.findOne()
    .sort({ weekStart: -1 })
    .populate('entries.userId', 'name email')
    .lean();
  res.json(leaderboard);
});

export default leaderboardRouter;
