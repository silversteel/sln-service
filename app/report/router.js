const router = require('express').Router();

const customerController = require('./controller');

router.get('/customers', customerController.readAll);
router.get('/customers/:id', customerController.read);
router.post('/customers', customerController.create);
router.put('/customers', customerController.update);
router.delete('/customers', customerController.remove);


module.exports = router;