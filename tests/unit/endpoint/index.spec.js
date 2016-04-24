var expect = require('chai').expect
,     app = require('../../../app')
,     request = require('supertest')(app)
,     ch = require('charlatan')

,     UserModel = require('../../../models/user');

describe('Endpoint: /', function () {

    describe('GET - / | Get home', function () {

        it('should to result a welcome JSON', function (done) {

            request
                .get('/')
                .end(function(err, result){

                    expect(result.status).to.equal(200);
                    expect(result.headers['content-type']).to.equal('application/json; charset=utf-8');

                    expect(result.body).to.be.an("object");
                    expect(result.body).to.have.property('message');

                    done();

                });
            
        });

    });

    describe('POST - /log-in', function () {

        var register;

        before(function (done) {
            
            var newRegister = new UserModel({ 
                "username": ch.Internet.userName(), 
                "fname": ch.Name.firstName(), 
                "lname": ch.Name.lastName(), 
                "email": ch.Internet.email(),
                "password": ch.Internet.password()
            });
            
            newRegister.save(function(err, user){

                register = user;

                done();
            }) ;

        });

        after(function (done) {
            UserModel.remove({}, function(){  done(); });
        });
        
        it('should to result a token from authentication', function (done) {

            request
                .post('/log-in')
                .send({ "username": register.username, "password": register.password })
                .end(function(err, result){

                    expect(result.status).to.equal(200);
                    expect(result.headers['content-type']).to.equal('application/json; charset=utf-8');

                    expect(result.body).to.be.an("object");
                    expect(result.body).to.have.property('token');

                    done();

                });
            
        });

        it('should to result an object error, because invalid password', function (done) {

             request
                .post('/log-in')
                .send({ "username": register.username, "password": register.password + "whatever" })
                .end(function(err, result){

                    expect(result.status).to.equal(401);
                    expect(result.headers['content-type']).to.equal('application/json; charset=utf-8');

                    expect(result.body).to.be.an("object");
                    expect(result.body.message).to.equal("Unauthorized");

                    done();

                });
            
        });

        it('should to result an object error, because trying access private feature with invalid token', function (done) {

            request
                .delete('/users')
                .set('x-access-token', 'whatever')
                .end(function(err, result){

                    expect(result.status).to.equal(403);
                    expect(result.headers['content-type']).to.equal('application/json; charset=utf-8');

                    expect(result.body).to.be.an("object");
                    expect(result.body.message).to.equal("Invalid token");

                    done();

                });
            
        });

        it('should to result an object error, because trying access private feature without token', function (done) {

            request
                .delete('/users')
                .end(function(err, result){

                    expect(result.status).to.equal(403);
                    expect(result.headers['content-type']).to.equal('application/json; charset=utf-8');

                    expect(result.body).to.be.an("object");
                    expect(result.body.message).to.equal("Forbidden");

                    done();

                });
            
        });

    });
    
});