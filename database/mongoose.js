"use strict";

var mongoose = require('mongoose')
,   config = require('config')
,   colors = require('colors');

var uri = function(){

    var user = config.get('database.user')
    ,   password = config.get('database.password')
    ,   host = config.get('database.host')
    ,   port = config.get('database.port')
    ,   name = config.get('database.name');

    var auth = user ? user + ":" + password + "@" : "";
    port = port ? ':' + port : '';

    return 'mongodb://' + auth + host + port + "/" + name;

}

mongoose.connect(uri());

var conn = mongoose.connection;

conn.on('error', function(err){ console.log('Database:'.red, err); });

conn.once('open', function(cb){ console.log('Database:'.green, 'Connection opened on:', config.get('database.name')); });

module.exports = mongoose;