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

  $scope.api = function () {
	  ezfb.ui(
		  {
			  method: 'feed',
		  name: 'angular-easyfb API demo',
		  picture: 'http://plnkr.co/img/plunker.png',
		  link: 'http://plnkr.co/edit/qclqht?p=preview',
		  description: 'angular-easyfb is an AngularJS module wrapping Facebook SDK.' + 
		  ' Facebook integration in AngularJS made easy!' + 
		  ' Please try it and feel free to give feedbacks.'
		  },
		  function (res) {
			  // res: FB.ui response
		  }
		  );
  };

  function updateLoginStatus (more) {
	  ezfb.getLoginStatus(function (res) {
		  $scope.loginStatus = res;

		  (more || angular.noop)();
	  });
  }

  function updateApiMe () {
	  ezfb.api('/index.html', function (res) {
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
