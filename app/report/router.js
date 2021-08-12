const router = require('express').Router();

const reportController = require('./controller');

router.get('/report', reportController.readAll);

module.exports = router;