import express from 'express';

const router = express.Router();

router.get('/currentuser', async (req, res) => {
  return res.status(200).send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
