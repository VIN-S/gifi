app.controller('homeIntroductionCtrl', 
['$scope', '$location', '$http', 'cookieService', '$route', function($scope, $location, $http, cookieService, $route) {
    //Edit home introduction
    $scope.loader = true;
    
    $scope.newIntroductionContent = "";

    getCurrentIntroductionText();

    function getCurrentIntroductionText(){
        $http.post("ajax/getCurrentHomeIntroductionContent.php")
        .then(function(response) {
            var results = response.data;
            var content = results['content']; 
            document.getElementById('current-introduction-content').innerHTML = content;
        }, function(response){}).finally(function(){$scope.loader = false;})
    }; 
    

    $scope.changeHomeIntroduction = function(newIntroduction){
        $scope.loader = true;
        var flag = confirm("Are you going to change the content?");
        if (flag == true) {
            newIntroduction = newIntroduction.replace(/\r\n|\r|\n/g,"<br />");
            newIntroduction = newIntroduction.replace(/'/g,'%26apos;');
            newIntroduction = newIntroduction.replace('&','and'); 
            $http.post("ajax/updateCurrentHomeIntroductionContent.php?content="+newIntroduction)
            .then(function(response) {
                $route.reload();
            }, function(response){}).finally(function(){$scope.loader = false;})
        } 
    };
}]);