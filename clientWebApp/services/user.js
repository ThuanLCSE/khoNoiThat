angular.module('user').factory('UserService', ['$resource',
	function($resource) {
	return $resource('api/user/:action', null,
	 {
	 	signin: {
	 		method: 'POST'
	 	},
	 	signout: {
	 		method: 'GET'
	 	},
	 	checkAuthenticated: {
	 		method: 'GET'
	 	}
	 });
}]);