module.exports = function(app){
	var indexCtrller = require('../controller/indexRender');

	app.get('/',indexCtrller.renderIndexPage);
	app.post('/',indexCtrller.renderIndexPage);
}