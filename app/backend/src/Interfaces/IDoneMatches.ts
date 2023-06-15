import IGoals from './IGoals';

export default interface IDoneMatches extends IGoals {
  homeTeamId: number;
  awayTeamId: number;
}
