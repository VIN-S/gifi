app.controller('homeComponentCtrl', 
['$scope', '$location', '$http', 'cookieService', '$route', function($scope, $location, $http, cookieService, $route) {
    $scope.componentList = [
      'Legal and Regulatory Environment', 
      'Market Development', 
      'Exchange Controls and Capital Restrictions', 
      'Corporate Governance', 
      'AUM Levels and Growth', 
      'Banking System', 
      'Ease of Doing Business', 
      'Political Environment', 
      'Accounting System'
    ];

    $scope.selectComponent = function(component){
        $scope.loader = true;
        
        getCurrentComponentText(component);

        function getCurrentComponentText(component){
            $http.post("ajax/getCurrentHomeComponentText.php?component="+component)
            .then(function(response) {
                var results = response.data;
                var content = results['description']; 
                document.getElementById('current-component-description').innerHTML = content;
            })

            $http.post("ajax/getCurrentHomeComponentFactors.php?component="+component)
            .then(function(response) {

                var temp=response.data.split("//");

                var dataset = [];
                for(var i=0;i<temp.length;i++){
                  if(temp[i] !== undefined && temp[i] !==null && temp[i] !== ""){
                    dataset[i] = JSON.parse(temp[i]);
                  }
                }

                $scope.tempList = [];

                for(var i=0;i<dataset.length;i++){
                    $scope.tempList.push(dataset[i]['factor']);
                }

                $scope.factors = $scope.tempList;

            }, function(response){}).finally(function(){$scope.loader = false;})
        }; 
    };

    $scope.selectComponentNew = function(component){
        $scope.componentNew = component;
    }

    $scope.newFactors = [{
        id:1,
        factor:''
    }];

    $scope.addNewFactor = function(){
        newId = $scope.newFactors.length + 1;
        var temp = {
            'id':newId,
            'factor': ''
        };
        $scope.newFactors.push(temp);
    };

    $scope.inputNewComponentContent = function(newComponentContent){
        $scope.newComponentContent = newComponentContent;
    };
    
    $scope.changeHomeComponent = function(){
        $scope.loader = true;
        var informationIncomplete = false;
        for(var i = 0; i < $scope.newFactors.length; i++){
            if($scope.newFactors[i]['factor'] == '' || $scope.newFactors[i]['factor'] == null){
                informationIncomplete = true;
            }
        }

        if($scope.newComponentContent == '' || $scope.newComponentContent == null){
            informationIncomplete = true;
        } 

        if(undefined == typeof $scope.componentNew || $scope.componentNew == null){
            informationIncomplete = true;
        }

        if(informationIncomplete == true){
            alert("information Incomplete!");
            $scope.loader = false;
        }else{
            var flag = confirm("Are you going to change the content?");
            if (flag == true) {
                $scope.newComponentContent = $scope.newComponentContent.replace(/\r\n|\r|\n/g,"<br />");
                $http.post("ajax/updateCurrentHomeComponentDescription.php?description="+$scope.newComponentContent+"&component="+$scope.componentNew)
                .then(function(response) {
                });

                var today = new Date();
                today=today.toISOString(); 

                for(var i = 0; i < $scope.newFactors.length; i++){
                    var tempFactor = $scope.newFactors[i]['factor'];
                    $http.post("ajax/updateCurrentHomeComponentFactor.php?factor="+tempFactor+"&date="+today+"&component="+$scope.componentNew)
                    .then(function(response) {
                    }, function(response){}).finally(function(){$scope.loader = false;$route.reload();})
                }
            } 
        }
    };

}]);