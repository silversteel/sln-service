const router = require('express').Router();

const scheduleController = require('./controller');

router.get('/schedules', scheduleController.readAll);
router.post('/schedules/available', scheduleController.readAllAvailableEmployee);
router.get('/schedules/:id', scheduleController.read);
router.post('/schedules', scheduleController.create);
router.put('/schedules', scheduleController.update);
router.delete('/schedules', scheduleController.remove);


module.exports = router;