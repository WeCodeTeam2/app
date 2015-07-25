var diversityApp = angular.module('diversityApp', ['ngRoute', 'diversityAppControllers', 'ezfb']);

diversityApp.config(function (ezfbProvider) {
	ezfbProvider.setInitParams({
		appId: '1458271304475494',
		version: 'v2.4'
	});
});

var diversityAppControllers = angular.module('diversityAppControllers', []);

diversityAppControllers.controller('DivAppController', ['$scope', '$routeParams', '$http', '$location','ezfb', function ($scope, $routeParams, $http, $location, ezfb) {
  $scope.currentCompany = {};
  $scope.currentCompany.data = {};
  $scope.currentCompany.name = $routeParams.company;

  $scope.data = {};

  // this will inform which ratio chart to build
  $scope.ratioChartDataSelection = '';
  $scope.ratioChartData = function(){
    for (var i=0; i < $scope.data.companies.length; i++) {

      // format properly
      var thisCompany = $scope.currentCompany.replace(/-/g, ' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

      if ($scope.data.companies[i]["Company"] = thisCompany) {
        $scope.currentCompany.data = $scope.data.companies[i];
      }
    }
  };

  $scope.data.companies = [
    {
      "Company":"Crowd Compass",
      "Total Employees":620,
      "Metric":{
         "Gender":{
            "Female":160,
            "Male":458,
            "Other":2
         },
         "Ethnicity":{
            "White":475,
            "Latino":40,
            "Asian":70,
            "Black":20,
            "Other":15
         }
      }
   },
   {
      "Company":"Nike",
      "Total Employees":1425,
      "Metric":{
         "Gender":{
            "Female":435,
            "Male":978,
            "Other":12
         },
         "Ethnicity":{
            "White":855,
            "Latino":100,
            "Asian":200,
            "Black":180,
            "Other":90
         }
      }
   },
   {
      "Company":"Puppet Labs",
      "Total Employees":415,
      "Metric":{
         "Gender":{
            "Female":100,
            "Male":305,
            "Other":10
         },
         "Ethnicity":{
            "White":166,
            "Latino":98,
            "Asian":85,
            "Black":62,
            "Other":4
         }
      }
   },
   {
      "Company":"Jama",
      "Total Employees":350,
      "Metric":{
         "Gender":{
            "Female":105,
            "Male":244,
            "Other":1
         },
         "Ethnicity":{
            "White":210,
            "Latino":40,
            "Asian":60,
            "Black":30,
            "Other":10
         }
      }
   },
   {
      "Company":"New Relic",
      "Total Employees":550,
      "Metric":{
         "Gender":{
            "Female":200,
            "Male":343,
            "Other":7
         },
         "Ethnicity":{
            "White":412,
            "Latino":34,
            "Asian":63,
            "Black":28,
            "Other":13
         }
      }
   }
  ];


  updateLoginStatus(updateApiMe);

  $scope.login = function () {
	  ezfb.login(function (res) {
		  if (res.authResponse) {
			  updateLoginStatus(updateApiMe);
			  $location.path('/dashboard');
		  }
	  }, {scope: 'email,user_likes'});
  };

  $scope.logout = function () {
	  ezfb.logout(function () {
		  updateLoginStatus(updateApiMe);
	  });
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
	  when('/selectedCompany',{
		  templateUrl: 'views/selected.html',
	  	  controller:'DivAppController'
	  }).
      when('/company/:company', {
        templateUrl: 'views/company-detail.html',
        controller: 'DivAppController'
      }).
      otherwise({
        redirectTo: '/index.html'
      });
  }]);
