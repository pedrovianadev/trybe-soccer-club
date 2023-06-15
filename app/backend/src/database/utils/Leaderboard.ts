import ILeaderboard from '../../Interfaces/ILeaderboard';
import Matches from '../models/MatchesModel';

type TypeGoals = 'homeTeamGoals' | 'awayTeamGoals';

const arrayGoals: TypeGoals[] = ['homeTeamGoals', 'awayTeamGoals'];

const arrayGoals2: TypeGoals[] = ['awayTeamGoals', 'homeTeamGoals'];

export const count = (match: Matches[], goals: TypeGoals) =>
  match.reduce((acc, curr) => acc + curr[goals], 0);

export const WLD = (matche: Matches[], goals: TypeGoals[]) => {
  let win = 0;
  let loss = 0;
  let draw = 0;

  matche.forEach((e) => {
    if (e[goals[0]] === e[goals[1]]) draw += 1;
    if (e[goals[0]] > e[goals[1]]) win += 1;
    if (e[goals[0]] < e[goals[1]]) loss += 1;
  });

  return { win, loss, draw };
};

export const total = (match: Matches[], goals: TypeGoals[]): number => {
  const { win, draw } = WLD(match, goals);
  return (win * 3) + draw;
};

export const balance = (match: Matches[], goals: TypeGoals[]): number =>
  count(match, goals[0]) - count(match, goals[1]);

export const efficiency = (matche: Matches[], goals: TypeGoals[]): string => {
  const p = total(matche, goals);
  const j = matche.length;
  const result = (p / (j * 3)) * 100;
  return result.toFixed(2);
};

export const efficiencyAll = (home: Matches[], away: Matches[]): string => {
  const points = total(home, arrayGoals) + total(away, arrayGoals2);
  const time = home.length + away.length;
  const result = (points / (time * 3)) * 100;
  return result.toFixed(2);
};

export const results = (teamname: string, match: Matches[], goals: TypeGoals[]) => ({
  name: teamname,
  totalPoints: total(match, goals),
  totalGames: match.length,
  totalVictories: WLD(match, goals).win,
  totalDraws: WLD(match, goals).draw,
  totalLosses: WLD(match, goals).loss,
  goalsFavor: count(match, goals[0]),
  goalsOwn: count(match, goals[1]),
  goalsBalance: balance(match, goals),
  efficiency: efficiency(match, goals),
});

export const orderResults = (teams: ILeaderboard[]) =>
  teams.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
    if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
    if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
    return a.goalsOwn - b.goalsOwn;
  });
