import { Router } from 'express';
import TeamModel from '../models/Team';

const teamsRouter = Router();

teamsRouter.get('/', async (_req, res) => {
  const teams = await TeamModel.find().populate('captainId', 'name email').populate('memberIds', 'name').lean();
  res.json(teams);
});

export default teamsRouter;
