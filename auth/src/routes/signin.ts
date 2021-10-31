import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequestMiddleware } from '../middlewares/validate-request';
import { User } from '../models/user';
import { Password } from '../services/password';

const router = express.Router();
const LOGIN_FAILED = 'Invalid Credentials';

router.post(
  '/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password is required'),
  ],
  validateRequestMiddleware,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError(LOGIN_FAILED);
    }

    const passwordsMatch = Password.compare(existingUser.password, password);

    if (!passwordsMatch) {
      throw new BadRequestError(LOGIN_FAILED);
    }

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!,
    );

    res.status(201).send({
      jwt: userJwt,
    });
  },
);

export { router as signinRouter };
