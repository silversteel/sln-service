const router = require('express').Router();

const orderController = require('./controller');

router.get('/customers/:id/orders', orderController.readAllByCustomerId);
router.get('/orders', orderController.readAll);
router.get('/orders/:id', orderController.read);
router.post('/orders', orderController.create);
router.put('/orders', orderController.update);
router.delete('/orders', orderController.remove);
router.post('/orders/confirm', orderController.confirmOrder);
router.post('/orders/complete', orderController.completeOrder);

module.exports = router;