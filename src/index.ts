import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';

import router from './routes/index.routes';

import { connectDatabase } from './connection/db.connect';

import { errorHandler } from './error-handler/error.handler';

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

connectDatabase();

app.get('/health', (req: Request, res: Response) => {
  res.send('Server Is Listening!');
});

app.use('/api', router);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server Is Listening On Port :', process.env.PORT || 3000);
});
