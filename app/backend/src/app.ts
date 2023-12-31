import * as express from 'express';
import TeamRoutes from './database/routes/Team.routes';
import UserRoutes from './database/routes/User.routes';
import MatchRoutes from './database/routes/Match.routes';
import leaderboardRoutes from './database/routes/Leaderboard.routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    // Pra rodar o evaluator dnv
    this.app.use(TeamRoutes);

    this.app.use(UserRoutes);

    this.app.use(MatchRoutes);

    this.app.use(leaderboardRoutes);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
