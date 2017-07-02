app.controller('uploadComponentImagesCtrl', 
['$scope', '$location', '$http', 'cookieService', 'Upload', '$timeout', 'NgTableParams', '$route', 
    function($scope, $location, $http, cookieService, Upload, $timeout, NgTableParams, $route) {
    $scope.loader = true;

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
        $scope.component = component;
    }

    $scope.selectFile = function(file){
        $scope.selectFileName = file.name;
    }

    $scope.submit = function (file) {
        $scope.loader = true;
        $scope.file = file;
        if($scope.component == null || $scope.component == "" || file == null){
            if($scope.component == null || $scope.component == ""){
                alert("Information Incomplete!");
                $scope.loader = false;
            }
            else if(file == null){
                alert("No File Selected!");
                $scope.loader = false;
            }
        }else{
            if($scope.component == $scope.componentList[0]){
                $scope.newFileName = 'legal_and_regulatory_environment.jpg';
            }else if($scope.component == $scope.componentList[1]){
                $scope.newFileName = 'market_development.jpg';
            }else if($scope.component == $scope.componentList[2]){
                $scope.newFileName = 'exchange_controls_and_capital_restriction.jpg';
            }else if($scope.component == $scope.componentList[3]){
                $scope.newFileName = 'corporate_governance.jpg';
            }else if($scope.component == $scope.componentList[4]){
                $scope.newFileName = 'aum_levels_and_growth.jpg';
            }else if($scope.component == $scope.componentList[5]){
                $scope.newFileName = 'banking_system.jpg';
            }else if($scope.component == $scope.componentList[6]){
                $scope.newFileName = 'ease_of_doing_business.jpg';
            }else if($scope.component == $scope.componentList[7]){
                $scope.newFileName = 'political_environment.jpg';
            }else if($scope.component == $scope.componentList[8]){
                $scope.newFileName = 'accounting_system.jpg';
            }

            Upload.upload({
                url: 'ajax/uploadComponentImages.php',
                method: 'POST',
                file: file,
                data: {
                    'fileName': $scope.newFileName
                }
            }).then(function (response) {
                $timeout(function () {
                    $scope.result = response.data;
                    
                    updateDatabase();

                    function updateDatabase(){
                        $http.post("ajax/insertUploadedComponentImageInfo.php?name="+$scope.newFileName+"&component="+$scope.component)
                        .then(function(response) {
                            alert($scope.result);
                            $route.reload();
                        }, function(response){}).finally(function(){$scope.loader = false;}); 
                    }
                });
            }, function (response) {
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                    console.log($scope.errorMsg);
                }
            }, function (evt) {
                
            });
        }
    };

    getDocumensData();

    function getDocumensData(){
        $http.post("ajax/getComponentImagesData.php")
        .then(function(response) {
            var temp=response.data.split("//");

            var dataset = [];
            for(var i=0;i<temp.length;i++){
              if(temp[i] !== undefined && temp[i] !==null && temp[i] !== ""){
                dataset[i] = JSON.parse(temp[i]);
                dataset[i]['fileName'] = dataset[i]['name'];
                dataset[i]['component'] = dataset[i]['component'];
                
                dataset[i]['upload_time'] = dataset[i]['upload_date'];
              }
            }

            $scope.tableParams = new NgTableParams({
                count: 10 
            }, {
                data: dataset
            });

            // console.log($scope.tableParams);
        }, function(response){}).finally(function(){$scope.loader = false;});
    };

    $scope.delete = function(name){
        if(confirm("Are you going to delete "+name+"?"))
        {
            $http.post("ajax/deleteComponentImageRecord.php?name="+name)
            .then(function(response) {
            });

            $http.post("ajax/deleteComponentImage.php?name="+name)
            .then(function(response) {
                alert(response.data);
                $route.reload();
            }, function(response){}).finally(function(){$scope.loader = false;});
        }
    };
}]);
