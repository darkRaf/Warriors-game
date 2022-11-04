import { Request, Response, Router } from 'express';
import { Warrior } from '../records/warior.record';

export const homeRouter: Router = Router();

homeRouter

  .get('/', async (req, res) => {
    const warriors = await Warrior.getAllName();

    res.render('pages/arena', {
      title: 'Warriors Game',
      warriors,
    });
  })

  .post('/is-unique-name', async (req: Request, res: Response) => {
    const { name } = req.body;

    const answer = await Warrior.checkUniqueName(name);
    res.json(answer);
  })
