//Define an angular module for our app
var app = angular.module('myApp', []);
 
app.controller('gifiMainController', function($scope, $http) {
  $scope.adminSignIn = function (userid, pwd) {
    $http.get("../ajax/adminSignIn.php?userid="+userid+"&pwd="+pwd)
    .then(function(response) {
        $scope.signinResult = response.data;
    });
    if($scope.signinResult === "success")
      console.log("success");
    else if($scope.signinResult === "fail")
      console.log("fail");
  };

  function getTask(){  
  $http.post("ajax/getTask.php").then(function(data){
        $scope.tasks = data;
       });
  };
  $scope.addTask = function (task) {
    $http.post("ajax/addTask.php?task="+task).then(function(data){
        getTask();
        $scope.taskInput = "";
      });
  };
  $scope.deleteTask = function (task) {
    if(confirm("Are you sure to delete this line?")){
    $http.post("ajax/deleteTask.php?taskID="+task).then(function(data){
        getTask();
      });
    }
  };
 
  $scope.toggleStatus = function(item, status, task) {
    if(status=='2'){status='0';}else{status='2';}
      $http.post("ajax/updateTask.php?taskID="+item+"&status="+status).then(function(data){
        getTask();
      });
  };
 
});