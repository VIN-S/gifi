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
['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {  
  $scope.navClass = function (page) {

    $rootScope.rankComponentNames = [
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

app.controller("homeCtrl", function ($http, $scope, $rootScope) {
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
  $scope.goal.labels = $rootScope.rankComponentNames;

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
  };

  var tabClasses;
  var tabContents = 
      [
        {
          'contents': 'Measures the degree to which the rule of the law is implemented: ',
          'factor':[
            'Strength of Institutions',
            'Effectiveness of enforcement',
            'Commitment to Global AML'
          ]
        },
        {
          'contents': 'Measures the volume, breadth and depth of the instruments and facilities to investors: ',
          'factor':[
            'Market activity',
            'Access to credit',
            'Efficiency of Financial services sector'
          ]
        },
        {
          'contents': 'Measures the ease with which investments can flow in and out of the country: ',
          'factor':[
            'Currecy stability',
            'Investment Flow'
          ]
        },
        {
          'contents': 'Measures the state of corporate governance in the country: ',
          'factor':[
            'Shareholder protection',
            'Ethical Behaviour of firms',
            'Efficacy of Corporate Boards'
          ]
        },
        {
          'contents': 'Measures the level of growth of assets under management by managers: ',
          'factor':[
            'Growth of assets under management',
            'Global inflows and outflows of assets'
          ]
        },
        {
          'contents': 'Measures the development of the banking system in terms of the soundness of banks, their ability to handle financial crisis as well as confidence in the banking system: ',
          'factor':[
            'Banking system stability',
            'Risk of sovereign debt crisis',
            'Size of banking sector',
            'Efficieny of banking system'
          ]
        },
        {
          'contents': 'Measures the ease with which business can be conducted and an investment advisor(corporate form) can be setup: ',
          'factor':[
            'Cost of doing business',
            'Taxation',
            'Infrastructure'
          ]
        },
        {
          'contents': 'Measures the stability of the political environment, including policy making, transfer of political power and political risk: ',
          'factor':[
            'Ethics and corruption',
            'Government Efficiency',
            'Constraints on government policies'
          ]
        },
        {
          'contents': 'Measures the degree to which international accounting standards are adopted and implemented: ',
          'factor':[
            'Commitment to Global Financial Reporting Standards'
          ]
        }
      ];
  
  function initTabs() {
    tabClasses = ["","","","","","","","",""];
  }
  
  $scope.getTabClass = function (tabNum) {
    return tabClasses[tabNum];
  };
  
  $scope.setActiveTab = function (tabNum) {
    initTabs();
    tabClasses[tabNum] = "active";
    $scope.componentName = $rootScope.rankComponentNames[tabNum-1];
    $scope.content = tabContents[tabNum-1]['contents'];
    $scope.factors = tabContents[tabNum-1]['factor'];
    $scope.componentImgSrc = '../img/components/component_'+tabNum+'.jpg';

  };
  
  //Initialize 
  initTabs();
  $scope.setActiveTab(1);
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



