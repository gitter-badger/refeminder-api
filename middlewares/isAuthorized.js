var config = require('config')
,   jwt = require('jwt-simple')
,   moment = require('moment')
,   isAuthorized = function(req, res, nxt){

    var token = req.query['token'] || req.headers['x-access-token'];

    if(!token){

        var error = { code: 403, message: "Forbidden" };
        res.status(error.code).json(error);

    }else{

        try{

            var decoded = jwt.decode(token, config.get('jwt.secret'));
            var isExpired = moment(decoded.exp).isBefore(new Date());
            if(isExpired){

                var error = { code: 401, message: "Unauthorized" };
                res.status(error.code).json(error);

            }else{

                req.id = decoded.id;
                nxt();

            }

        }catch(err){

            var error = { code: 403, message: "Invalid token" };
            res.status(error.code).json(error);

        }

    }

}

module.exports = isAuthorized;