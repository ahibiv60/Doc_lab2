import express from 'express';
import controller from '../controllers/mobile';

const router = express.Router();

router.post('/create/mobiles', controller.createMobiles);

export = router;
