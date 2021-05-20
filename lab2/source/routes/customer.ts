import express from 'express';
import controller from '../controllers/customer';

const router = express.Router();

router.get('/get/customers', controller.getCustomers)
router.post('/create/customers', controller.createCustomers);
router.delete('/delete/customer/:id', controller.deleteCustomer);
router.put('/update/customer/:id', controller.updateCustomer)

export = router;
