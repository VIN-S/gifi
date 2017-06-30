app.controller('uploadInanguralCtrl', 
['$scope', '$location', '$http', 'cookieService', 'Upload', '$timeout', function($scope, $location, $http, cookieService, Upload, $timeout) {
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

    $scope.inputFileName = function(fileName){
        $scope.fileName = fileName;
    }

    $scope.selectFile = function(file){
        $scope.selectFileName = file.name;
    }

    $scope.submit = function (file) {
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
                        $http.post("ajax/insertUploadedPDFInfo.php?type="+$scope.pdfType+"&year="+$scope.pdfYear+"&name="+$scope.fileName)
                        .then(function(response) {
                            alert($scope.result);
                        }); 
                    }
                });
            }, function (response) {
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                    console.log($scope.errorMsg);
                }
            }, function (evt) {
                
            });
        }else if($scope.pdfType == null || $scope.pdfType == "" || $scope.pdfYear == null || $scope.pdfYear == "" || 
            $scope.fileName == null || $scope.fileName == ""){
            alert("Information Incomplete!");
        }
        else if(file == null){
            alert("No File Selected!");
        }
    };
}]);