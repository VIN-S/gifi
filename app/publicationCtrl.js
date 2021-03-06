//controller for home page
app.controller("publicationCtrl", ['$http', '$scope', '$rootScope', 'NgTableParams', '$location', '$anchorScroll',  
  function ($http, $scope, $rootScope, NgTableParams, $location, $anchorScroll) {
  	$scope.loader = true;

    getLatestInauguralPDF();

  	function getLatestInauguralPDF(){
  		$http.post("ajax/getInauguralGIFIData.php")
        .then(function(response) {

            var temp=response.data.split("//");

            $scope.pdfLists = [];
            var tempList = [];
            var flagList = [];

            for(var i=0;i<temp.length;i++){
              if(temp[i] !== undefined && temp[i] !==null && temp[i] !== ""){
                tempList[i] = JSON.parse(temp[i]);
                tempList[i]['year'] = parseInt(tempList[i]['yearOfDocument']);

                if(tempList[i]['documentType'] == 'Full Report'){
                	$scope.pdfLists[0] = tempList[i];
                  flagList.push(0);
                }else if(tempList[i]['documentType'] == 'Executive Summary'){
                	$scope.pdfLists[1] = tempList[i];
                  flagList.push(1);
                }else if(tempList[i]['documentType'] == 'Appendix'){
                	$scope.pdfLists[2] = tempList[i];
                  flagList.push(2);
                }else if(tempList[i]['documentType'] == 'Technical Notes'){
                	$scope.pdfLists[3] = tempList[i];
                  flagList.push(3);
                }else if(tempList[i]['documentType'] == 'Index Presentation Slides'){
                	$scope.pdfLists[4] = tempList[i];
                  flagList.push(4);
                }
              }
            };

            for(var i = 0;i < 5;i++)
              for(var j = 0;j < flagList.length; j++){
                  if(i == flagList[j]){
                    $scope.pdfLists[i]['link'] = 'admin/ajax/uploaded_pdf/'+$scope.pdfLists[i]['name'];
                    if($scope.pdfLists[i]['documentType'] == 'Full Report'){
                        $scope.pdfLists[i]['downloadImageSrc'] = 'admin/ajax/uploaded_gifi_logo/gifi-logo.jpg';
                      }else{
                        $scope.pdfLists[i]['downloadImageSrc'] = 'img/pdf_icon.jpg';
                      }
                  }
              }

        })
  	};

    getHistoricalIndices();

    function getHistoricalIndices(){
        $http.post("ajax/getHistoricalIndices.php")
        .then(function(response) {

            var temp=response.data.split("//");

            $scope.historicalIndicesList = [];
            var tempList = [];

            for(var i = 0;i<temp.length;i++){
              if(temp[i] !== undefined && temp[i] !==null && temp[i] !== ""){
                tempList[i] = JSON.parse(temp[i]);
                tempList[i]['year'] = parseInt(tempList[i]['yearOfDocument']);

                $scope.historicalIndicesList[i] = tempList[i];
              }
            };

            for(var i=0;i < temp.length-1;i++){
                $scope.historicalIndicesList[i]['link'] = 'admin/ajax/uploaded_pdf/'+$scope.historicalIndicesList[i]['name'];
                $scope.historicalIndicesList[i]['displayName'] = $scope.historicalIndicesList[i]['yearOfDocument'] + " GIFI";
            }

        })
    };

    //Modular Content
    getHeaderContent();

    function getHeaderContent(){
      $http.post("ajax/getPublicationHeaderContent.php?header=First Red Color Header")
      .then(function(response) {
        var results = response.data;
        var headerContent =  results['headerContent']; 
        var headerDescription =  results['headerDescription']; 

        document.getElementById('firstHeader').innerHTML = headerContent;
        document.getElementById('firstHeaderDescription').innerHTML = headerDescription;
      })

      $http.post("ajax/getPublicationHeaderContent.php?header=Second Red Color Header")
      .then(function(response) {
        var results = response.data;
        var headerContent =  results['headerContent']; 
        var headerDescription =  results['headerDescription']; 

        document.getElementById('secondHeader').innerHTML = headerContent;
        document.getElementById('secondHeaderDescription').innerHTML = headerDescription;
      }, function(response){}).finally(function(){$scope.loader = false;})
    }
}]);