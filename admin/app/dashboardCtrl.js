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

app.controller("LineCtrl", ['$http', '$scope', function ($http, $scope) {
    var today = new Date();
    var oneWeekBefore = new Date();
    oneWeekBefore.setDate(oneWeekBefore.getDate() - 6);
    today=today.toISOString().substring(0, 10); //yyyy-mm-dd
    oneWeekBefore = oneWeekBefore.toISOString().substring(0, 10);

    getOneWeekViewCount();

    function getOneWeekViewCount(){
        $http.post("ajax/updateGraph.php?startDate="+oneWeekBefore+"&endDate="+today)
      .then(function(response) {
        var temp=response.data.split("//");

        $scope.labels = [];
        $scope.series = ['Views'];
        $scope.data = [[]];

        for(var i=0;i<temp.length;i++){
            if(temp[i] !== undefined && temp[i] !==null && temp[i] !== ""){
                var row = JSON.parse(temp[i]);
                $scope.labels.push(row['dateOfUpdate']);
                $scope.data[0].push(row['viewcount']);
            }
        }

        $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
        $scope.options = {
            scales: {
            yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left'
                        }
                    ]
                }
            };
        });

    $scope.updateGraph = function(startDate, endDate){
        if(startDate != null && startDate != undefined && endDate != null && endDate != undefined){
            startDate = startDate.toISOString().substring(0, 10);
            endDate = endDate.toISOString().substring(0, 10);

            $http.post("ajax/updateGraph.php?startDate="+startDate+"&endDate="+endDate)
            .then(function(response) {
                var temp=response.data.split("//");

                $scope.labels = [];
                $scope.series = ['Views'];
                $scope.data = [[]];

                for(var i=0;i<temp.length;i++){
                    if(temp[i] !== undefined && temp[i] !==null && temp[i] !== ""){
                        var row = JSON.parse(temp[i]);
                        $scope.labels.push(row['dateOfUpdate']);
                        $scope.data[0].push(row['viewcount']);
                    }
                }

                $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
                $scope.options = {
                    scales: {
                    yAxes: [
                                {
                                    id: 'y-axis-1',
                                    type: 'linear',
                                    display: true,
                                    position: 'left'
                                }
                            ]
                        }
                    };
                });
            }
        }
    };

}]);
