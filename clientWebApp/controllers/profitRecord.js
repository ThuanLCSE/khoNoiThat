angular.module('profitRecord').controller('ProfitRecordController'
	, ['$scope','ProfitRecordService','FurnitureService'
	, function ($scope,ProfitRecordService,FurnitureService) {
		$scope.lastestRecord = {};
		$scope.recordData = {};
		$scope.recordList = [];
                $scope.dates = [
                        {month: 1},
                        {month: 2},
                        {month: 3},
                        {month: 4},
                        {month: 5},
                        {month: 6},
                        {month: 7},
                        {month: 8},
                        {month: 9},
                        {month: 10},
                        {month: 11},
                        {month: 12},
                ];
        var showResultModal = function(inform){
                $scope.resultInformation = inform;
                $('#resultModal').modal('show');
        }
        $scope.showProfitRecord = function(){
                $scope.flag.tableUrl= 'views/profitRecord.htm';
                getAllRecord();
        }
	var getAllRecord = function(){
                ProfitRecordService.getAll({
                	action: 'getAll'
                },null,function(response){
                	$scope.recordList = response;
                },function(errResponse){
                	showResultModal('failed');
                });
	};
	$scope.addRecord = function(){
		var newRecord = {
                        month : $scope.recordData.month,
                        year : $scope.recordData.year,
                        total :  $scope.recordData.total,
                        from  :  $scope.recordData.from,
                        to :  $scope.recordData.to
                };
		newRecord.from =  Date.parse($scope.recordData.from);
		newRecord.to =  Date.parse($scope.recordData.to);
        ProfitRecordService.addRecord({
        	action: 'add'
        },{
        	record: newRecord
        },function(response){
        	showResultModal('Thêm thành công');
                getAllRecord();
        },function(errResponse){
        	showResultModal('failed');
        });
	};

	$scope.searchRecordByMonth = function(){
        ProfitRecordService.searchByMonth({
        	action: 'search'
        },{
        	searchMonth : $scope.flag.searchMonth
        },function(response){
        	$scope.recordList = response;
        },function(errResponse){
        	showResultModal('failed');
        });
	};
}]);