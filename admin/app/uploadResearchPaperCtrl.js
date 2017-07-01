app.controller('uploadResearchPaperCtrl', 
['$scope', '$location', '$http', 'cookieService', 'Upload', '$timeout', 'NgTableParams', '$route', 
    function($scope, $location, $http, cookieService, Upload, $timeout, NgTableParams, $route) {
    $scope.loader = true;

    var d = new Date();
    var currentYear = d.getFullYear();  

    $scope.paperYearList = []; 

    for(var i = 15; i>=-1; i--){
        $scope.paperYearList.push(currentYear - i);
    }; 

    $scope.inputPaperTitle = function(paperTitle){
        $scope.paperTitle = paperTitle;
    }

    $scope.paperSelectYear = function(paperYear){
        $scope.paperYear = paperYear;
    }

    $scope.inputJournalName = function(journalName){
        $scope.journalName = journalName;
    }

    $scope.inputIssueNumber = function(issueNumber){
        $scope.issueNumber = issueNumber;
    }

    $scope.inputVolumeNumber = function(volumeNumber){
        $scope.volumeNumber = volumeNumber;
    }

    $scope.inputAuthorName = function(authorNames){
        $scope.authorNames = authorNames;
    }

    $scope.selectFile = function(file){
        $scope.selectFileName = file.name;
    }

    $scope.submit = function (file) {
        $scope.loader = true;
        $scope.file = file;
        if($scope.paperTitle == null || $scope.paperTitle == "" || $scope.paperYear == null || $scope.paperYear == ""
            || $scope.journalName == null || $scope.journalName == "" || $scope.authorNames == null || $scope.authorNames == "" || file == null){
            if($scope.paperTitle == null || $scope.paperTitle == "" || $scope.paperYear == null || $scope.paperYear == ""
            || $scope.journalName == null || $scope.journalName == "" || $scope.authorNames == null || $scope.authorNames == ""){
                alert("Information Incomplete!");
                $scope.loader = false;
            }
            else if(file == null){
                alert("No File Selected!");
                $scope.loader = false;
            }
        }else{
            Upload.upload({
                url: 'ajax/uploadResearchPaper.php',
                method: 'POST',
                data: {
                    file: file
                }
            }).then(function (response) {
                $timeout(function () {
                    $scope.result = response.data;
                    
                    updateDatabase();

                    function updateDatabase(){
                        $http.post("ajax/insertUploadedPaperInfo.php?title="+$scope.paperTitle+"&year="+$scope.paperYear+"&fileName="+$scope.selectFileName+
                            "&journalName="+$scope.journalName+"&issueNumber="+$scope.issueNumber+"&volumeNumber="+$scope.volumeNumber+
                            "&authorNames="+$scope.authorNames)
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
        $http.post("ajax/getResearchPaperData.php")
        .then(function(response) {
            var temp=response.data.split("//");

            var dataset = [];
            for(var i=0;i<temp.length;i++){
              if(temp[i] !== undefined && temp[i] !==null && temp[i] !== ""){
                dataset[i] = JSON.parse(temp[i]);
                dataset[i]['fileName'] = dataset[i]['fileName'];
                dataset[i]['title'] = dataset[i]['title'];
                dataset[i]['year'] = parseInt(dataset[i]['yearOfDocument']);
                dataset[i]['journal'] = dataset[i]['journalName'];
                dataset[i]['issueNumber'] = dataset[i]['issueNumber'];
                dataset[i]['volumeNumber'] = dataset[i]['volumeNumber'];
                dataset[i]['authors'] = dataset[i]['authorNames'];
                
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
            $http.post("ajax/deleteResearchPaperRecord.php?name="+name)
            .then(function(response) {
            });

            $http.post("ajax/deleteResearchPaper.php?name="+name)
            .then(function(response) {
                alert(response.data);
                $route.reload();
            }, function(response){}).finally(function(){$scope.loader = false;});
        }
    };
}]);