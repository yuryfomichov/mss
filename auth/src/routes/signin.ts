import express from 'express';

const router = express.Router();

router.post('/signin', (req, res) => {
  res.send('Hi there sign user');
});

export { router as signinRouter };
