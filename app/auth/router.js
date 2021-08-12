const router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const authController = require('./controller');

passport.use(new LocalStrategy(authController.localStrategy));

router.post('/login', authController.login);
router.post('/me', authController.me);
router.post('/logout', authController.logout);
router.post('/register', authController.register);
router.post('/user/update', authController.updateUser);


module.exports = router;