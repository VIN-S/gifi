//Define an angular module for our app
var app = angular.module('myApp', []);
 
app.controller('gifiAdminController', function($scope, $http, $window, fileUpload) {
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

  $scope.uploadFile = function(){
        var file = $scope.myFile;
        console.log('file is ' );
        console.dir(file);

        var uploadUrl = "../ajax/upload.php";
        fileUpload.uploadFileToUrl(file, uploadUrl);
   };
})

.directive('fileModel', ['$parse', function ($parse) {
    return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
            scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
            });
        });
    }
   };
}])

// We can write our own fileUpload service to reuse it in the controller
.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
         $http.post(uploadUrl, file)
         .then(function(response){
         	console.log(response);
            console.log("Success");
         })
     }
 }]);