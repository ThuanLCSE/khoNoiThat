angular.module('user').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'views/home.html'
		}).
		when('/signin', {
			templateUrl: 'views/signin.html'
		});
	}
]); 