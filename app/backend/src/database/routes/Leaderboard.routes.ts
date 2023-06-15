import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const LeaderboardRoutes = Router();
const controller = new LeaderboardController();

LeaderboardRoutes.get('/leaderboard/home', controller.rankHome);

export default LeaderboardRoutes;
