const router = require('express').Router();

const orderDetailController = require('./controller');

router.get('/orders/:id/details', orderDetailController.readAll);
router.post('/orders/details', orderDetailController.create);
router.delete('/orders/details', orderDetailController.remove);


module.exports = router;