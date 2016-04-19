var express = require('express');
var router = express.Router();
var isAuthorized = require('../middlewares/isAuthorized');
var UserController = require('../controllers/user');

router.post('/', UserController.create);

router.get('/', UserController.retrieve);

router.get('/:_id', UserController.retrieveById);

router.put('/', isAuthorized, UserController.update);

router.delete('/', isAuthorized, UserController.delete);

module.exports = router;
