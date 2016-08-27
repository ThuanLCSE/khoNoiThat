var configDetail = require('./config'),
	http = require('http'),
	expressWebAppFramwrk = require('express'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session');

module.exports = function(database) { 
	var app = expressWebAppFramwrk();
	var server = http.createServer(app);
	
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: configDetail.secretKey
	}));

	app.set('views', './serverApp/view');
	app.set('view engine', 'ejs');

	require('../serverApp/routing/index.js')(app);
	require('../serverApp/routing/user.js')(app);
	require('../serverApp/routing/profitRecord.js')(app);
	require('../serverApp/routing/furniture.js')(app);

	app.use(expressWebAppFramwrk.static('./clientWebApp'));
	return server;
}