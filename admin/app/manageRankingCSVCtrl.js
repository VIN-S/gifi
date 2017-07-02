app.controller('manageRankingCSVCtrl', 
['$scope', '$location', '$http', 'cookieService', 'Upload', '$timeout', 'NgTableParams', '$route', 
    function($scope, $location, $http, cookieService, Upload, $timeout, NgTableParams, $route) {
    
    getDocumensData();

    function getDocumensData(){
        $http.post("ajax/getRankingCSVData.php")
        .then(function(response) {
            var temp=response.data.split("//");

            var dataset = [];
            for(var i=0;i<temp.length;i++){
              if(temp[i] !== undefined && temp[i] !==null && temp[i] !== ""){
                dataset[i] = JSON.parse(temp[i]);
                dataset[i]['fileName'] = dataset[i]['csvname'];
                dataset[i]['year'] = dataset[i]['year'];
                
                dataset[i]['upload_time'] = dataset[i]['upload_date'];
              }
            }

            $scope.tableParams = new NgTableParams({
                count: 10 
            }, {
                data: dataset
            });

            // console.log($scope.tableParams);
        }, function(response){}).finally(function(){$scope.loader = false;});
    };

    $scope.delete = function(name, year){
        if(confirm("Are you going to delete "+name+"?"))
        {
            $http.post("ajax/deleteRankingCSVRecord.php?name="+name+"&year="+year)
            .then(function(response) {
            });

            $http.post("ajax/deleteRankingCSV.php?name="+name)
            .then(function(response) {
                alert(response.data);
                $route.reload();
            }, function(response){}).finally(function(){$scope.loader = false;});
        }
    };
}]);