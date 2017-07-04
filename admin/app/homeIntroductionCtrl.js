app.controller('homeIntroductionCtrl', 
['$scope', '$location', '$http', 'cookieService', '$route', function($scope, $location, $http, cookieService, $route) {
    //Edit home introduction
    
    $scope.newIntroductionContent = "";

    getCurrentIntroductionText();

    function getCurrentIntroductionText(){
        $http.post("ajax/getCurrentHomeIntroductionContent.php")
        .then(function(response) {
            var results = response.data;
            var content = results['content']; 
            document.getElementById('current-introduction-content').innerHTML = content;
        })
    }; 
    

    $scope.changeHomeIntroduction = function(newIntroduction){
        var flag = confirm("Are you going to change the content?");
        if (flag == true) {
            newIntroduction = newIntroduction.replace(/\r\n|\r|\n/g,"<br />");
            $http.post("ajax/updateCurrentHomeIntroductionContent.php?content="+newIntroduction)
            .then(function(response) {
                $route.reload();
            });
        } 
    };
}]);