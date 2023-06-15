import { ModelStatic } from 'sequelize';
import { orderResults, results } from '../utils/Leaderboard';
import Teams from '../models/TeamsModel';
import Matches from '../models/MatchesModel';
import ITeamLeaderboard from '../../Interfaces/ILeaderboard';

class LeaderboardService {
  protected modelMatches: ModelStatic<Matches> = Matches;
  protected modelTeams: ModelStatic<Teams> = Teams;

  async home(): Promise<ITeamLeaderboard[]> {
    const team = await this.modelTeams.findAll();

    const matches = await this.modelMatches.findAll({ where: { inProgress: false } });

    const result: ITeamLeaderboard[] = [];

    team.forEach((t) => {
      const match = matches.filter((m) => m.homeTeamId === t.id);
      result.push(results(t.teamName, match, ['homeTeamGoals', 'awayTeamGoals']));
    });

    return orderResults(result);
  }
}

export default LeaderboardService;
