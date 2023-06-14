import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const MatchRoutes = Router();

const controller = new MatchController();

MatchRoutes.get('/matches', controller.getAllProgress);

export default MatchRoutes;
