import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface userJwtObject {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: userJwtObject;
    }
  }
}

export const currentUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { headers } = req;

  if (!headers.authorization) {
    return next();
  }

  try {
    const token = headers.authorization.replace('Bearer ', '');

    const decoded = jwt.verify(token, process.env.JWT_KEY!) as userJwtObject;
    req.currentUser = decoded;
  } catch (err) {}

  next();
};
