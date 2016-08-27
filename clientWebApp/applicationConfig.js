
var mainAppModuleName = 'khoNoiThat';

var mainAppModule = angular.module(mainAppModuleName,
 ['ngResource','ngRoute','datePicker','user','furniture','profitRecord']);

mainAppModule.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);

if (window.location.hash === '#_=_') window.location.hash = '#!';
// Manually bootstrap the AngularJS application
angular.element(document).ready(function() {
    angular.bootstrap(document, [mainAppModuleName]);
});