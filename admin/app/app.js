//Define an angular module for our app
var app = angular.module('myApp', []);
 
app.controller('gifiAdminController', function($scope, $http) {
  $scope.adminSignIn = function(username, pwd) {
    $http.post("ajax/adminSignIn.php?username="+username+"&pwd="+pwd)
    .then(function(response) {
        $scope.signinStatus = response.data.status;
        $scope.signinMessage = response.data.message;
    });
  };
});