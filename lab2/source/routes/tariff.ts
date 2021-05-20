import express from 'express';
import controller from '../controllers/tariff';

const router = express.Router();

router.get('/get/tariffs', controller.getTariffs)
router.post('/create/tariffs', controller.createTariffs);
router.delete('/delete/tariff/:id', controller.deleteTariff);
router.put('/update/tariff/:id', controller.updateTariff)

export = router;
