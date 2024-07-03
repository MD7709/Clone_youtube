import express from 'express';
import { login } from './controller/auth.js';
import { updatePoints } from './controller/Point.js';
import { updateChannelData } from './controller/channel.js';

const router = express.Router();

router.post('/login', login);
router.patch('/update/:id', updateChannelData);
router.patch('/updatePoints/:id', updatePoints);

export default router;
