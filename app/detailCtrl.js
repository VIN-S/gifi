//controller for home page
app.controller("detailCtrl", ['$http', '$scope', '$routeParams', function ($http, $scope, $routeParams) {
  var country = $routeParams.countryName;
  var year = $routeParams.selectedYear;

  getCountryDetail();
  getRegionDetail();

  function getCountryDetail(){
    $http.post("ajax/getCountryRanking.php?country="+country+"&year="+year)
    .then(function(response) {
        var results = response.data;
        $scope.selected = [];

        if (typeof results === 'undefined' || results === null || results === ""){
          $scope.selected.countryName =  "";
          $scope.selected.investor_friendliness_rank = "No Record";
          $scope.selected.legal_and_regulatory_environment = "N.A.";
          $scope.selected.market_development = "N.A.";
          $scope.selected.exchange_controls_and_capital_restriction = "N.A.";
          $scope.selected.corporate_governance = "N.A.";
          $scope.selected.aum_levels_and_growth = "N.A.";
          $scope.selected.banking_system = "N.A.";
          $scope.selected.ease_of_doing_business = "N.A.";
          $scope.selected.political_environment = "N.A.";
          $scope.selected.accounting_system = "N.A.";
        }else{
          $scope.selected.countryName =  country;
          $scope.selected.investor_friendliness_rank = results['investor_friendliness_rank'];
          $scope.selected.legal_and_regulatory_environment = results['legal_and_regulatory_environment'];
          $scope.selected.market_development = results['market_development'];
          $scope.selected.exchange_controls_and_capital_restriction = results['exchange_controls_and_capital_restriction'];
          $scope.selected.corporate_governance = results['corporate_governance'];
          $scope.selected.aum_levels_and_growth = results['aum_levels_and_growth'];
          $scope.selected.banking_system = results['banking_system'];
          $scope.selected.ease_of_doing_business = results['ease_of_doing_business'];
          $scope.selected.political_environment = results['political_environment'];
          $scope.selected.accounting_system = results['accounting_system'];
        }
    });
  };

  function getRegionDetail(){
    $scope.region = [];

    $http.post("ajax/getRegionNameGivenCountryName.php?country="+country+"&year="+year)
    .then(function(response) {
        var results = response.data;
        $scope.region.regionName =  results['region']; 
    });

    $http.post("ajax/getRegionRankingGivenCountryName.php?country="+country+"&year="+year)
    .then(function(response) {
        var results = response.data;

        if (typeof results === 'undefined' || results === null || results === ""){
          $scope.region.regionName =  "";
          $scope.region.investor_friendliness_rank = "No Record";
          $scope.region.legal_and_regulatory_environment = "N.A.";
          $scope.region.market_development = "N.A.";
          $scope.region.exchange_controls_and_capital_restriction = "N.A.";
          $scope.region.corporate_governance = "N.A.";
          $scope.region.aum_levels_and_growth = "N.A.";
          $scope.region.banking_system = "N.A.";
          $scope.region.ease_of_doing_business = "N.A.";
          $scope.region.political_environment = "N.A.";
          $scope.region.accounting_system = "N.A.";
        }else{
          $scope.region.investor_friendliness_rank = parseInt(results['investor_friendliness_rank']);
          $scope.region.legal_and_regulatory_environment = parseInt(results['legal_and_regulatory_environment']);
          $scope.region.market_development = parseInt(results['market_development']);
          $scope.region.exchange_controls_and_capital_restriction = parseInt(results['exchange_controls_and_capital_restriction']);
          $scope.region.corporate_governance = parseInt(results['corporate_governance']);
          $scope.region.aum_levels_and_growth = parseInt(results['aum_levels_and_growth']);
          $scope.region.banking_system = parseInt(results['banking_system']);
          $scope.region.ease_of_doing_business = parseInt(results['ease_of_doing_business']);
          $scope.region.political_environment = parseInt(results['political_environment']);
          $scope.region.accounting_system = parseInt(results['accounting_system']);
        }
    });
  }
}]);