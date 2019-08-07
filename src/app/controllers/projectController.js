// Ver recomendações no authController
import express from 'express';
import authMiddleware from '../middlewares/auth';

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
  res.send({ ok: true, user: req.userId });
});

// não use module.exports
module.exports = (app) => app.use('/projects', router);
