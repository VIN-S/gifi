//controller for home page
app.controller("researchCtrl", ['$http', '$scope', '$rootScope', 'NgTableParams', '$location', '$anchorScroll',  
  function ($http, $scope, $rootScope, NgTableParams, $location, $anchorScroll) {
  	$scope.loader = true;

    getResearchPapers();

    function getResearchPapers(){
        $http.post("ajax/getResearchPapers.php")
        .then(function(response) {

            var temp=response.data.split("//");

            $scope.researchPapers = [];
            var tempList = [];

            for(var i = 0;i<temp.length;i++){
              if(temp[i] !== undefined && temp[i] !==null && temp[i] !== ""){
                tempList[i] = JSON.parse(temp[i]);
                tempList[i]['year'] = parseInt(tempList[i]['yearOfDocument']);

                $scope.researchPapers[i] = tempList[i];
              }
            };

            for(var i=0;i < temp.length-1;i++){
                $scope.researchPapers[i]['link'] = 'admin/ajax/uploaded_papers/'+$scope.researchPapers[i]['fileName'];
                $scope.researchPapers[i]['displayNameFirstLine'] = $scope.researchPapers[i]['title'] + "("+$scope.researchPapers[i]['year']+")";
                $scope.researchPapers[i]['displayNameSecondLine'] = $scope.researchPapers[i]['journalName']+", "+$scope.researchPapers[i]['issueNumber']+", "
                                                                    +$scope.researchPapers[i]['volumeNumber'];
                $scope.researchPapers[i]['displayNameThirdLine'] = $scope.researchPapers[i]['authorNames'];                                                                                                  
            }

        }, function(response){}).finally(function(){$scope.loader = false;});
    }
}]);