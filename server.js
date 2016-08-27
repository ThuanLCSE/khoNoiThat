process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'),
	express = require('./config/express');

var mongo_db = mongoose();

var server = express(mongo_db);

server.listen('3013');
console.log('-----Server running at http://localhost:3013/ ------');

module.exports = server;