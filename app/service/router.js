const router = require('express').Router();

const serviceController = require('./controller');

router.get('/services', serviceController.readAll);
router.get('/services/:id', serviceController.read);
router.post('/services', serviceController.create);
router.put('/services', serviceController.update);
router.delete('/services', serviceController.remove);

module.exports = router;