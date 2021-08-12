const router = require('express').Router();

const authController = require('./controller');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/user/update', authController.updateUser);


module.exports = router;