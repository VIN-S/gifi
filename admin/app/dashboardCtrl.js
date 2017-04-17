app.controller('dashboardController', 
['$scope', '$location', '$http', 'cookieService', function($scope, $location, $http, cookieService) {
    if(cookieService.getUserName() == undefined || cookieService.getUserName() == ''){
        $location.url('/login');
    }

    $scope.adminLogout = function(){
        cookieService.setUserName('');
        $location.url('/login');
    }

    $scope.loadDashboard = function(){
        $location.url('/dashboard');
    }

    getLatestCount();

    function getLatestCount(){
      var today = new Date();
      today=today.toISOString().substring(0, 10); //yyyy-mm-dd

      $http.post("ajax/getTodayViewCount.php?today="+today)
      .then(function(response) {
        if(response.data['viewcount'] == undefined || response.data['viewcount'] == null)
            $scope.todayViewCount = 0;
        else
            $scope.todayViewCount = response.data['viewcount'];
      });

      $http.post("ajax/getTodayDownloadCount.php?today="+today)
      .then(function(response) {
        if(response.data['downloadcount'] == undefined || response.data['downloadcount'] == null)
            $scope.todayDownloadCount = 0;
        else
            $scope.todayDownloadCount = response.data['downloadcount'];
      });

      $http.post("ajax/getTotalViewCount.php")
      .then(function(response) {
        if(response.data['totalview'] == undefined || response.data['totalview'] == null)
            $scope.totalViewCount = 0;
        else
            $scope.totalViewCount = response.data['totalview'];
      });

      $http.post("ajax/getTotalDownloadCount.php")
      .then(function(response) {
        if(response.data['totaldownload'] == undefined || response.data['totaldownload'] == null)
            $scope.totalDownloadCount = 0;
        else
            $scope.totalDownloadCount = response.data['totaldownload'];
      });
    }
}]);