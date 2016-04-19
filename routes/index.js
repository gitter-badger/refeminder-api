var express = require('express')
,   router = express.Router()

,   jwt = require('jwt-simple')
,   moment = require('moment')
,   config = require('config')

,   UserModel = require('../models/user');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Refeminder API' });
});

router.post('/log-in', function(req, res, nxt){

    var username = req.body.username;
    var password = req.body.password;

    UserModel.findOne({ "username": username }, function(err, user){

        if(user && user.password === password){

            var expires = moment().add(7, 'days').valueOf();
            var token = jwt.encode({
                id: user._id,
                exp: expires
            }, config.get('jwt.secret'));

            res.status(200).json({ token: token });

        }else{

            var error = { code: 401, message: "Unauthorized" };
            res.status(error.code).json(error);

        }

    });

});

module.exports = router;
