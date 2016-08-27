module.exports = function(app){
	var warehouseCtrller = require('../controller/warehouseDAO');
	var preOrderCtrller = require('../controller/preOrderDAO');
	var soldOutCtrller = require('../controller/soldOutDAO');

	app.route('/api/warehouse/getAll')
	.get(warehouseCtrller.getAll)
	.post(warehouseCtrller.searchByText);
	app.route('/api/warehouse/add')
	.post(warehouseCtrller.addFurniture);
	app.route('/api/warehouse/edit')
	.post(warehouseCtrller.editByCode);
	app.route('/api/warehouse/remove/:furnitureCode')
	.get(warehouseCtrller.removeFurniture);
	app.route('/api/warehouse/searchByCode')
	.post(warehouseCtrller.searchByCode);

	app.route('/api/preOrder/getAll')
	.get(preOrderCtrller.getAll)
	.post(preOrderCtrller.searchByText);
	app.route('/api/preOrder/add')
	.post(preOrderCtrller.addFurniture);
	app.route('/api/preOrder/edit')
	.post(preOrderCtrller.editByCode);
	app.route('/api/preOrder/remove/:furnitureCode')
	.get(preOrderCtrller.removeFurniture);
	app.route('/api/preOrder/searchByCode')
	.post(preOrderCtrller.searchByCode);

	app.route('/api/soldOut/getAll')
	.get(soldOutCtrller.getAll);
	app.route('/api/soldOut/add')
	.post(soldOutCtrller.addFurniture);
	app.route('/api/soldOut/removeAll/')
	.get(soldOutCtrller.removeAll);
}