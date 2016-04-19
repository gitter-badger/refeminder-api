var UserController = require('../../../controllers/user')
,   expect = require('chai').expect
,   http = require('http')
,   app = require('../../../app')
,   config = require('config');

describe('UserController', function () {
    
    var server;

    before(function () {
        server = http.createServer(app);
        server.listen(config.get('app.port'));
    });

    xit('Hello', function (done) {
        
    });

});