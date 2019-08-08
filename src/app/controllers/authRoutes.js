
import express from 'express';
import register from './auth/register';
import authenticate from './auth/authenticate';

const router = express.Router();

router.post('/register', register);
router.post('/authenticate', authenticate);

export default app => app.use('/auth', router);
