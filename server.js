process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'),
	express = require('./config/express');

var mongo_db = mongoose();

var server = express(mongo_db);

server.listen(process.env.PORT || 8080);

module.exports = server;