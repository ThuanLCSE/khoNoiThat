module.exports = function(app){
	var profitRecordCtrller = require('../controller/profitRecordDAO');

	app.route('/api/profitRecord/getAll')
	.get(profitRecordCtrller.getAll);
	app.route('/api/profitRecord/add')
	.post(profitRecordCtrller.addRecord);
	app.route('/api/profitRecord/search')
	.post(profitRecordCtrller.searchByMonth);
}