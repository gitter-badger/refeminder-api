var expect = require('chai').expect
,     app = require('../../../app')
,     request = require('supertest')(app)
,     ch = require('charlatan')

,     UserModel = require('../../../models/user');

describe('Generic errors', function () {

    describe('404 - Not found', function () {

        it('should to result error not found 404, because access request an route that not exist', function (done) {

            request
                .get('/whatever')
                .end(function(err, result){

                    expect(result.status).to.equal(404);
                    expect(result.headers['content-type']).to.equal('application/json; charset=utf-8');

                    expect(result.body).to.be.an("object");
                    expect(result.body.method).to.equal( result.error.method);
                    expect(result.body.message).to.equal("Sorry, but feature " + result.error.path + " not found, fork it");
                    expect(result.body.project_url).to.eql("https://www.github.com/refeminder/refeminder-api");

                    done();

                });
            
        });

    });
    
});