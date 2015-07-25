var diversityAppControllers = angular.module('diversityAppControllers', []);

diversityAppControllers.controller('DivAppController', ['$scope', '$routeParams', function ($scope, $routeParams) {
  $scope.company = $routeParams.company;
}]);

diversityAppControllers.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'DivAppController'
      }).
      when('/dashboard', {
        templateUrl: 'partials/dashboard.html',
        controller: 'DivAppController'
      }).
      when('/company/:company', {
        templateUrl: 'partials/company-detail.html',
        controller: 'DivAppController'
      }).
      otherwise({
        redirectTo: '/partials/dashboard.html'
      });
  }]);