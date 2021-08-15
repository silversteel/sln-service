const router = require('express').Router();

const employeeController = require('./controller');

router.get('/employees', employeeController.readAll);
router.get('/employees/:id', employeeController.read);
router.get('/employees/with-username/:id', employeeController.readByUsername);
router.post('/employees', employeeController.create);
router.put('/employees', employeeController.update);
router.delete('/employees', employeeController.remove);


module.exports = router;