var diversityApp = angular.module('diversityApp', ['ngRoute', 'diversityAppControllers', 'ezfb']);

diversityApp.config(function (ezfbProvider) {
	ezfbProvider.setInitParams({
		appId: '1458271304475494',
		version: 'v2.3'
	});
});

var diversityAppControllers = angular.module('diversityAppControllers', []);

diversityAppControllers.controller('DivAppController', ['$scope', '$routeParams', 'ezfb', function ($scope, $routeParams, ezfb) {
  $scope.company = $routeParams.company;

  updateLoginStatus(updateApiMe);

  $scope.login = function () {
	  ezfb.login(function (res) {
		  if (res.authResponse) {
			  updateLoginStatus(updateApiMe);
		  }
	  }, {scope: 'email,user_likes'});
  };

  function updateLoginStatus (more) {
	  ezfb.getLoginStatus(function (res) {
		  $scope.loginStatus = res;

		  (more || angular.noop)();
	  });
  }

  function updateApiMe () {
	  ezfb.api('/me', function (res) {
		  $scope.apiMe = res;
	  });
  }
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
