//Define an angular module for our app
var app = angular.module('myApp', ['ngRoute','chart.js', 'ngFileUpload', "ngTable"]);

app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
    .when('/dashboard',
    {
      templateUrl:    'partials/dashboard.html',
      controller:     'DashboardCtrl'
    })
    .when('/login',
    {
      templateUrl:    'partials/login.html',
      controller:     'LoginCtrl'
    })
    .when('/home-introduction',
    {
      templateUrl:    'partials/home-introduction.html',
      controller:     'HomeIntroductionCtrl'
    })
    .when('/home-component',
    {
      templateUrl:    'partials/home-component.html',
      controller:     'HomeComponentCtrl'
    })
    .when('/uploadInangural',
    {
      templateUrl:    'partials/uploadInangural.html',
      controller:     'UploadInanguralCtrl'
    })
    .when('/uploadResearch',
    {
      templateUrl:    'partials/uploadResearch.html',
      controller:     'UploadResearchCtrl'
    })
    .when('/uploadFooterLogos',
    {
      templateUrl:    'partials/uploadFooterLogos.html',
      controller:     'UploadFooterLogosCtrl'
    })
    .when('/uploadGIFILogo',
    {
      templateUrl:    'partials/uploadGIFILogo.html',
      controller:     'UploadGIFILogoCtrl'
    })
    .when('/uploadComponentImages',
    {
      templateUrl:    'partials/uploadComponentImages.html',
      controller:     'UploadComponentImagesCtrl'
    })
    .when('/manageRankingCSV',
    {
      templateUrl:    'partials/manageRankingCSV.html',
      controller:     'ManageRankingCSVCtrl'
    })
    .otherwise(
    {
      redirectTo:     '/login'
    }
  );
}]);

app.service('cookieService', function() {
  var userName = '';

  var setUserName = function(newUser) {
      userName = newUser;
  };

  var getUserName = function(){
      return userName;
  };

  return {
    setUserName: setUserName,
    getUserName: getUserName
  };
});

app.controller('adminMainController', 
['$scope', '$location', '$http', 'cookieService', 'Upload', '$timeout', function($scope, $location, $http, cookieService, Upload, $timeout) {
    $scope.adminSignIn = function(username, pwd) {
        $http.post("ajax/adminSignIn.php?username="+username+"&pwd="+sha512(pwd))
        .then(function(response) {
            $scope.signinStatus = response.data.status;
            $scope.signinMessage = response.data.message;
            var userName = response.data.userName;
            if($scope.signinStatus === 'success'){
                $location.url('/dashboard');
                cookieService.setUserName(userName);
                
            }else{
            	$scope.failInfo = 'Incorrect username or password';
            	alert($scope.signinMessage);
            }
        }); 
     
    };

    $scope.loadDashboard = function(){
        $location.url('/dashboard');
    }

    $scope.homeIntroduction = function(){
        $location.url('/home-introduction');
    }

    $scope.homeComponent = function(){
        $location.url('/home-component');
    }

    $scope.uploadInangural = function(){
        $location.url('/uploadInangural');
    };

    $scope.uploadResearchPaper = function(){
        $location.url('/uploadResearch');
    };

    $scope.uploadFooterLogos = function(){
        $location.url('/uploadFooterLogos');
    };

    $scope.uploadGIFILogo = function(){
        $location.url('/uploadGIFILogo');
    };

    $scope.uploadComponentImages = function(){
        $location.url('/uploadComponentImages');
    };

    $scope.manageRankingCSV = function(){
        $location.url('/manageRankingCSV');
    }
}]);

app.controller('DashboardCtrl', function($scope, $compile) {
  console.log('inside dashboard controller');
});

app.controller('LoginCtrl', function($scope, $compile) {
  console.log('inside login controller');
});

app.controller('HomeIntroductionCtrl', function($scope, $compile) {
  console.log('inside home introduction controller');
});

app.controller('HomeComponentCtrl', function($scope, $compile) {
  console.log('inside home component controller');
});

app.controller('UploadInanguralCtrl', function($scope, $compile) {
  console.log('inside upload inangural controller');
});

app.controller('UploadResearchCtrl', function($scope, $compile) {
  console.log('inside upload research controller');
});

app.controller('UploadFooterLogosCtrl', function($scope, $compile) {
  console.log('inside upload footer logos controller');
});

app.controller('UploadGIFILogoCtrl', function($scope, $compile) {
  console.log('inside upload gifi logo controller');
});

app.controller('UploadComponentImagesCtrl', function($scope, $compile) {
  console.log('inside upload component images controller');
});

app.controller('ManageRankingCSVCtrl', function($scope, $compile) {
  console.log('inside manage ranking csv controller');
});
