import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  private _service: LeaderboardService = new LeaderboardService();

  rankHome = async (_req: Request, res: Response) => {
    const result = await this._service.home();

    return res.status(200).json(result);
  };
}

export default LeaderboardController;
