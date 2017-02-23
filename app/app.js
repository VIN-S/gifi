//Define an angular module for our app
var app = angular.module('myApp', ["ngRoute", "chart.js"]);
app.config(function ($routeProvider) {

    $routeProvider
    .when('/home',
    {
      templateUrl:    'partials/home.html',
      controller:     'HomeCtrl'
    })
    .when('/ranking',
    {
      templateUrl:    'partials/ranking.html',
      controller:     'RankingCtrl'
    })
    .when('/research_publication',
    {
      templateUrl:    'partials/research_publication.html',
      controller:     'ResearchPublicationCtrl'
    })
    .when('/about',
    {
      templateUrl:    'partials/about.html',
      controller:     'AboutCtrl'
    })
    .otherwise(
    {
      redirectTo:     '/home'
    }
  );
});
 
app.controller('gifiMainController', 
['$scope', '$location', function ($scope, $location) {  
  $scope.navClass = function (page) {
    var currentRoute = $location.path().substring(1) || 'home';
    return page === currentRoute ? 'active' : '';
  };
  
      $scope.loadHome = function () {
        $location.url('/home');
    };
    
      $scope.loadRanking = function () {
        $location.url('/ranking');
    };
    
      $scope.loadResearchPublication = function () {
        $location.url('/research_publication');
    };

      $scope.loadAbout = function () {
        $location.url('/about');
    };
}]);

app.controller("dataCtrl", function ($http, $scope) {
  //Get list of regions
  getListOfRegions();

  function getListOfRegions() {
    $http.post("ajax/getListOfRegions.php")
    .then(function(response) {
        var temp = response.data.substring(1, response.data.length-1);
        $scope.regionLists = temp.split("\"\"");
    });
  };

  //set up graph color
  var colors = ['#e54d42', '#f19b2c', '#f0c330', '#239f85', '#3a99d8', '#2f81b7', '#9a5cb4', '#be3a31', '#29bb9c'];

  $scope.goal = [];

  $scope.goal.data = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  $scope.goal.series = [ 'Ranks' ];
  $scope.goal.labels = [
    '', '', '', '', '', '', '', '', ''
  ];

  //set no.1 region as the selected region
  setDefaultRanking();

  function setDefaultRanking(){
    $http.post("ajax/getTopRegionRanking.php")
    .then(function(response) {
        var results = response.data;
        
        $scope.rankOfSelectedRegion = results['investor_friendliness_rank'];
        $scope.nameOfSelectedRegion = results['country'];
        $scope.selectedRegion =  results['country'];

        $scope.goal = [];

        $scope.goal.data = [
          [
            150-results['legal_and_regulatory_environment'], 
            150-results['market_development'], 
            150-results['exchange_controls_and_capital_restrictions'],
            150-results['corporate_governance'],
            150-results['aum_levels_and_growth'],
            150-results['banking_system'],
            150-results['ease_of_doing_business'],
            150-results['political_environment'],
            150-results['accounting_system']
          ],
        ];
  })};

  //set background color of the bar
  var backgroundColours = [];

  for( var i = 0; i < $scope.goal.data[0].length; i++ ) {
    backgroundColours[i] = colors[i];
  } 

  $scope.goal.datasetOverride = [{ backgroundColor: [] }];

  $scope.goal.datasetOverride[0].backgroundColor = backgroundColours;
  $scope.goal.datasetOverride[0].borderColor = backgroundColours;

  //configure options
  $scope.goal.options = {
    barShowStroke: false,
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 150,
          stepSize: 20
        },
        display: false
      }]
    }
  };

  //update graph when select
  $scope.updateGraph = function(selectedRegion){
    $http.post("ajax/getRegionRanking.php?region="+selectedRegion)
    .then(function(response) {
        var results = response.data;

        $scope.goal = [];

        $scope.nameOfSelectedRegion = results['country'];
        if(results['investor_friendliness_rank'] < 1)
            $scope.rankOfSelectedRegion = ">100"
        else{
            $scope.rankOfSelectedRegion = results['investor_friendliness_rank'];
            
        }

        $scope.goal.data = [
          [
            150-results['legal_and_regulatory_environment'], 
            150-results['market_development'], 
            150-results['exchange_controls_and_capital_restrictions'],
            150-results['corporate_governance'],
            150-results['aum_levels_and_growth'],
            150-results['banking_system'],
            150-results['ease_of_doing_business'],
            150-results['political_environment'],
            150-results['accounting_system']
          ],
        ];
    });
  }
});


app.controller('HomeCtrl', function($scope, $compile) {
  console.log('inside home controller');
});

app.controller('RankingCtrl', function($scope, $compile) {
  console.log('inside ranking controller');
});

app.controller('ResearchPublicationCtrl', function($scope, $compile) {
  console.log('inside research & publication controller');
});

app.controller('AboutCtrl', function($scope, $compile) {
  console.log('inside about controller');
});



