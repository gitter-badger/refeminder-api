var UserModel = require('../models/user')
,   UserController = {

    create: function(req, res, nxt){

        var model = new UserModel(req.body);
        model.save(function(err, data){
            if(!err){
                var success = { code: 201, message: "Great, your register was created", data: data, err: false };
                res.status(success.code).json(success);   
            }else{
                var error = { code: 500, message: "Sorry, but your register wasn't created", data: err, err: true };
                res.status(error.code).json(error);   
            }
        });

    },

    retrieve: function(req, res, nxt){

        UserModel.find({}, function(err, data){
            res.status(200).json(data);
        });

    },

    retrieveById: function(req, res, nxt){

        UserModel.findOne({ "_id": req.params._id }, function(err, data){
            res.status(200).json(data);
        });

    },

    update: function(req, res, nxt){

        var conditions = { "_id": req.id }
        , update = { $set: req.body }
        , options = { multi: false };

        UserModel.update(conditions, update, options, function(err, data){
            if(data.nModified === 1){
                var success = { code: 200, message: "Great, your register was updated", err: false };
                res.status(success.code).json(success);
            }else{
                var error = { code: 500, message: "Sorry, but your register wasn't updated", err: true };
                res.status(error.code).json(error);
            }
        });

    },

    delete: function(req, res, nxt){

        UserModel.remove({ "_id": req.id }, function(err, data){
            if(data.ok >= 1 && data.result.n >= 1){
                var success = { code: 200, message: "Great, your register was deleted", err: false };
                res.status(success.code).json(success);
            }else{
                var error = { code: 500, message: "Sorry, but your register wasn't deleted", err: true };
                res.status(error.code).json(error);
            }
        });

    }

}

module.exports = UserController;