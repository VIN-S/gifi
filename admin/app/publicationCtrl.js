app.controller('publicationCtrl', 
['$scope', '$location', '$http', 'cookieService', '$route', function($scope, $location, $http, cookieService, $route) {
    $scope.headerList = [
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
                    document.getElementById('current-header-content').innerHTML = headerContent;
                    document.getElementById('current-header-description').innerHTML = headerDescription;
                }          
            }, function(response){}).finally(function(){$scope.loader = false;})
        }; 
    };

    $scope.selectPublicationHeaderNew = function(publicationHeaderNew){
        $scope.publicationHeaderNew = publicationHeaderNew;
    }

    $scope.inputNewHeaderContent = function(newHeaderContent){
        $scope.newHeaderContent = newHeaderContent;
    };

    $scope.inputNewHeaderDescription = function(newHeaderDescription){
        $scope.newHeaderDescription = newHeaderDescription;
    };
    
    $scope.changeHeaderContentAndDescription = function(){
        $scope.loader = true;
        var informationIncomplete = false;
        if(undefined == typeof $scope.publicationHeaderNew || $scope.publicationHeaderNew == '' || $scope.publicationHeaderNew == null || $scope.newHeaderContent == '' || $scope.newHeaderContent == null || $scope.newHeaderDescription == '' || $scope.newHeaderDescription == null)
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
                $scope.newHeaderContent = $scope.newHeaderContent.replace(/'/g,'%26apos;');
                $scope.newHeaderContent = $scope.newHeaderContent.replace('&','and'); 

                $scope.newHeaderDescription = $scope.newHeaderDescription.replace(/\r\n|\r|\n/g,"<br />");
                $scope.newHeaderDescription = $scope.newHeaderDescription.replace(/'/g,'%26apos;');
                $scope.newHeaderDescription = $scope.newHeaderDescription.replace('&','and'); 

                $http.post("ajax/updateCurrentPublicationHeaderAndDescription.php?header="+$scope.publicationHeaderNew+"&headerContent="
                    +$scope.newHeaderContent+"&newHeaderDescription="+$scope.newHeaderDescription)
                .then(function(response) {
                }, function(response){}).finally(function(){$scope.loader = false;$route.reload();})
            } 
        }
    };

}]);