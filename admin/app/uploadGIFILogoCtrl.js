app.controller('uploadGIFILogoCtrl', 
['$scope', '$location', '$http', 'cookieService', 'Upload', '$timeout', 'NgTableParams', '$route', 
    function($scope, $location, $http, cookieService, Upload, $timeout, NgTableParams, $route) {
    $scope.loader = true;

    $scope.selectFile = function(file){
        $scope.selectFileName = file.name;
    }

    $scope.submit = function (file) {
        $scope.loader = true;
        $scope.file = file;
        
        if(file == null){
            alert("No File Selected!");
            $scope.loader = false;
        }else{
            $scope.newFileName = 'gifi-logo.jpg';

            Upload.upload({
                url: 'ajax/uploadGIFILogo.php',
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
                        $http.post("ajax/insertUploadedGIFILogoInfo.php?name="+$scope.newFileName)
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
        $http.post("ajax/getGIFILogoData.php")
        .then(function(response) {
            var temp=response.data.split("//");

            var dataset = [];
            for(var i=0;i<temp.length;i++){
              if(temp[i] !== undefined && temp[i] !==null && temp[i] !== ""){
                dataset[i] = JSON.parse(temp[i]);
                dataset[i]['fileName'] = dataset[i]['name'];
                
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
            $http.post("ajax/deleteGIFILogoRecord.php?name="+name)
            .then(function(response) {
            });

            $http.post("ajax/deleteGIFILogo.php?name="+name)
            .then(function(response) {
                alert(response.data);
                $route.reload();
            }, function(response){}).finally(function(){$scope.loader = false;});
        }
    };
}]);