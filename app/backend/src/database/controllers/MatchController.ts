import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

class MatchController {
  private _service: MatchService = new MatchService();

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

  update = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { message } = await this._service.update(+id);

    return res.status(200).json({ message });
  };

  updateGoals = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { message } = await this._service.updateGoals(req.body, +id);

    return res.status(200).json({ message });
  };

  create = async (req: Request, res: Response) => {
    const { type, message, createdMatche } = await this._service.create(req.body);

    if (type) return res.status(type).json({ message });

    return res.status(201).json(createdMatche);
  };
}

export default MatchController;
