var express = require('express')
,   router = express.Router()
,   IndexController = require('../controllers/index');

router.get('/', IndexController.home);

router.post('/log-in', IndexController.login);

module.exports = router;
