//controller for home page
app.controller("detailCtrl", ['$http', '$scope', '$routeParams', function ($http, $scope, $routeParams) {
  console.log("here");
  var country = $routeParams.countryName;
  console.log("detailCtrl: "+country);
}]);