var UserModel = require('../models/user')
,     UserController = {

    create: function(req, res, nxt){

        var model = new UserModel(req.body);
        model.save(function(err, data){

            var response = !err 
                ? { code: 201, message: "Great, your register was created", err: false, data: data } 
                :  { code: 500, message: "Sorry, but your register wasn't created", err: true };
    
            res.status(response.code).json(response);

        });

    },

    retrieve: function(req, res, nxt){

        UserModel.find({}, function(err, data){

             var response = { code: 200,  message: "Great, all registers was retrieved",  err: false, data: data };

            res.status(response.code).json(response);
            
        });

    },

    retrieveById: function(req, res, nxt){

        UserModel.findOne({ "_id": req.params._id }, function(err, data){

            var response = data
                ? { code: 200,  message: "Great, your register was retrieved", err: false,  data: data }
                :  { code: 404, message: "Sorry, but your register wasn't retrieved", err: true };
            
            res.status(response.code).json(response);
    
        });

    },

    update: function(req, res, nxt){

        var conditions = { "_id": req.id }
        , update = { $set: req.body }
        , options = { new: true };

        UserModel.findOneAndUpdate(conditions, update, options, function(err, data){

            var response = data && !err
                ? { code: 200, message: "Great, your register was updated", err: false, data: data }
                :  { code: 404, message: "Sorry, but your register wasn't updated", err: true };

            res.status(response.code).json(response);
            
        });

    },

    delete: function(req, res, nxt){

        UserModel.remove({ "_id": req.id }, function(err, data){

            var response = data.result.ok >= 1 && data.result.n >= 1
                ? { code: 200, message: "Great, your register was deleted", err: false }
                :  { code: 404, message: "Sorry, but your register wasn't deleted", err: true };

            res.status(response.code).json(response);
            
        });

    }

}

module.exports = UserController;