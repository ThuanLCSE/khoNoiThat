angular.module('profitRecord').factory('ProfitRecordService', ['$resource',
	function($resource) {
	return $resource('api/profitRecord/:action', null,
	 {
	 	getAll: {
	 		method: 'GET',
	 		isArray: true
	 	},
	 	addRecord: {
	 		method: 'POST'
	 	},
	 	searchByMonth:{
	 		method: 'POST',
	 		isArray: true
	 	}
	 });
}]);