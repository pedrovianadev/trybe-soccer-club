import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

class MatchController {
  private _service: MatchService = new MatchService();

  getAll = async (_req: Request, res: Response) => {
    const result = await this._service.getAll();

    return res.status(200).json(result);
  };

  getAllProgress = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (!inProgress) {
      const result = await this._service.getAll();

      return res.status(200).json(result);
    }

    const validBoolean = inProgress === 'true';

    const result = await this._service.getAllProgress(validBoolean);

    return res.status(200).json(result);
  };
}

export default MatchController;
