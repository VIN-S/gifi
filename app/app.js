//Define an angular module for our app
var app = angular.module('myApp', ["ngRoute", "chart.js", "ngTable", "ui.grid", "ui.grid.pinning", "ui.grid.selection"]);
app.config(function ($routeProvider) {

    $routeProvider
    .when('/home',
    {
      templateUrl:    'partials/home.html',
      controller:     'HomeCtrl'
    })
    .when('/',
    {
      templateUrl:    'partials/home.html',
      controller:     'HomeCtrl'
    })
    .when('/ranking',
    {
      templateUrl:    'partials/ranking.html',
      controller:     'RankingCtrl'
    })
    .when('/ranking2',
    {
      templateUrl:    'partials/ranking2.html',
      controller:     'RankingCtrl'
    })
    .when('/publication',
    {
      templateUrl:    'partials/publications.html',
      controller:     'PublicationCtrl'
    })
    .when('/research',
    {
      templateUrl:    'partials/research.html',
      controller:     'ResearchCtrl'
    })
    .when('/background',
    {
      templateUrl:    'partials/background.html',
      controller:     'BackgroundCtrl'
    })
    .when('/copublisher',
    {
      templateUrl:    'partials/copublisher.html',
      controller:     'CopublisherCtrl'
    })
    // .when('/analysis/:countryName/year/:selectedYear',
    // {
    //   templateUrl:    'partials/analysis.html'
    // })
    .when('/analysis',
    {
      templateUrl:    'partials/analysis.html'
    })
    .when('/analysis2',
    {
      templateUrl:    'partials/analysis2.html'
    })
    .when('/error',
    {
      templateUrl:    'partials/error.html',
      controller:     'ErrorCtrl'
    })
    .otherwise(
    {
      redirectTo:     '/error'
    }
  );
});
 
//gifiMainController
app.controller('gifiMainController', 
['$scope', '$location', '$rootScope', '$http', function ($scope, $location, $rootScope, $http) { 
    $rootScope.rankComponentNames = [
      'Legal & Regulatory Environment', 
      'Market Development', 
      'Exchange Controls & Capital Restrictions', 
      'Corporate Governance', 
      'AUM Levels & Growth', 
      'Banking System', 
      'Ease of Doing Business', 
      'Political Environment', 
      'Accounting System'
    ];

    updateViewCount();

    function updateViewCount(){
      var today = new Date();
      today=today.toISOString().substring(0, 10); //yyyy-mm-dd

      $http.post("ajax/updateViewCount.php?today="+today)
      .then(function(response) {
      });
    }

    getLatestYearRanking();

    //Get latest year that has the ranking data
    function getLatestYearRanking(){
      $scope.loader = true;
      $http.post("ajax/getLatestYear.php")
      .then(function(response) {
          $rootScope.latestYear = response.data['latestYear'];
          $scope.latestYear = response.data['latestYear'];
          var latestYear = response.data['latestYear'];
          getTopTenCountries(latestYear);
          var maxRanks = 170;
          //set no.1 country as the selected country
          setDefaultRanking(maxRanks, latestYear);
          getCountryLists(latestYear);

          function getTopTenCountries(latestYear){
            $http.post("ajax/getTopTenCountries.php?year="+latestYear)
            .then(function(response) {
              var results = response.data;
              var temp = results.substring(1, response.data.length-1);
              $scope.topTenCountries = temp.split("\"\"");
          })};

          function setDefaultRanking(maxRanks, latestYear){
            $http.post("ajax/getTopCountryRanking.php?year="+latestYear)
            .then(function(response) {
                

                var results = response.data;
                
                $scope.rankOfSelectedCountry = results['investor_friendliness_rank'];
                $scope.nameOfSelectedCountry = results['country'];
                $scope.selectedCountry =  results['country'];

                $scope.goal = [];

                $scope.goal.data = [
                  [
                    maxRanks-results['legal_and_regulatory_environment'], 
                    maxRanks-results['market_development'], 
                    maxRanks-results['exchange_controls_and_capital_restriction'],
                    maxRanks-results['corporate_governance'],
                    maxRanks-results['aum_levels_and_growth'],
                    maxRanks-results['banking_system'],
                    maxRanks-results['ease_of_doing_business'],
                    maxRanks-results['political_environment'],
                    maxRanks-results['accounting_system']
                  ],
                ];
            })};

            function getCountryLists(year){
              $http.post("ajax/getListOfCountries.php?year="+year)
              .then(function(response) {
                  var temp = response.data.substring(1, response.data.length-1);
                  $scope.countryLists = temp.split("\"\"");
              }, function(response){}).finally(function(){$scope.loader = false;});
            }
        });
    }

    $scope.navClass = function (page) {
      var currentRoute = $location.path().substring(1) || 'home';
      return  (page.indexOf(currentRoute) !== -1) ? 'active' : '';
    };

    $scope.loadHome = function () {
        $location.url('/home');
    };
    
    $scope.loadRanking = function () {
        $location.url('/ranking');
    };

    $scope.loadAnalysis = function() {
        $location.url('/analysis');
    }

    $scope.loadPublication = function () {
        $location.url('/publication');
    };
    
    $scope.loadResearch = function () {
        $location.url('/research');
    };

    $scope.loadBackground = function () {
        $location.url('/background');
    };

    $scope.loadCopublisher = function () {
        $location.url('/copublisher');
    };
}]);
//end of gifiMainController


app.controller('HomeCtrl', function($scope, $compile) {
  console.log('inside home controller');
});

app.controller('RankingCtrl', function($scope, $compile) {
  console.log('inside ranking controller');
});

app.controller('AnalysisCtrl', function($scope, $compile) {
  console.log('inside analysis controller');
});

app.controller('PublicationCtrl', function($scope, $compile) {
  console.log('inside publication controller');
});

app.controller('ResearchCtrl', function($scope, $compile) {
  console.log('inside research controller');
});

app.controller('BackgroundCtrl', function($scope, $compile) {
  console.log('inside background controller');
});

app.controller('CopublisherCtrl', function($scope, $compile) {
  console.log('inside copublisher controller');
});

app.controller('ErrorCtrl', function($scope, $compile) {
  console.log('inside error controller');
});