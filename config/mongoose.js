var configDetail = require('./config'),
	mongoose = require('mongoose');

module.exports = function(){
	var noSqlDb = mongoose.connect(configDetail.dbUrl);

	require('../serverApp/models/inWarehouse');
	require('../serverApp/models/user');
	require('../serverApp/models/profitRecord');
	require('../serverApp/models/soldOut');
	require('../serverApp/models/preOrder');

	return noSqlDb;
}