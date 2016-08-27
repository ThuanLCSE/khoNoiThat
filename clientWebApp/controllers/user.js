angular.module('user').controller('UserController', ['$scope','UserService','$location'
	, function ($scope,UserService,$location) {

	$scope.signin = function(){
		var userData = {
                username: $scope.username,
                password: $scope.password,
            };
        UserService.signin({
        	action: 'signin'
        },{
        	user:userData
        },function(response){
            $location.path('/');
        },function(errResponse){
        	$scope.error = 'Sai tên hoặc mật khẩu';
        });
	};
	$scope.signout = function(){
        UserService.signout({
        	action: 'signout'
        },null,function(response){
        	console.log('suceess');
            $location.path('/signin');
        },function(errResponse){
        	console.log('failed');
        });
	};
}]);