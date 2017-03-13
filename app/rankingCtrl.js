//controller for home page
app.controller("rankingCtrl", ['$http', '$scope', '$rootScope', 'NgTableParams', function ($http, $scope, $rootScope, NgTableParams) {
  //Get list of years
  getListOfYears();
  getListOfRegions();
  getLatestYearRanking();

  function getListOfYears() {
    $http.post("ajax/getListOfYears.php")
    .then(function(response) {
        var temp = response.data.substring(1, response.data.length-1);
        $scope.yearLists = temp.split("\"\"");
    });
  };

  function getListOfRegions() {
    $http.post("ajax/getListOfRegions.php")
    .then(function(response) {
        $scope.regionLists = [];
        $scope.regionLists[0] = 'All';
        var temp = response.data.substring(1, response.data.length-1);
        $scope.regionLists =  $scope.regionLists.concat(temp.split("\"\""));
    });
  };

  function getLatestYearRanking(){
    $http.post("ajax/getLatestYear.php")
    .then(function(response) {
        var latestYear = response.data['latestYear'];
        $scope.updateRankingByYear(latestYear);
        $scope.selectedYear = latestYear;
    });
  }

  $scope.updateRankingByYear = function(year){
    $scope.selectedYear = year;

    $http.post("ajax/updateRankingByYear.php?year="+year)
    .then(function(response) {
        var temp=response.data.split("//");
        // console.log(temp[0]);
        // console.log(JSON.parse(temp[0]));
        var dataset = [];
        for(var i=0;i<temp.length;i++){
          if(temp[i] !== undefined && temp[i] !==null && temp[i] !== ""){
            dataset[i] = JSON.parse(temp[i]);
            dataset[i]['investor_friendliness_rank'] = parseInt(dataset[i]['investor_friendliness_rank']);
            dataset[i]['legal_and_regulatory_environment'] = parseInt(dataset[i]['legal_and_regulatory_environment']);
            dataset[i]['market_development'] = parseInt(dataset[i]['market_development']);
            dataset[i]['exchange_controls_and_capital_restriction'] = parseInt(dataset[i]['exchange_controls_and_capital_restriction']);
            dataset[i]['corporate_governance'] = parseInt(dataset[i]['corporate_governance']);
            dataset[i]['aum_levels_and_growth'] = parseInt(dataset[i]['aum_levels_and_growth']);
            dataset[i]['banking_system'] = parseInt(dataset[i]['banking_system']);
            dataset[i]['ease_of_doing_business'] = parseInt(dataset[i]['ease_of_doing_business']);
            dataset[i]['political_environment'] = parseInt(dataset[i]['political_environment']);
            dataset[i]['accounting_system'] = parseInt(dataset[i]['accounting_system']);
          }
        }

        $scope.tableParams = new NgTableParams({
            count: 10 
        }, {
            data: dataset
        });

        // console.log($scope.tableParams);
    });
  }

  $scope.updateRankingByRegion = function(region){
    $scope.selectedRegion = region;

    $http.post("ajax/updateRankingByRegion.php?year="+$scope.selectedYear+"&region="+$scope.selectedRegion)
    .then(function(response) {
        var temp=response.data.split("//");
        // console.log(temp[0]);
        // console.log(JSON.parse(temp[0]));
        var dataset = [];
        for(var i=0;i<temp.length;i++){
          if(temp[i] !== undefined && temp[i] !==null && temp[i] !== ""){
            dataset[i] = JSON.parse(temp[i]);
            dataset[i]['investor_friendliness_rank'] = parseInt(dataset[i]['investor_friendliness_rank']);
            dataset[i]['legal_and_regulatory_environment'] = parseInt(dataset[i]['legal_and_regulatory_environment']);
            dataset[i]['market_development'] = parseInt(dataset[i]['market_development']);
            dataset[i]['exchange_controls_and_capital_restriction'] = parseInt(dataset[i]['exchange_controls_and_capital_restriction']);
            dataset[i]['corporate_governance'] = parseInt(dataset[i]['corporate_governance']);
            dataset[i]['aum_levels_and_growth'] = parseInt(dataset[i]['aum_levels_and_growth']);
            dataset[i]['banking_system'] = parseInt(dataset[i]['banking_system']);
            dataset[i]['ease_of_doing_business'] = parseInt(dataset[i]['ease_of_doing_business']);
            dataset[i]['political_environment'] = parseInt(dataset[i]['political_environment']);
            dataset[i]['accounting_system'] = parseInt(dataset[i]['accounting_system']);
          }
        }

        $scope.tableParams = new NgTableParams({
            count: 10 
        }, {
            data: dataset
        });

        // console.log($scope.tableParams);
    });
  }

//   var dataset = [{name: "Moroni", age: 50}, {name: "hi", age: 30} /*,*/];
// console.log(dataset);
  // $scope.tableParams = new NgTableParams({
  //     count: 10 
  // }, {
  //     data: dataset
  // });

  // console.log($scope.tableParams);
}]);