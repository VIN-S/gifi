//Define an angular module for our app
var app = angular.module('myApp', ["ngRoute"]);
app.config(function ($routeProvider) {

    $routeProvider.when('/home',
    {
      templateUrl:    'home.html'
    }).when('/about',
    {
      templateUrl:    'about.html'
    }).when('/contact',
    {
      templateUrl:    'contact.html'
    }).otherwise(
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
    
      $scope.loadAbout = function () {
        $location.url('/about');
    };
    
      $scope.loadContact = function () {
        $location.url('/contact');
    };
}]);


