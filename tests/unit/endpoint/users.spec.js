var expect = require('chai').expect
,     app = require('../../../app')
,     request = require('supertest')(app)
,     ch = require('charlatan')

,     UserModel = require('../../../models/user');

describe('Endpoint: /users', function () {

    after(function (done) {
        
        UserModel.remove({}, function(){ done(); });

    });

    // GET
    describe('GET - /users | Get all users', function () {
        
        it('should to result an empty array', function (done) {

             request
                .get('/users')
                .end(function(err, result){

                    expect(result.status).to.equal(200);
                    expect(result.headers['content-type']).to.equal('application/json; charset=utf-8');

                    expect(result.body.data).to.be.an("array");

                    done();

                });
            
        });

    });

    // POST
    describe('POST - /users | Create an user', function () {

        var register;

        beforeEach(function (done) {

            register = { 
                "username": ch.Internet.userName(), 
                "fname": ch.Name.firstName(), 
                "lname": ch.Name.lastName(), 
                "email": ch.Internet.email(),
                "password": ch.Internet.password()
            }

            done();
            
        });

        it('should to result an object equal the registered', function (done) {

            request
                .post('/users')
                .send(register)
                .end(function(err, result){

                    expect(result.status).to.equal(201);
                    expect(result.headers['content-type']).to.equal('application/json; charset=utf-8');

                    expect(result.body).to.be.an("object");
                    expect(result.body.data).to.have.any.keys(register);

                    done();

                });
            
        });

        it('should to result an object error, because required field username', function (done) {

            delete register.username;

             request
                    .post('/users')
                    .send(register)
                    .end(function(err, result){

                        expect(result.status).to.equal(500);
                        expect(result.headers['content-type']).to.equal('application/json; charset=utf-8');

                        expect(result.body).to.be.an("object");
                        expect(result.body.err).to.be.true;

                        done();

                    });
        
        });
        
    });

    // GET
    describe('GET - /users/:id | Get the user by ID', function () {

        var register;

        before(function (done) {
            
            UserModel.find({}, function(err, users){

                register = users[0];
    
                done();

            });

        });

        it('should to result an object find by ID', function (done) {

            request
                .get('/users/' + register._id)
                .end(function(err, result){

                    expect(result.status).to.equal(200);
                    expect(result.headers['content-type']).to.equal('application/json; charset=utf-8');

                    expect(result.body.data).to.be.an("object");

                    done();

                });

        });

        it('should to result an object error, because ID not exist', function (done) {

            request
                .get('/users/whatever')
                .end(function(err, result){

                    expect(result.status).to.equal(404);
                    expect(result.headers['content-type']).to.equal('application/json; charset=utf-8');

                    expect(result.body).to.be.an("object");
                    expect(result.body.err).to.be.true;

                    done();

                });

        });
        
    });


    // PUT
    describe('PUT - /users | Update the user register', function () {

        var register, token;

        before(function (done) {
            
            UserModel.find({}, function(err, users){

                register = users[0];

                // Get authentication token
                request
                    .post('/log-in')
                    .send({"username": register.username, "password": register.password})
                    .end(function(err, result){

                        token = result.body.token;

                        done();

                    });

            });

        });

         it('should to result an object updated by token', function (done) {

                var newData = { "username": ch.Internet.userName() }

                request
                    .put('/users')
                    .send(newData)
                    .set('x-access-token', token)
                    .end(function(err, result){

                        expect(result.status).to.equal(200);
                        expect(result.headers['content-type']).to.equal('application/json; charset=utf-8');

                        expect(result.body.data).to.be.an("object");
                        expect(result.body.data).to.not.equal(register);

                        done();

                    });

        });

          it('should to result an object error, because trying update an deleted register', function (done) {

                UserModel.remove({"_id": register._id}, function(){

                     var newData = { "username": ch.Internet.userName() }

                    request
                        .put('/users')
                        .send(newData)
                        .set('x-access-token', token)
                        .end(function(err, result){

                            expect(result.status).to.equal(404);
                            expect(result.headers['content-type']).to.equal('application/json; charset=utf-8');

                            expect(result.body).to.be.an("object");
                            expect(result.body.err).to.be.true;

                            done();

                        });

                });

        });
        
    });


    // DELETE
    describe('DELETE - /users | Delete the user register', function () {

        var register, token;

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

                // Get authentication token
                request
                    .post('/log-in')
                    .send({"username": user.username, "password": user.password})
                    .end(function(err, result){

                        token = result.body.token;

                        done();

                    });

            });

        });

         it('should to result an object deleted info by token', function (done) {

                request
                    .delete('/users')
                    .set('x-access-token', token)
                    .end(function(err, result){

                        UserModel.count(function(err, count){

                            expect(result.status).to.equal(200);
                            expect(result.headers['content-type']).to.equal('application/json; charset=utf-8');

                            expect(result.body).to.be.an("object");
                            expect(result.body.data).to.not.equal(register);

                            expect(count).to.equal(0);

                            done();

                        });

                    });

        });

         it('should to result an object error, because trying to delete an register that does not exist', function (done) {

                request
                    .delete('/users')
                    .set('x-access-token', token)
                    .end(function(err, result){

                        expect(result.status).to.equal(404);
                        expect(result.headers['content-type']).to.equal('application/json; charset=utf-8');

                        expect(result.body).to.be.an("object");
                        expect(result.body.err).to.be.true;

                        done();

                    });

        });
        
    });

});