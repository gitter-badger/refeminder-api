"use strict";

var mongoose = require('mongoose')
,   config = require('config');

mongoose.connect('mongodb://' + config.get("database.uri"));

var conn = mongoose.connection;

module.exports = mongoose;