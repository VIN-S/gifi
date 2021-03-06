//controller for home page
app.controller("rankingCtrl", ['$http', '$scope', '$rootScope', 'NgTableParams', '$location', '$anchorScroll',  
    function ($http, $scope, $rootScope, NgTableParams, $location, $anchorScroll) {
    //Get list of years
    getListOfYears();
    getListOfRegions();
    getLatestYearRanking();

    //define table object before load
    $scope.gridOptions = {
        enableColumnMenus: false, 
        enableRowSelection: true, 
        enableRowHeaderSelection: false,
        multiSelect: false,
        // rowHeight: 38
    };

    $scope.gridOptions.columnDefs = [
        { name: 'country', width: 170, pinnedLeft:true, headerCellTemplate: './partials/templates/uiGridHeaderCellTemplate.html'},
        { name: 'investor_friendliness_rank', type:'number', width: 170 , headerCellTemplate: './partials/templates/uiGridHeaderCellTemplate.html'},
        { name:'legal_and_regulatory_environment', displayName: "Legal & Regulatory Environment", type:'number', width:160, headerCellTemplate: './partials/templates/uiGridHeaderCellTemplate.html' },
        { name:'market_development', type:'number', width:160, headerCellTemplate: './partials/templates/uiGridHeaderCellTemplate.html' },
        { name:'exchange_controls_and_capital_restriction', displayName: "Exchange Controls & Capital Restriction", type:'number', width:160, headerCellTemplate: './partials/templates/uiGridHeaderCellTemplate.html' },
        { name:'corporate_governance', type:'number', width:160, headerCellTemplate: './partials/templates/uiGridHeaderCellTemplate.html' },
        { name:'aum_levels_and_growth', displayName: "AUM Level & Growth", type:'number', width:160, headerCellTemplate: './partials/templates/uiGridHeaderCellTemplate.html' },
        { name:'banking_system', type:'number', width:160, headerCellTemplate: './partials/templates/uiGridHeaderCellTemplate.html' },
        { name:'ease_of_doing_business', displayName: "Ease of Doing Business", type:'number', width:160, headerCellTemplate: './partials/templates/uiGridHeaderCellTemplate.html' },
        { name:'political_environment', type:'number', width:160, headerCellTemplate: './partials/templates/uiGridHeaderCellTemplate.html' },
        { name:'accounting_system', type:'number', width:160, headerCellTemplate: './partials/templates/uiGridHeaderCellTemplate.html' }
    ];

    $scope.gridOptions.rowTemplate = '<div class="row-uid-{{row.uid}}">  <div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid"  ng-mouseover="grid.appScope.onRowHover(row.uid);"  ng-mouseout="grid.appScope.onRowOut(row.uid);"  ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'"  class="ui-grid-cell"  ng-class="{\'ui-grid-row-header-cell\': col.isRowHeader}"  role="{{col.isRowHeader ? \'rowheader\' : \'gridcell\'}}"  ui-grid-cell></div></div>';

    $scope.onRowHover = function (rowUid) {
        $('.row-uid-' + rowUid + ' .ui-grid-cell-contents').addClass("ranking-table-row-hover");
    };

    $scope.onRowOut = function (rowUid) {
        $('.row-uid-' + rowUid + ' .ui-grid-cell-contents').removeClass("ranking-table-row-hover");
    };

    function getListOfYears() {
        $http.post("ajax/getListOfYears.php")
        .then(function(response) {
            var temp = response.data.substring(1, response.data.length-1);
            $scope.yearLists = temp.split("\"\"");
        });
    };

    function getListOfRegions() {
        $http.post("ajax/getListOfRegions.php")
        .then(function(response) {
            $scope.regionLists = [];
            $scope.regionLists[0] = 'All';
            var temp = response.data.substring(1, response.data.length-1);
            $scope.regionLists =  $scope.regionLists.concat(temp.split("\"\""));
        });
    };

    function getLatestYearRanking(){
        $scope.loader = true;
        $http.post("ajax/getLatestYear.php")
        .then(function(response) {
            var latestYear = response.data['latestYear'];
            $scope.updateRankingByYear(latestYear);
            $scope.selectedYear = latestYear;
        });
    }

    $scope.gridOptions.onRegisterApi = function(gridApi){
        $scope.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope,function(row){
            $rootScope.countryName = row.entity.country;
            $rootScope.selectedYear = $scope.selectedYear
            // console.log($scope.selectedYear);
            $location.url('/analysis');
            $anchorScroll();
        });
    }

    $scope.updateRankingByYear = function(year){
        $scope.loader = true;
        $scope.selectedYear = year;

        $http.post("ajax/updateRankingByYear.php?year="+year)
        .then(function(response) {
            var temp=response.data.split("//");
            // console.log(temp[0]);
            // console.log(JSON.parse(temp[0]));
            var dataset = [];
            for(var i=0;i<temp.length;i++){
                if(temp[i] !== undefined && temp[i] !==null && temp[i] !== ""){
                    dataset[i] = JSON.parse(temp[i]);
                    dataset[i]['investor_friendliness_rank'] = parseInt(dataset[i]['investor_friendliness_rank']);
                    dataset[i]['legal_and_regulatory_environment'] = parseInt(dataset[i]['legal_and_regulatory_environment']);
                    dataset[i]['market_development'] = parseInt(dataset[i]['market_development']);
                    dataset[i]['exchange_controls_and_capital_restriction'] = parseInt(dataset[i]['exchange_controls_and_capital_restriction']);
                    dataset[i]['corporate_governance'] = parseInt(dataset[i]['corporate_governance']);
                    dataset[i]['aum_levels_and_growth'] = parseInt(dataset[i]['aum_levels_and_growth']);
                    dataset[i]['banking_system'] = parseInt(dataset[i]['banking_system']);
                    dataset[i]['ease_of_doing_business'] = parseInt(dataset[i]['ease_of_doing_business']);
                    dataset[i]['political_environment'] = parseInt(dataset[i]['political_environment']);
                    dataset[i]['accounting_system'] = parseInt(dataset[i]['accounting_system']);
                }
            }

            $scope.gridOptions.data = dataset;

            // console.log($scope.gridOptions);
        }, function(response){}).finally(function(){$scope.loader = false;});
    }

    $scope.updateRankingByRegion = function(region){
        $scope.selectedRegion = region;
        $scope.loader = true;
        $http.post("ajax/updateRankingByRegion.php?year="+$scope.selectedYear+"&region="+$scope.selectedRegion)
        .then(function(response) {
            var temp=response.data.split("//");
            // console.log(temp[0]);
            // console.log(JSON.parse(temp[0]));
            var dataset = [];
            for(var i=0;i<temp.length;i++){
                if(temp[i] !== undefined && temp[i] !==null && temp[i] !== ""){
                    dataset[i] = JSON.parse(temp[i]);
                    dataset[i]['investor_friendliness_rank'] = parseInt(dataset[i]['investor_friendliness_rank']);
                    dataset[i]['legal_and_regulatory_environment'] = parseInt(dataset[i]['legal_and_regulatory_environment']);
                    dataset[i]['market_development'] = parseInt(dataset[i]['market_development']);
                    dataset[i]['exchange_controls_and_capital_restriction'] = parseInt(dataset[i]['exchange_controls_and_capital_restriction']);
                    dataset[i]['corporate_governance'] = parseInt(dataset[i]['corporate_governance']);
                    dataset[i]['aum_levels_and_growth'] = parseInt(dataset[i]['aum_levels_and_growth']);
                    dataset[i]['banking_system'] = parseInt(dataset[i]['banking_system']);
                    dataset[i]['ease_of_doing_business'] = parseInt(dataset[i]['ease_of_doing_business']);
                    dataset[i]['political_environment'] = parseInt(dataset[i]['political_environment']);
                    dataset[i]['accounting_system'] = parseInt(dataset[i]['accounting_system']);
                }
            }

            $scope.gridOptions.data = dataset;

            // console.log($scope.gridOptions);
        }, function(response){}).finally(function(){$scope.loader = false;});
    }

    $scope.exportToCsv = function(){
        var filename = "Global_Investor_Friendliness_Rank_"+$scope.selectedYear+".csv";

        var dataset = [];

        $http.post("ajax/updateRankingByYear.php?year="+$scope.selectedYear)
        .then(function(response) {
            var temp=response.data.split("//");

            var field = ['Region', 'Country', 'Investor Friendliness Rank', 'Legal and Regulatory Environment', 'Market Development', 'Exchange Controls and Capital Restriction',
             'Corporate Governance', 'Aum Levels and Growth', 'Banking System', 'Ease of Doing Business', 'Political Environment', 'Accounting System'];

            var excelData = [];
            excelData[0] = field;

            for(var i=0;i<temp.length;i++){
                if(temp[i] !== undefined && temp[i] !==null && temp[i] !== ""){
                    dataset[i] = JSON.parse(temp[i]);
                    var row = [];
                    row.push(dataset[i]['region']);
                    row.push(dataset[i]['country']);
                    row.push(parseInt(dataset[i]['investor_friendliness_rank']));
                    row.push(parseInt(dataset[i]['legal_and_regulatory_environment']));
                    row.push(parseInt(dataset[i]['market_development']));
                    row.push(parseInt(dataset[i]['exchange_controls_and_capital_restriction']));
                    row.push(parseInt(dataset[i]['corporate_governance']));
                    row.push(parseInt(dataset[i]['aum_levels_and_growth']));
                    row.push(parseInt(dataset[i]['banking_system']));
                    row.push(parseInt(dataset[i]['ease_of_doing_business']));
                    row.push(parseInt(dataset[i]['political_environment']));
                    row.push(parseInt(dataset[i]['accounting_system']));

                    excelData[i+1] = row;
                    }
            }

            var rows=excelData;

            var processRow = function (row) {
                var finalVal = '';
                for (var j = 0; j < row.length; j++) {
                    var innerValue = row[j] === null ? '' : row[j].toString();
                    if (row[j] instanceof Date) {
                        innerValue = row[j].toLocaleString();
                    };
                    var result = innerValue.replace(/"/g, '""');
                    if (result.search(/("|,|\n)/g) >= 0)
                        result = '"' + result + '"';
                    if (j > 0)
                        finalVal += ',';
                    finalVal += result;
                }
                return finalVal + '\n';
            };

            var csvFile = '';
            for (var i = 0; i < rows.length; i++) {
                csvFile += processRow(rows[i]);
            }

            var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
            if (navigator.msSaveBlob) { // IE 10+
                navigator.msSaveBlob(blob, filename);
            } else {
                var link = document.createElement("a");
                if (link.download !== undefined) { // feature detection
                    // Browsers that support HTML5 download attribute
                    var url = URL.createObjectURL(blob);
                    link.setAttribute("href", url);
                    link.setAttribute("download", filename);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
        });    

        updateDownloadCount();

        function updateDownloadCount(){
          var today = new Date();
          today=today.toISOString().substring(0, 10); //yyyy-mm-dd

          $http.post("ajax/updateDownloadCount.php?today="+today)
          .then(function(response) {
          });
        }
    }
}]);