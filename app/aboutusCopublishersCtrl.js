//controller for home page
app.controller("aboutusCopublishersCtrl", ['$http', '$scope', '$rootScope', 'NgTableParams', '$location', '$anchorScroll',  
  function ($http, $scope, $rootScope, NgTableParams, $location, $anchorScroll) {
    $scope.loader = true;

    getCopublisherContent();

    function getCopublisherContent(){
      $http.post("ajax/getCopublisherContent.php?copublisher=NUS")
      .then(function(response) {
        var results = response.data;
        var introudction = results; 

        document.getElementById('nus-intro').innerHTML = introudction;
      })

      $http.post("ajax/getCopublisherContent.php?copublisher=Cornell")
      .then(function(response) {
        var results = response.data;
        var introudction = results; 

        document.getElementById('cornell-intro').innerHTML = introudction;
      })

      $http.post("ajax/getCopublisherContent.php?copublisher=Partner Company")
      .then(function(response) {
        var results = response.data;
        var introudction = results; 

        document.getElementById('partner-intro').innerHTML = introudction;
      }, function(response){}).finally(function(){$scope.loader = false;})
    }
}]);