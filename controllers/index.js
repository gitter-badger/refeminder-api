var UserModel = require('../models/user')

,     jwt = require('jwt-simple')
,     moment = require('moment')
,     config = require('config')

,     IndexController = {

    home: function(req, res, nxt){

        res.status(200).json({"message": "Welcome Refeminder API"});

    },

    login: function(req, res, nxt){

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

    }

}

module.exports = IndexController;