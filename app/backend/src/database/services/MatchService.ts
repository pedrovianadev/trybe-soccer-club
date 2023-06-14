import { ModelStatic } from 'sequelize';
import Teams from '../models/TeamsModel';
import Matches from '../models/MatchesModel';

class MatchService {
  protected model: ModelStatic<Matches> = Matches;

  async getAll(): Promise<Matches[]> {
    return this.model.findAll({ include: [
      { model: Teams, as: 'homeTeam' },
      { model: Teams, as: 'awayTeam' },
    ] });
  }

  async getAllInProgress(inProgress: boolean): Promise<Matches[]> {
    return this.model.findAll(
      {
        where: { inProgress },
        include: [
          { model: Teams, as: 'homeTeam' },
          { model: Teams, as: 'awayTeam' },
        ],
      },
    );
  }
}

export default MatchService;
