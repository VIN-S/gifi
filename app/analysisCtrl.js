//controller for home page
app.controller("analysisCtrl", ['$http', '$scope', '$rootScope', '$routeParams', function ($http, $scope, $rootScope, $routeParams) {
  var country = $routeParams.countryName;
  var year = $routeParams.selectedYear;
  $scope.analysisYear = $routeParams.selectedYear;
  if($routeParams.selectedYear == null || $routeParams.selectedYear == ""){
    year = $rootScope.latestYear;
    $scope.analysisYear = $rootScope.latestYear;
  }
  $scope.comparedCountry = "None"

  $scope.options = {  
                      legend: { display: true },
                      scale: {
                          reverse: true,
                          ticks: {
                              min: 0, max:160
                          }
                      }
                    };

  $scope.series = [];
  $scope.labels = $rootScope.rankComponentNames;
  $scope.colours = ["#064480", "#94ce58", "#ff8000"];


  $scope.data = [
    [],
    [],
    []
  ];

  getCountryDetail(null);
  getRegionDetail(null);
  getListOfCountries();

  function getListOfCountries() {
    $http.post("ajax/getListOfCountries.php?year="+year)
    .then(function(response) {
        var temp = response.data.substring(1, response.data.length-1);
        $scope.countryLists = temp.split("\"\"");
    });
  };

  $scope.selectCountry = function(selectedCountry){
    getCountryDetail(selectedCountry);
    getRegionDetail(selectedCountry);
  }

  function getCountryDetail(selectedCountry){
    if(selectedCountry != null) country = selectedCountry;
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
          if(results['investor_friendliness_rank'] == 0) 
            $scope.selected.investor_friendliness_rank = ">100";
          else
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

          $scope.series[0]=country;
          $scope.data[0] = [$scope.selected.legal_and_regulatory_environment, $scope.selected.market_development,
          $scope.selected.exchange_controls_and_capital_restriction,  $scope.selected.corporate_governance, 
          $scope.selected.aum_levels_and_growth, $scope.selected.banking_system, $scope.selected.ease_of_doing_business,
          $scope.selected.political_environment, $scope.selected.accounting_system];
        }
    });
  };

  function getRegionDetail(selectedCountry){
    if(selectedCountry != null) country = selectedCountry;

    $scope.loader = true;
    $scope.region = [];

    $http.post("ajax/getRegionNameGivenCountryName.php?country="+country+"&year="+year)
    .then(function(response) {
        var results = response.data;
        $scope.region.regionName =  results['region']; 
        $scope.series[1]=results['region'];
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
          if(results['investor_friendliness_rank'] == 0) 
            $scope.region.investor_friendliness_rank = ">100";
          else
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

          $scope.data[1] = [$scope.region.legal_and_regulatory_environment, $scope.region.market_development,
          $scope.region.exchange_controls_and_capital_restriction,  $scope.region.corporate_governance, 
          $scope.region.aum_levels_and_growth, $scope.region.banking_system, $scope.region.ease_of_doing_business,
          $scope.region.political_environment, $scope.region.accounting_system];
        }
    }, function(response){}).finally(function(){$scope.loader = false;});
  };

  $scope.selectComparedCountry = function(comparedCountry){
    $scope.loader = true;
    $http.post("ajax/getCountryRanking.php?country="+comparedCountry+"&year="+year)
    .then(function(response) {
        var results = response.data;
        $scope.compared = [];

        if (typeof results === 'undefined' || results === null || results === ""){
          $scope.compared.countryName =  "";
          $scope.compared.investor_friendliness_rank = "No Record";
          $scope.compared.legal_and_regulatory_environment = "N.A.";
          $scope.compared.market_development = "N.A.";
          $scope.compared.exchange_controls_and_capital_restriction = "N.A.";
          $scope.compared.corporate_governance = "N.A.";
          $scope.compared.aum_levels_and_growth = "N.A.";
          $scope.compared.banking_system = "N.A.";
          $scope.compared.ease_of_doing_business = "N.A.";
          $scope.compared.political_environment = "N.A.";
          $scope.compared.accounting_system = "N.A.";
        }else{
          $scope.compared.countryName =  comparedCountry;
          if(results['investor_friendliness_rank'] == 0) 
            $scope.compared.investor_friendliness_rank = ">100";
          else
            $scope.compared.investor_friendliness_rank = results['investor_friendliness_rank'];
          $scope.compared.legal_and_regulatory_environment = results['legal_and_regulatory_environment'];
          $scope.compared.market_development = results['market_development'];
          $scope.compared.exchange_controls_and_capital_restriction = results['exchange_controls_and_capital_restriction'];
          $scope.compared.corporate_governance = results['corporate_governance'];
          $scope.compared.aum_levels_and_growth = results['aum_levels_and_growth'];
          $scope.compared.banking_system = results['banking_system'];
          $scope.compared.ease_of_doing_business = results['ease_of_doing_business'];
          $scope.compared.political_environment = results['political_environment'];
          $scope.compared.accounting_system = results['accounting_system'];

          $scope.series[2]=comparedCountry;
          $scope.data[2] = [$scope.compared.legal_and_regulatory_environment, $scope.compared.market_development,
          $scope.compared.exchange_controls_and_capital_restriction,  $scope.compared.corporate_governance, 
          $scope.compared.aum_levels_and_growth, $scope.compared.banking_system, $scope.compared.ease_of_doing_business,
          $scope.compared.political_environment, $scope.compared.accounting_system];
        }
    }, function(response){}).finally(function(){$scope.loader = false;});
  };
}]);