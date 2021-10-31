import express from 'express';
import { requireAuthMiddleware } from '../middlewares/require-auth';

const router = express.Router();

router.get('/currentuser', requireAuthMiddleware, async (req, res) => {
  return res.status(200).send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
