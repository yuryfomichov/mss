import mongoose from 'mongoose';
import { app } from './app';

const requireEnv = (envs: string[]) => {
  for (const name of envs) {
    if (!process.env[name]) {
      throw new Error(`${name} env must be defined`);
    }
  }
};

const start = async () => {
  requireEnv(['JWT_KEY', 'DB_URI']);

  try {
    await mongoose.connect(process.env.DB_URI!);
    console.log('Auth service is connected to auth mongo db instance');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!');
  });
};

start();
