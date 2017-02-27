//controller for home page
app.controller("rankingCtrl", ['$http', '$scope', '$rootScope',  function ($http, $scope, $rootScope) {
  //Get list of years
  getListOfYears();
  getListOfRegions();

  function getListOfYears() {
    $http.post("ajax/getListOfYears.php")
    .then(function(response) {
    	console.log(response);
        var temp = response.data.substring(1, response.data.length-1);
        $scope.yearLists = temp.split("\"\"");
    });
  };

}]);