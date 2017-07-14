app.controller('uploadInauguralCtrl', 
['$scope', '$location', '$http', 'cookieService', 'Upload', '$timeout', 'NgTableParams', '$route', 
    function($scope, $location, $http, cookieService, Upload, $timeout, NgTableParams, $route) {
    $scope.loader = true;

    $scope.pdfTypeList = [
        'Full Report', 
        'Executive Summary', 
        'Appendix', 
        'Technical Notes', 
        'Index Presentation Slides'
        ];

    var d = new Date();
    var currentYear = d.getFullYear();  

    $scope.pdfYearList = []; 

    for(var i = 5; i>=-1; i--){
        $scope.pdfYearList.push(currentYear - i);
    }; 

    $scope.pdfSelectType = function(pdfType){
        $scope.pdfType = pdfType;
    }

    $scope.pdfSelectYear = function(pdfYear){
        $scope.pdfYear = pdfYear;
    }

    $scope.selectFile = function(file){
        $scope.selectFileName = file.name;
    }

    $scope.submit = function (file) {
        $scope.loader = true;
        $scope.file = file;
        if($scope.pdfType == null || $scope.pdfType == "" || $scope.pdfYear == null || $scope.pdfYear == "" || file == null){
            if($scope.pdfType == null || $scope.pdfType == "" || $scope.pdfYear == null || $scope.pdfYear == ""){
                alert("Information Incomplete!");
                $scope.loader = false;
            }
            else if(file == null){
                alert("No File Selected!");
                $scope.loader = false;
            }
        }else{
            Upload.upload({
                    url: 'ajax/uploadInauguralGIFIPDF.php',
                    method: 'POST',
                    data: {
                        file: file
                    }
                }).then(function (response) {
                    $timeout(function () {
                        $scope.result = response.data;
                        
                        updateDatabase();

                        function updateDatabase(){
                            $http.post("ajax/insertUploadedPDFInfo.php?type="+$scope.pdfType+"&year="+$scope.pdfYear+"&name="+$scope.selectFileName)
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
        $http.post("ajax/getInauguralGIFIData.php")
        .then(function(response) {
            var temp=response.data.split("//");

            var dataset = [];
            for(var i=0;i<temp.length;i++){
              if(temp[i] !== undefined && temp[i] !==null && temp[i] !== ""){
                dataset[i] = JSON.parse(temp[i]);
                dataset[i]['name'] = dataset[i]['name'];
                dataset[i]['type'] = dataset[i]['documentType'];
                dataset[i]['year'] = parseInt(dataset[i]['yearOfDocument']);
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
            $http.post("ajax/deleteInauguralGIFIPDFRecord.php?name="+name)
            .then(function(response) {
            });

            $http.post("ajax/deleteInauguralGIFIPDF.php?name="+name)
            .then(function(response) {
                alert(response.data);
                $route.reload();
            }, function(response){}).finally(function(){$scope.loader = false;});
        }
    };
}]);