import { NextFunction, Request, Response, Router } from 'express';
import { Warrior } from '../records/warior.record';
import { ValidationError } from '../utils/errors';

export const warriorRouter: Router = Router();

warriorRouter

  .post('/', async (req: Request, res: Response) => {
    const obj = req.body;

    const warrior = new Warrior(obj);
    const id = await warrior.insert();

    res.redirect(`/warrior/${id}`);
  })

  .get('/new', (req: Request, res: Response) => {
    res.render('pages/new-warrior', {
      title: 'New Warrior',
      addWarrior: false,
    });
  })

  .get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    let addWarrior = false;

    const warrior = await Warrior.getWarrior(id);

    if (warrior) {
      addWarrior = true;
    } else {
      next(new ValidationError('Wojownik o podanym id nie istnieje.'));
      return;
    }

    res.render('pages/new-warrior', {
      title: 'New Warrior',
      addWarrior,
    });
  });
