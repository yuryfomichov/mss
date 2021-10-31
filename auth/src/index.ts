import { json } from 'body-parser';
import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import { NotFoundError } from './errors/not-found-error';
import { currentUserMiddleware } from './middlewares/current-user';
import { errorHandlerMiddleware } from './middlewares/error-handler';
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

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY env should be defined');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Auth service is connected to auth mongo db instance');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!');
  });
};

start();
