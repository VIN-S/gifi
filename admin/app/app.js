//Define an angular module for our app
var app = angular.module('myApp', ['ngRoute','chart.js']);

app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
    .when('/dashboard',
    {
      templateUrl:    'partials/dashboard.html',
      controller:     'DashboardCtrl'
    })
    .when('/login',
    {
      templateUrl:    'partials/login.html',
      controller:     'LoginCtrl'
    })
    .otherwise(
    {
      redirectTo:     '/login'
    }
  );
}]);

app.service('cookieService', function() {
  var userName = '';

  var setUserName = function(newUser) {
      userName = newUser;
  };

  var getUserName = function(){
      return userName;
  };

  return {
    setUserName: setUserName,
    getUserName: getUserName
  };
});

app.controller('adminMainController', 
['$scope', '$location', '$http', 'cookieService', function($scope, $location, $http, cookieService) {
    $scope.adminSignIn = function(username, pwd) {
        $http.post("ajax/adminSignIn.php?username="+username+"&pwd="+sha512(pwd))
        .then(function(response) {
            $scope.signinStatus = response.data.status;
            $scope.signinMessage = response.data.message;
            var userName = response.data.userName;
            if($scope.signinStatus === 'success'){
                $location.url('/dashboard');
                cookieService.setUserName(userName);
                
            }else{
            	$scope.failInfo = 'Incorrect username or password';
            	alert($scope.signinMessage);
            }
        }); 
     
    };
}]);

app.controller('DashboardCtrl', function($scope, $compile) {
  console.log('inside dashboard controller');
});

app.controller('LoginCtrl', function($scope, $compile) {
  console.log('inside login controller');
});
