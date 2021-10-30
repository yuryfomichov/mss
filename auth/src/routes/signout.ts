import express from 'express';

const router = express.Router();

router.post('/signout', (req, res) => {
  res.send('Hi there current user');
});

export { router as signoutRouter };
