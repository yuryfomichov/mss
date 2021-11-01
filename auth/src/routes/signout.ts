import { BadRequestError } from '@yfomichov/common-node-ts';
import express from 'express';

const router = express.Router();

router.get('/signout', (req, res) => {
  // maybe implement token blocklist in future
  throw new BadRequestError('Not implemented');
});

export { router as signoutRouter };
