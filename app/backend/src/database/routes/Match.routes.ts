import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import verifyToken from '../middlewares/checkToken';

const MatchRoutes = Router();

const controller = new MatchController();

MatchRoutes.get('/matches', controller.getAllProgress);

MatchRoutes.patch('/matches/:id/finish', verifyToken, controller.update);

MatchRoutes.patch('/matches/:id', verifyToken, controller.updateGoals);

MatchRoutes.post('/matches', verifyToken, controller.create);

export default MatchRoutes;
