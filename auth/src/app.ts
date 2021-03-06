import {
  currentUserMiddleware,
  errorHandlerMiddleware,
  NotFoundError,
} from '@yfomichov/common-node-ts';
import { json } from 'body-parser';
import express from 'express';
import 'express-async-errors';
import { currentUserRouter } from './routes/currentuser';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();

app.use(json());
app.use(currentUserMiddleware);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandlerMiddleware);

export { app };
