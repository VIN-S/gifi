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
    'Legal & Regulatory Environment', 
    'Market Development', 
    'Exchange Controls & Capital Restrictions', 
    'Corporate Governance', 
    'AUM Levels & Capital Restrictions', 
    'Banking System', 
    'Ease of Doing Business', 
    'Political Environment', 
    'Account System'
  ];

  var maxRanks = 170;

  //set no.1 region as the selected region
  setDefaultRanking(maxRanks);

  function setDefaultRanking(maxRanks){
    $http.post("ajax/getTopRegionRanking.php")
    .then(function(response) {
        var results = response.data;
        
        $scope.rankOfSelectedRegion = results['investor_friendliness_rank'];
        $scope.nameOfSelectedRegion = results['country'];
        $scope.selectedRegion =  results['country'];

        $scope.goal = [];

        $scope.goal.data = [
          [
            maxRanks-results['legal_and_regulatory_environment'], 
            maxRanks-results['market_development'], 
            maxRanks-results['exchange_controls_and_capital_restrictions'],
            maxRanks-results['corporate_governance'],
            maxRanks-results['aum_levels_and_growth'],
            maxRanks-results['banking_system'],
            maxRanks-results['ease_of_doing_business'],
            maxRanks-results['political_environment'],
            maxRanks-results['accounting_system']
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
          max: 200,
          stepSize: 20,
        },
        display: false
      }],
      xAxes: [{
        ticks: {
          display: false,
          userCallback: function(value, index, values) {
            return "";
          }
        }
      }]
    },
    animation: {
      duration: 400,
      onComplete: function () {
          // render the value of the chart above the bar
          var ctx = this.chart.ctx;
          ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          this.data.datasets.forEach(function (dataset) {
              for (var i = 0; i < dataset.data.length; i++) {
                  var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
                  ctx.fillStyle = colors[i];
                  ctx.fillText("No."+(maxRanks-dataset.data[i]), model.x, model.y - 5);

              }
          });
      }
    },
    hover: {
      animationDuration: 0
    },
    tooltips: {
      enabled: false,
      mode: 'single',
      callbacks: {
        label: function(tooltipItem, data) {
          var label = data.labels[tooltipItem.index];
          var datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          return label + ': No.' + (maxRanks-datasetLabel);
        }
      }
    }
  };

  //update graph when select
  $scope.updateGraph = function(selectedRegion){
    $http.post("ajax/getRegionRanking.php?region="+selectedRegion)
    .then(function(response) {
        var results = response.data;
        if (typeof results === 'undefined' || results === null || results === ""){
          $scope.selectedRegion =  "";
          $scope.nameOfSelectedRegion = "No Record";
          $scope.rankOfSelectedRegion = "N.A.";
          $scope.goal.data = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
          ];
        }else{

          $scope.goal = [];

          $scope.selectedRegion = String(selectedRegion);
          $scope.nameOfSelectedRegion = results['country'];
          if(results['investor_friendliness_rank'] < 1)
              $scope.rankOfSelectedRegion = ">100"
          else{
              $scope.rankOfSelectedRegion = results['investor_friendliness_rank'];
              
          }

          $scope.goal.data = [
            [
              maxRanks-results['legal_and_regulatory_environment'], 
              maxRanks-results['market_development'], 
              maxRanks-results['exchange_controls_and_capital_restrictions'],
              maxRanks-results['corporate_governance'],
              maxRanks-results['aum_levels_and_growth'],
              maxRanks-results['banking_system'],
              maxRanks-results['ease_of_doing_business'],
              maxRanks-results['political_environment'],
              maxRanks-results['accounting_system']
            ],
          ];
        }
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



