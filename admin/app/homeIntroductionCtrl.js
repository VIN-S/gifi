app.controller('homeIntroductionCtrl', 
['$scope', '$location', '$http', 'cookieService', function($scope, $location, $http, cookieService) {
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
    } 
    

    $scope.changeHomeIntroduction = function(newIntroduction){
        var flag = confirm("Are you going to change the content?");
        if (flag == true) {
            $http.post("ajax/updateCurrentHomeIntroductionContent.php?content="+newIntroduction)
            .then(function(response) {
                $location.url('/home-introduction');
                tabClasses[2] = "active";
                $scope.scroll_menu = "display";

                document.getElementById('current-introduction-content').innerHTML = "";

                getCurrentIntroductionText();

                function getCurrentIntroductionText(){
                    $http.post("ajax/getCurrentHomeIntroductionContent.php")
                    .then(function(response) {
                        var results = response.data;
                        var content = results['content']; 

                        document.getElementById('current-introduction-content').innerHTML += content;
                    })
                } 
            });
        } 
    }
}]);