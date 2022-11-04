import { Request, Response, Router } from 'express';
import { Warrior } from '../records/warior.record';
import { Fight } from '../utils/Fight';

export const fightRouter: Router = Router();

fightRouter
  .post('/', async (req, res) => {
    const { id1, id2 } = req.body;

    const warrior1 = await Warrior.getWarrior(id1);
    const warrior2 = await Warrior.getWarrior(id2);

    const newFigth = new Fight(warrior1, warrior2);

    res.json(await newFigth.fight());
  });
