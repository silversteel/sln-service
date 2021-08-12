const router = require('express').Router();

const customerController = require('./controller');

router.get('/orders/:id/details', customerController.readAll);
router.post('/orders/details', customerController.create);
router.delete('/orders/details', customerController.remove);


module.exports = router;