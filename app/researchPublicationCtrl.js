//controller for home page
app.controller("researchPublicationCtrl", ['$http', '$scope', '$rootScope', 'NgTableParams', '$location', '$anchorScroll',  
  function ($http, $scope, $rootScope, NgTableParams, $location, $anchorScroll) {
  	getLatestInanguralPDF();

  	function getLatestInanguralPDF(){
  		$scope.loader = true;
  		$http.post("ajax/getInanguralGIFIData.php")
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

        }, function(response){}).finally(function(){$scope.loader = false;});
  	};
}]);