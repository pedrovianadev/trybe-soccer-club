import { ModelStatic } from 'sequelize';
import Teams from '../models/TeamsModel';
import Matches from '../models/MatchesModel';
import IResponse from '../../Interfaces/IResponse';
import IGoals from '../../Interfaces/IGoals';
import IDoneMatches from '../../Interfaces/IDoneMatches';

class MatchService {
  protected model: ModelStatic<Matches> = Matches;
  protected teamModel: ModelStatic<Teams> = Teams;

  async getAll(): Promise<Matches[]> {
    return this.model.findAll({ include: [
      { model: Teams, as: 'homeTeam' },
      { model: Teams, as: 'awayTeam' },
    ] });
  }

  async getAllProgress(inProgress: boolean): Promise<Matches[]> {
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

  async update(id: number): Promise<IResponse> {
    await this.model.update({ inProgress: false }, { where: { id } });

    return { message: 'Finished' };
  }

  async updateGoals(body: IGoals, id: number): Promise<IResponse> {
    await this.model.update(body, { where: { id } });

    return { message: 'updated goals' };
  }

  async create(body: IDoneMatches): Promise<IResponse> {
    const { homeTeamId, awayTeamId } = body;

    const findHomeTeam = await this.teamModel.findByPk(homeTeamId);

    if (!findHomeTeam) return { type: 404, message: 'There is no team with such id!' };

    const findAwayTeam = await this.teamModel.findByPk(awayTeamId);

    if (!findAwayTeam) return { type: 404, message: 'There is no team with such id!' };

    if (homeTeamId === awayTeamId) {
      return {
        type: 422,
        message: 'It is not possible to create a match with two equal teams',
      };
    }

    const created = await this.model.create({
      ...body,
      inProgress: true,
    });

    return { createdMatche: created };
  }
}

export default MatchService;
