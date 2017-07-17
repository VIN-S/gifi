app.controller('aboutUsBackgroundCtrl', 
['$scope', '$location', '$http', 'cookieService', '$route', function($scope, $location, $http, cookieService, $route) {
    $scope.positionList = [
      'Top(light blue text)', 
      'Left Bottom(black text)',
      'Left Right(light blue background and red text)'
    ];

    $scope.selectTextPosition = function(textPosition){
        $scope.loader = true;
        
        getCurrentBackgroundText(textPosition);

        function getCurrentBackgroundText(textPosition){
            $http.post("ajax/getCurrentBackgroundText.php?position="+textPosition)
            .then(function(response) {
                document.getElementById('current-background-content').innerHTML = '';
                var results = response.data;
                var backgroundText = results; 
                if(backgroundText != null && backgroundText != null){
                    document.getElementById('current-background-content').innerHTML = backgroundText;
                }          
            }, function(response){}).finally(function(){$scope.loader = false;})
        }; 
    };

    $scope.selectTextPositionNew = function(textPositionNew){
        $scope.textPositionNew = textPositionNew;
    }

    $scope.inputNewBackgroundContent = function(newContent){
        $scope.newContent = newContent;
    };

    $scope.changeBackgroundText = function(){
        $scope.loader = true;
        var informationIncomplete = false;
        if($scope.newContent == '' || $scope.newContent == null || undefined == typeof $scope.textPositionNew || $scope.textPositionNew == null || $scope.textPositionNew == '')
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
                $http.post("ajax/updateCurrentBackgroundText.php?position="+$scope.textPositionNew+"&content="
                    +$scope.newContent)
                .then(function(response) {
                }, function(response){}).finally(function(){$scope.loader = false;$route.reload();})
            } 
        }
    };

}]);