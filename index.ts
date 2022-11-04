import * as express from 'express';
import { static as exStatic, json, urlencoded } from 'express';
import { engine } from 'express-handlebars';
import { fightRouter } from './routers/fight';
import { halOfFameRouter } from './routers/hal-of-fame';
import { homeRouter } from './routers/home';
import { warriorRouter } from './routers/warrior';
import { handleError, ValidationError } from './utils/errors';
import { handlebarsHelpers } from './utils/handlebars-helpers';

const PORT = 3000;
const HOST = `localhost`;
const app = express();

app.use(exStatic('public'));
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());

app.engine(
  '.hbs',
  engine({
    extname: '.hbs',
    helpers: handlebarsHelpers,
  })
);

app.set('view engine', '.hbs');
app.use('/', homeRouter);
app.use('/warrior', warriorRouter);
app.use('/hal-of-fame', halOfFameRouter);
app.use('/fight', fightRouter);
app.use('/*', () => {
  throw new ValidationError('Podany adres nie istnieje.');
})

app.use(handleError);

app.listen(PORT, HOST, () => {
  console.log(`Server work http://${HOST}:${PORT}`);
});
