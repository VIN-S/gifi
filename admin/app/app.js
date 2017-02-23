//Define an angular module for our app
var app = angular.module('myApp', []);
 
app.controller('gifiAdminController', function($scope, $http, $window) {
  $scope.adminSignIn = function(username, pwd) {
    $http.post("ajax/adminSignIn.php?username="+username+"&pwd="+pwd)
    .then(function(response) {
        $scope.signinStatus = response.data.status;
        $scope.signinMessage = response.data.message;
        if($scope.signinStatus === 'success'){
        	$window.location.href = 'partials/dashboard.html';
        }else{
        	$scope.failInfo = 'Incorrect username or password';
        	alert($scope.signinMessage);
        }
    });
  };
});
