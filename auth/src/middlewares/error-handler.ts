import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error('Something wend wrong', err);
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  res.status(400).send({ message: err.message });
};
