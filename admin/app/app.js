//Define an angular module for our app
var app = angular.module('myApp', []);
 
app.controller('gifiAdminController', function($scope, $http, $window) {
  $scope.adminSignIn = function(username, pwd) {
    // if($cookies.getCookieData != null || $cookies.getCookieData != undefined){
    //     $window.location.href = 'partials/dashboard.html';
    // }else{
        $http.post("ajax/adminSignIn.php?username="+username+"&pwd="+pwd)
        .then(function(response) {
            $scope.signinStatus = response.data.status;
            $scope.signinMessage = response.data.message;
            if($scope.signinStatus === 'success'){
            	$window.location.href = 'partials/dashboard.html';
                // $cookies.setCookieData(response.data.userName);
            }else{
            	$scope.failInfo = 'Incorrect username or password';
            	alert($scope.signinMessage);
            }
        }); 
    // }
  };
});

// app.factory("userPersistenceService", [
//     "$cookies", function($cookies) {
//         var userName = "";

//         return {
//             setCookieData: function(username) {
//                 userName = username;
//                 $cookies.put("userName", username);
//             },
//             getCookieData: function() {
//                 userName = $cookies.get("userName");
//                 return userName;
//             },
//             clearCookieData: function() {
//                 userName = "";
//                 $cookies.remove("userName");
//             }
//         }
//     }
// ]);
