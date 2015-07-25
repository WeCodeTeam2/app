var diversityApp = angular.module('diversityApp', ['ngRoute', 'diversityAppControllers', 'ezfb']);

diversityApp.config(function (ezfbProvider) {
	ezfbProvider.setInitParams({
		appId: '1458271304475494',
		version: 'v2.3'
	});
});

var diversityAppControllers = angular.module('diversityAppControllers', []);

diversityAppControllers.controller('DivAppController', ['$scope', '$routeParams', function ($scope, $routeParams) {
  $scope.company = $routeParams.company;
}]);

diversityAppControllers.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'views/login.html',
        controller: 'DivAppController'
      }).
      when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DivAppController'
      }).
      when('/company/:company', {
        templateUrl: 'views/company-detail.html',
        controller: 'DivAppController'
      }).
      otherwise({
        redirectTo: '/index.html'
      });
  }]);
