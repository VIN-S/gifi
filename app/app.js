//Define an angular module for our app
var app = angular.module('myApp', ["ngRoute"]);
app.config(function ($routeProvider) {

    $routeProvider
    .when('/home',
    {
      templateUrl:    'partials/home.html',
      controller:     'HomeCtrl'
    })
    .when('/ranking',
    {
      templateUrl:    'partials/ranking.html',
      controller:     'RankingCtrl'
    })
    .when('/research_publication',
    {
      templateUrl:    'partials/research_publication.html',
      controller:     'ResearchPublicationCtrl'
    })
    .when('/about',
    {
      templateUrl:    'partials/about.html',
      controller:     'AboutCtrl'
    })
    .otherwise(
    {
      redirectTo:     '/home'
    }
  );
});
 
app.controller('gifiMainController', 
['$scope', '$location', function ($scope, $location) {  
  $scope.navClass = function (page) {
    var currentRoute = $location.path().substring(1) || 'home';
    return page === currentRoute ? 'active' : '';
  };
  
      $scope.loadHome = function () {
        $location.url('/home');
    };
    
      $scope.loadRanking = function () {
        $location.url('/ranking');
    };
    
      $scope.loadResearchPublication = function () {
        $location.url('/research_publication');
    };

      $scope.loadAbout = function () {
        $location.url('/about');
    };
}]);

app.controller('HomeCtrl', function($scope, $compile) {
  console.log('inside home controller');
});

app.controller('RankingCtrl', function($scope, $compile) {
  console.log('inside ranking controller');
});

app.controller('ResearchPublicationCtrl', function($scope, $compile) {
  console.log('inside research & publication controller');
});

app.controller('AboutCtrl', function($scope, $compile) {
  console.log('inside about controller');
});


