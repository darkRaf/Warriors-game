import { Request, Response, Router } from 'express';
import { Warrior } from '../records/warior.record';

export const halOfFameRouter: Router = Router();

halOfFameRouter
  .get('/', async (req: Request, res: Response) => {
    const winners = await Warrior.getWinners();

    res.render('pages/hal-fame', {
      title: 'Hal of fame',
      winners,
    });
  })

  .post('/', async (req: Request, res: Response) => {
    const answer = await Warrior.getWinners();

    res.json(answer);
  });
