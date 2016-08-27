angular.module('furniture').factory('FurnitureService', ['$resource',
	function($resource) {
	return $resource('api/:warehouseType/:action/:furnitureCode', null,
	 {
	 	getAllFurniture: {
	 		method: 'GET',
	 		 isArray: true
	 	},
	 	addWarehouseFurniture: {
	 		method: 'POST'
	 	},
	 	editWarehouseByCode: {
	 		method: 'POST'
	 	},
	 	searchWarehouseByText: {
	 		isArray: true,
	 		method: 'POST'
	 	},
	 	searchWarehouseByCode :{
	 		method: 'POST'
	 	},
	 	removeWarehouseByCode: {
	 		method: 'GET'
	 	},
	 	addPreOrderFurniture: {
	 		method: 'POST'
	 	},
	 	editPreOrderByCode: {
	 		method: 'POST'
	 	},
	 	searchPreOrderByText: {
	 		isArray: true,
	 		method: 'POST'
	 	},
	 	searchPreOrderByCode :{
	 		method: 'POST'
	 	},
	 	removePreOrderByCode: {
	 		method: 'GET'
	 	},
	 	addSoldOutFurniture: {
	 		method: 'POST'
	 	},
	 	searchSoldOutByText: {
	 		isArray: true,
	 		method: 'POST'
	 	},
	 	removeAllSoldOut: {
	 		method: 'GET'
	 	}
	 });
}]);