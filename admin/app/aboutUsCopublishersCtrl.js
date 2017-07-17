app.controller('aboutUsCopublishersCtrl', 
['$scope', '$location', '$http', 'cookieService', '$route', function($scope, $location, $http, cookieService, $route) {
    $scope.copublisherList = [
      'NUS', 
      'Cornell',
      'Partner Company'
    ];

    $scope.selectCopublisher = function(copublisher){
        $scope.loader = true;
        
        getCurrentCopublisherIntroduction(copublisher);

        function getCurrentCopublisherIntroduction(copublisher){
            $http.post("ajax/getCurrentCopublisherIntroduction.php?copublisher="+copublisher)
            .then(function(response) {
                document.getElementById('current-copublisher-introduction').innerHTML = '';
                var results = response.data;
                var introduction = results; 
                if(introduction != null && introduction != null){
                    document.getElementById('current-copublisher-introduction').innerHTML = introduction;
                }          
            }, function(response){}).finally(function(){$scope.loader = false;})
        }; 
    };

    $scope.selectCopublisherNew = function(copublisherNew){
        $scope.copublisherNew = copublisherNew;
    }

    $scope.inputNewCopublisherIntroduction = function(newContent){
        $scope.newContent = newContent;
    };

    $scope.changeIntroduction = function(){
        $scope.loader = true;
        var informationIncomplete = false;
        if($scope.newContent == '' || $scope.newContent == null || undefined == typeof $scope.copublisherNew || $scope.copublisherNew == null || $scope.copublisherNew == '')
        {
            informationIncomplete = true;
        }

        if(informationIncomplete == true){
            alert("information Incomplete!");
            $scope.loader = false;
        }else{
            var flag = confirm("Are you going to change the content?");
            if (flag == true) {
                $scope.newContent = $scope.newContent.replace(/\r\n|\r|\n/g,"<br />");
                $scope.newContent = $scope.newContent.replace(/'/g,'%26apos;');
                $scope.newContent = $scope.newContent.replace('&','and');          
                $http.post("ajax/updateCurrentCopublisherIntroduction.php?copublisher="+$scope.copublisherNew+"&content="
                    +$scope.newContent)
                .then(function(response) {
                }, function(response){}).finally(function(){$scope.loader = false;$route.reload();})
            } 
        }
    };

}]);