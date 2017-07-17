app.controller('publicationCtrl', 
['$scope', '$location', '$http', 'cookieService', '$route', function($scope, $location, $http, cookieService, $route) {
    $scope.headerList = [
      'Blue Color Header', 
      'First Red Color Header', 
      'Second Red Color Header'
    ];

    $scope.selectPublicationHeader = function(publicationHeader){
        $scope.loader = true;
        
        getCurrentHeaderText(publicationHeader);

        function getCurrentHeaderText(publicationHeader){
            $http.post("ajax/getCurrentPublicationHeaderAndDescription.php?header="+publicationHeader)
            .then(function(response) {
                document.getElementById('current-header-content').innerHTML = '';
                document.getElementById('current-header-description').innerHTML = '';
                var results = response.data;
                var headerContent = results['headerContent']; 
                var headerDescription = results['headerDescription']; 
                if(headerContent != null && headerDescription != null){
                    console.log(headerContent+headerDescription);
                    document.getElementById('current-header-content').innerHTML = headerContent;
                    if(publicationHeader != 'Blue Color Header')
                        document.getElementById('current-header-description').innerHTML = headerDescription;
                    else
                        document.getElementById('current-header-description').innerHTML = '';
                }          
            }, function(response){}).finally(function(){$scope.loader = false;})
        }; 
    };

    $scope.selectPublicationHeaderNew = function(publicationHeaderNew){
        $scope.publicationHeaderNew = publicationHeaderNew;
        if(publicationHeaderNew == 'Blue Color Header'){
            $scope.showDescription = false;
        }else{
            $scope.showDescription = true;
        }
    }

    $scope.inputNewHeaderContent = function(newHeaderContent){
        $scope.newHeaderContent = newHeaderContent;
    };

    $scope.inputNewHeaderDescription = function(newHeaderDescription){
        $scope.newHeaderDescription = newHeaderDescription;
    };
    
    $scope.changeHeaderContentAndDescription = function(newHeaderContent, newHeaderDescription){
        $scope.loader = true;
        var informationIncomplete = false;
        if( 
            (
                ($scope.newHeaderContent == '' || $scope.newHeaderContent == null || $scope.newHeaderDescription == '' || $scope.newHeaderDescription == null) 
                    && 
                $scope.publicationHeaderNew != 'Blue Color Header'
            )
                ||  
            (
                ($scope.newHeaderContent == '' || $scope.newHeaderContent == null)
                    && 
                $scope.publicationHeaderNew == 'Blue Color Header'
            ) 
          )
        {
            informationIncomplete = true;
        }

        if(informationIncomplete == true){
            alert("information Incomplete!");
            $scope.loader = false;
        }else{
            var flag = confirm("Are you going to change the content?");
            if (flag == true) {
                $scope.newHeaderContent = $scope.newHeaderContent.replace(/\r\n|\r|\n/g,"<br />");
                if($scope.publicationHeaderNew != 'Blue Color Header')
                    $scope.newHeaderDescription = $scope.newHeaderDescription.replace(/\r\n|\r|\n/g,"<br />");
                $http.post("ajax/updateCurrentPublicationHeaderAndDescription.php?header="+$scope.publicationHeaderNew+"&headerContent="
                    +$scope.newHeaderContent+"&newHeaderDescription="+$scope.newHeaderDescription)
                .then(function(response) {
                }, function(response){}).finally(function(){$scope.loader = false;$route.reload();})
            } 
        }
    };

}]);