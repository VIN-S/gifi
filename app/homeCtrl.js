//controller for home page
app.controller("homeCtrl", ['$http', '$scope', '$rootScope',  function ($http, $scope, $rootScope) {

  //set up graph color
  var colors = ['#e54d42', '#f19b2c', '#f0c330', '#239f85', '#3a99d8', '#2f81b7', '#9a5cb4', '#be3a31', '#29bb9c'];

  $scope.goal = [];

  $scope.goal.data = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  var tabClasses;

  //Initialize 
  initTabs();
  
  function initTabs() {
    tabClasses = ["","","","","","","","",""];
  }

  tabClasses[1] = 'active';

  $scope.getTabClass = function (tabNum) {
    return tabClasses[tabNum];
  };

  $scope.goal.series = [ 'Ranks' ];
  $scope.goal.labels = $rootScope.rankComponentNames;

  $scope.latestYear;

  var maxRanks = 170;

  var activeTab = ["active", "inactive"];

  $scope.backToTopTen = function(){
    activeTab[0] = 'active'
    activeTab[1] = 'inactive';
  }

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
  $scope.updateGraph = function(selectedCountry){
    $scope.loader = true;
    $http.post("ajax/getCountryRanking.php?country="+selectedCountry+"&year="+$rootScope.latestYear)
    .then(function(response) {
        activeTab[0] = 'inactive'
        activeTab[1] = 'active';

        var results = response.data;
        if (typeof results === 'undefined' || results === null || results === ""){
          $scope.selectedCountry =  "";
          $scope.nameOfSelectedCountry = "No Record";
          $scope.rankOfSelectedCountry = "N.A.";
          $scope.goal.data = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
          ];
        }else{
          $scope.goal = [];
          
          $scope.selectedCountry = String(selectedCountry);
          $scope.nameOfSelectedCountry = results['country'];

          if(results['investor_friendliness_rank'] < 1)
              $scope.rankOfSelectedCountry = ">100"
          else{
              $scope.rankOfSelectedCountry = results['investor_friendliness_rank'];
              
          }
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
        }
    }, function(response){}).finally(function(){$scope.loader = false;});
  };

  $scope.getActiveTab = function (tabNum) {
    return activeTab[tabNum];
  };

  var tabContents = [];

  getComponentContent();

  function getComponentContent(){
    for(var i = 0; i < $rootScope.rankComponentNames.length; i++){
      var component = $rootScope.rankComponentNames[i]

      if(i == 0 || i == 2 || i == 4){
        component = component.replace('&', 'and');
      }
      $http.post("ajax/getComponentContent.php?component="+component)
      .then(function(response) {
        var temp=response.data.split("//");

        var dataset = [];

        var tempFactors = [];

        var tempContent;

        for(var i=0;i<temp.length;i++){
          if(temp[i] !== undefined && temp[i] !==null && temp[i] !== ""){
            dataset[i] = JSON.parse(temp[i]);
            
            tempContent = dataset[i]['description'];
            tempFactors.push(dataset[i]['factor']);

            if(i == 0){
              $scope.componentImgSrc = 'admin/ajax/component_images/legal_and_regulatory_environment.jpg';
              $scope.componentName = $rootScope.rankComponentNames[0];
              $scope.content = tempContent;
              $scope.factors = tempFactors;
            }      
          }
        }

        var tempComponent = {
          'contents': tempContent,
          'factors': tempFactors
        }

        tabContents.push(tempComponent);
      });
    }
  }
  
  $scope.setActiveTab = function (tabNum) {
    initTabs();
    tabClasses[tabNum] = "active";
    $scope.componentName = $rootScope.rankComponentNames[tabNum-1];
    $scope.content = tabContents[tabNum-1]['contents'];
    $scope.factors = tabContents[tabNum-1]['factors'];
    if(tabNum == 1){
        $scope.componentImgSrc = 'admin/ajax/component_images/legal_and_regulatory_environment.jpg';
    }else if(tabNum == 2){
        $scope.componentImgSrc = 'admin/ajax/component_images/market_development.jpg';
    }else if(tabNum == 3){
        $scope.componentImgSrc = 'admin/ajax/component_images/exchange_controls_and_capital_restriction.jpg';
    }else if(tabNum == 4){
        $scope.componentImgSrc = 'admin/ajax/component_images/corporate_governance.jpg';
    }else if(tabNum == 5){
        $scope.componentImgSrc = 'admin/ajax/component_images/aum_levels_and_growth.jpg';
    }else if(tabNum == 6){
        $scope.componentImgSrc = 'admin/ajax/component_images/banking_system.jpg';
    }else if(tabNum == 7){
        $scope.componentImgSrc = 'admin/ajax/component_images/ease_of_doing_business.jpg';
    }else if(tabNum == 8){
        $scope.componentImgSrc = 'admin/ajax/component_images/political_environment.jpg';
    }else if(tabNum == 9){
        $scope.componentImgSrc = 'admin/ajax/component_images/accounting_system.jpg';
    }
  };
  
  //Modular Content
  getIntroductionText();

  function getIntroductionText(){
    $http.post("ajax/getIntroductionContent.php")
    .then(function(response) {
      var results = response.data;
      var content =  results['content']; 

      document.getElementById('introduction').innerHTML += content;
    })
  }
}]);
//enf of controler for home page