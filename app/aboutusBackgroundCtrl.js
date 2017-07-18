//controller for home page
app.controller("aboutusBackgroundCtrl", ['$http', '$scope', '$rootScope', 'NgTableParams', '$location', '$anchorScroll',  
  function ($http, $scope, $rootScope, NgTableParams, $location, $anchorScroll) {
    $scope.loader = true;

  	//Modular Content
    getBackgroundContent();

    function getBackgroundContent(){
      $http.post("ajax/getBackgroundContent.php?position=Top(light blue text)")
      .then(function(response) {
        var results = response.data;
        var backgroundText = results; 

        document.getElementById('top').innerHTML = backgroundText;
      })

      $http.post("ajax/getBackgroundContent.php?position=Left Bottom(black text)")
      .then(function(response) {
        var results = response.data;
        var backgroundText = results; 

        document.getElementById('leftbottom').innerHTML = backgroundText;
      })

      $http.post("ajax/getBackgroundContent.php?position=Right Bottom(light blue background and red text)")
      .then(function(response) {
        var results = response.data;
        var backgroundText = results; 

        document.getElementById('rightbottom').innerHTML = backgroundText;
      }, function(response){}).finally(function(){$scope.loader = false;})
    }
}]);