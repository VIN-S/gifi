app.controller('uploadInanguralCtrl', 
['$scope', '$location', '$http', 'cookieService', 'Upload', '$timeout', 'NgTableParams', 
    function($scope, $location, $http, cookieService, Upload, $timeout, NgTableParams) {
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
        if (file) {
            Upload.upload({
                url: 'ajax/upload.php',
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
                            $location.url('/uploadInangural');
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
        }else if($scope.pdfType == null || $scope.pdfType == "" || $scope.pdfYear == null || $scope.pdfYear == ""){
            alert("Information Incomplete!");
        }
        else if(file == null){
            alert("No File Selected!");
        }
    };

    getDocumensData();

    function getDocumensData(){
        $scope.loader = true;

        $http.post("ajax/getInanguralGIFIData.php")
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

    $scope.delete = function(name, type, year){
        $http.delete('ajax/uploaded_pdf/'+name).then(function(response){
               if (response.status == 200) {
                    console.log("Success");
               }
         });
    }
}]);